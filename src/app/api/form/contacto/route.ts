import { NextRequest, NextResponse } from 'next/server';
import { writeFile, appendFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

// Rate limiting storage (en producción usar Redis/Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Configuración
const MAX_POST_SIZE = 50000; // 50KB
const RATE_LIMIT = 5; // 5 envíos
const RATE_WINDOW = 3600000; // 1 hora en ms
const MIN_SUBMIT_TIME = 3; // segundos mínimos antes de enviar

// Tipos de vehículos permitidos
const ALLOWED_VEHICLE_TYPES = [
  'Turismo',
  'SUV/4x4',
  'Furgoneta',
  'Camión',
  'Autobús',
  'Maquinaria Industrial',
  'Motocicleta',
  'Otro'
];

interface FormData {
  // Datos básicos de contacto
  name: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  
  // Información de flota
  fleetSize?: string;
  vehicleTypes?: string[];
  
  // Detalles del proyecto
  mainInterest?: string;
  projectHorizon?: string;
  contactPreference?: string;
  
  // Mensaje y legal
  message?: string;
  privacyAccepted?: boolean;
  marketingOptIn?: boolean;
  
  // Metadata
  website?: string; // honeypot
  formLoadTime?: number;
  pageUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  token?: string; // 🔐 Token de reCAPTCHA v3
}

// 🔐 Interfaz para la respuesta de Cloudflare Turnstile
interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  'error-codes'?: string[];
}

interface ValidationError {
  field: string;
  error: string;
}

// 🔐 FUNCIÓN: Validar token de Cloudflare Turnstile (MODO ESTRICTO)
async function validateTurnstile(token: string): Promise<boolean> {
  try {
    // ⚠️ MODO DESARROLLO: Siempre permitir
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    
    if (!secretKey) {
      console.error('Turnstile secret key not configured - BLOCKING submission');
      return false;
    }
    
    if (!token) {
      console.warn('No Turnstile token provided - BLOCKING submission');
      return false;
    }
    
    // Verificar con Cloudflare Siteverify
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });
    
    const data: TurnstileVerifyResponse = await response.json();
    
    if (!data.success) {
      console.error('Turnstile verification failed:', data['error-codes']);
      return false;
    }
    
    console.log(`Turnstile validated. Hostname: ${data.hostname}, Action: ${data.action}`);
    return true;
    
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return false; // En caso de error de red, BLOQUEAR por seguridad
  }
}

// Validación de campos
function validateFormData(data: FormData): ValidationError | null {
  // Nombre requerido
  if (!data.name || data.name.trim().length < 2) {
    return { field: 'name', error: 'El nombre debe tener al menos 2 caracteres' };
  }
  
  // Email requerido y válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { field: 'email', error: 'Por favor, ingresa un email válido' };
  }
  
  // Longitud máxima de mensaje
  if (data.message && data.message.length > 2000) {
    return { field: 'message', error: 'El mensaje no puede exceder 2000 caracteres' };
  }
  
  // Todo lo demás es opcional
  return null;
}

// Sanitizar datos
function sanitizeData(data: any): FormData {
  return {
    // Datos básicos de contacto
    name: String(data.name || '').trim().slice(0, 100),
    email: String(data.email || '').trim().toLowerCase().slice(0, 100),
    company: data.company ? String(data.company).trim().slice(0, 100) : undefined,
    role: data.role ? String(data.role).trim().slice(0, 100) : undefined,
    phone: data.phone ? String(data.phone).trim().slice(0, 20) : undefined,
    
    // Información de flota
    fleetSize: data.fleetSize ? String(data.fleetSize).trim() : undefined,
    vehicleTypes: Array.isArray(data.vehicleTypes) 
      ? data.vehicleTypes.map((v: any) => String(v).trim()).filter(Boolean)
      : undefined,
    
    // Detalles del proyecto
    mainInterest: data.mainInterest ? String(data.mainInterest).trim() : undefined,
    projectHorizon: data.projectHorizon ? String(data.projectHorizon).trim() : undefined,
    contactPreference: data.contactPreference ? String(data.contactPreference).trim() : undefined,
    
    // Mensaje y legal
    message: data.message ? String(data.message).trim().slice(0, 2000) : undefined,
    privacyAccepted: Boolean(data.privacyAccepted),
    marketingOptIn: Boolean(data.marketingOptIn),
    
    // Metadata
    website: data.website,
    formLoadTime: data.formLoadTime,
    pageUrl: data.pageUrl,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
  };
}

// Rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Limpiar rate limits antiguos
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Guardar en archivo
async function saveSubmission(data: FormData, metadata: any) {
  try {
    const storageDir = path.join(process.cwd(), 'storage', 'submissions');
    const logsDir = path.join(process.cwd(), 'storage', 'logs');
    
    // Crear directorios si no existen
    if (!existsSync(storageDir)) {
      await mkdir(storageDir, { recursive: true });
    }
    if (!existsSync(logsDir)) {
      await mkdir(logsDir, { recursive: true });
    }
    
    // Guardar JSON individual
    const timestamp = Date.now();
    const filename = `submission_${timestamp}_${Math.random().toString(36).substr(2, 9)}.json`;
    await writeFile(
      path.join(storageDir, filename),
      JSON.stringify({ data, metadata }, null, 2)
    );
    
    // Agregar a CSV log
    const csvLine = `"${metadata.timestamp}","${data.name}","${data.email}","${data.company || ''}","${data.vehicleTypes?.join(', ') || 'No especificado'}","${metadata.ip}"\n`;
    const csvPath = path.join(logsDir, `submissions_${new Date().toISOString().slice(0, 7)}.csv`);
    
    if (!existsSync(csvPath)) {
      await writeFile(csvPath, 'Timestamp,Name,Email,Company,VehicleType,IP\n');
    }
    await appendFile(csvPath, csvLine);
    
  } catch (error) {
    console.error('Storage error:', error);
  }
}

// Enviar email
async function sendEmail(data: FormData, metadata: any): Promise<boolean> {
  try {
    // Configurar transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.vision360ia.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER || 'noreply@vision360ia.com',
        pass: process.env.SMTP_PASS,
      },
    });
    
    // Email HTML mejorado con toda la información del formulario
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
          .container { max-width: 650px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
          .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px solid #e5e7eb; }
          .section:last-of-type { border-bottom: none; }
          .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #667eea; margin-bottom: 15px; }
          .field { margin-bottom: 12px; }
          .label { font-size: 13px; font-weight: 600; color: #64748b; margin-bottom: 4px; }
          .value { font-size: 15px; color: #1e293b; word-break: break-word; }
          .message-box { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; }
          .footer { background: #f8fafc; padding: 20px 30px; font-size: 12px; color: #64748b; }
          .footer-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .badge { display: inline-block; padding: 4px 12px; background: #e0e7ff; color: #4f46e5; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 Nueva Solicitud de Contacto</h1>
            <p>Formulario Vision360IA - ${new Date(metadata.timestamp).toLocaleString('es-ES')}</p>
          </div>
          
          <div class="content">
            <!-- SECCIÓN 1: Datos de contacto -->
            <div class="section">
              <div class="section-title">👤 Datos de Contacto</div>
              <div class="field">
                <div class="label">Nombre completo</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></div>
              </div>
              ${data.company ? `
              <div class="field">
                <div class="label">Empresa</div>
                <div class="value">${data.company}</div>
              </div>` : ''}
              ${data.role ? `
              <div class="field">
                <div class="label">Cargo / Rol</div>
                <div class="value">${data.role}</div>
              </div>` : ''}
              ${data.phone ? `
              <div class="field">
                <div class="label">Teléfono</div>
                <div class="value"><a href="tel:${data.phone}" style="color: #667eea;">${data.phone}</a></div>
              </div>` : ''}
            </div>

            <!-- SECCIÓN 2: Información de flota -->
            <div class="section">
              <div class="section-title">🚌 Información de Flota</div>
              ${data.fleetSize ? `
              <div class="field">
                <div class="label">Tamaño de flota</div>
                <div class="value"><span class="badge">${data.fleetSize}</span></div>
              </div>` : ''}
              ${data.vehicleTypes && data.vehicleTypes.length > 0 ? `
              <div class="field">
                <div class="label">Tipos de vehículos</div>
                <div class="value">
                  ${data.vehicleTypes.map(v => `<span class="badge" style="margin-right: 8px; margin-bottom: 4px;">${v}</span>`).join('')}
                </div>
              </div>` : ''}
            </div>

            <!-- SECCIÓN 3: Detalles del proyecto -->
            ${data.mainInterest || data.projectHorizon || data.contactPreference ? `
            <div class="section">
              <div class="section-title">🎯 Detalles del Proyecto</div>
              ${data.mainInterest ? `
              <div class="field">
                <div class="label">Interés principal</div>
                <div class="value">${data.mainInterest}</div>
              </div>` : ''}
              ${data.projectHorizon ? `
              <div class="field">
                <div class="label">Horizonte del proyecto</div>
                <div class="value">${data.projectHorizon}</div>
              </div>` : ''}
              ${data.contactPreference ? `
              <div class="field">
                <div class="label">Preferencia de contacto</div>
                <div class="value"><span class="badge">${data.contactPreference}</span></div>
              </div>` : ''}
            </div>` : ''}

            <!-- SECCIÓN 4: Mensaje -->
            ${data.message ? `
            <div class="section">
              <div class="section-title">💬 Mensaje del Cliente</div>
              <div class="message-box">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>` : ''}
            
            <!-- SECCIÓN 5: Consentimientos -->
            <div class="section">
              <div class="section-title">✅ Consentimientos</div>
              <div class="field">
                <div class="label">Política de privacidad</div>
                <div class="value">${data.privacyAccepted ? '✅ Aceptada' : '❌ No aceptada'}</div>
              </div>
              <div class="field">
                <div class="label">Marketing y comunicaciones</div>
                <div class="value">${data.marketingOptIn ? '✅ Acepta recibir información' : '⚪ No acepta'}</div>
              </div>
            </div>

            <!-- SECCIÓN 4: Origen de la solicitud -->
            <div class="section">
              <div class="section-title">📍 Origen de la Solicitud</div>
              <div class="field">
                <div class="label">Página de origen</div>
                <div class="value" style="font-size: 13px; color: #64748b;">${metadata.pageUrl || 'No especificada'}</div>
              </div>
            </div>
          </div>

          <!-- FOOTER con metadata técnica -->
          <div class="footer">
            <div class="footer-row">
              <span><strong>IP:</strong> ${metadata.ip}</span>
              <span><strong>User Agent:</strong> ${metadata.userAgent.substring(0, 50)}...</span>
            </div>
            ${metadata.utm.source ? `
            <div class="footer-row">
              <span><strong>UTM Source:</strong> ${metadata.utm.source}</span>
              <span><strong>UTM Medium:</strong> ${metadata.utm.medium || '-'}</span>
              <span><strong>UTM Campaign:</strong> ${metadata.utm.campaign || '-'}</span>
            </div>` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Enviar email con toda la información
    await transporter.sendMail({
      from: `"Vision360 IA - Formulario Web" <${process.env.SMTP_USER || 'noreply@vision360ia.com'}>`,
      to: process.env.MAIL_TO || 'info@vision360ia.com',
      replyTo: data.email, // Permitir responder directamente al cliente
      subject: `🚗 Nuevo Lead: ${data.name}${data.company ? ` (${data.company})` : ''} - ${data.vehicleTypes?.[0] || 'Consulta'}`,
      html: htmlContent,
      text: `
═══════════════════════════════════════════════
  NUEVA SOLICITUD DE CONTACTO - VISION360 IA
═══════════════════════════════════════════════

📋 DATOS DE CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${data.name}
Email: ${data.email}
${data.company ? `Empresa: ${data.company}\n` : ''}${data.role ? `Cargo: ${data.role}\n` : ''}${data.phone ? `Teléfono: ${data.phone}\n` : ''}

🚌 INFORMACIÓN DE FLOTA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.fleetSize ? `Tamaño: ${data.fleetSize}\n` : ''}${data.vehicleTypes && data.vehicleTypes.length > 0 ? `Tipos: ${data.vehicleTypes.join(', ')}\n` : ''}

🎯 DETALLES DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.mainInterest ? `Interés: ${data.mainInterest}\n` : ''}${data.projectHorizon ? `Horizonte: ${data.projectHorizon}\n` : ''}${data.contactPreference ? `Preferencia: ${data.contactPreference}\n` : ''}

💬 MENSAJE DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message || 'Sin mensaje adicional'}

✅ CONSENTIMIENTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Privacidad: ${data.privacyAccepted ? 'Aceptada' : 'No aceptada'}
Marketing: ${data.marketingOptIn ? 'Sí acepta' : 'No acepta'}

📍 INFORMACIÓN TÉCNICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IP: ${metadata.ip}
Fecha: ${metadata.timestamp}
Página: ${metadata.pageUrl || 'No especificada'}
${metadata.utm.source ? `UTM: ${metadata.utm.source} / ${metadata.utm.medium} / ${metadata.utm.campaign}` : ''}

═══════════════════════════════════════════════
      `,
    });
    
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

// Handler principal
export async function POST(request: NextRequest) {
  try {
    // Verificar tamaño
    const contentLength = parseInt(request.headers.get('content-length') || '0');
    if (contentLength > MAX_POST_SIZE) {
      return NextResponse.json(
        { ok: false, error: 'Payload Too Large' },
        { status: 413 }
      );
    }
    
    // Obtener IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                request.headers.get('x-real-ip') || 
                'unknown';
    
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Too Many Requests',
          message: 'Has excedido el límite de envíos. Inténtalo de nuevo más tarde.'
        },
        { status: 429 }
      );
    }
    
    // Parsear datos
    const rawData = await request.json();
    const { token, ...formDataRaw } = rawData; // 🔐 Extraer token de reCAPTCHA
    const data = sanitizeData(formDataRaw);
    
    // 🔐 VALIDAR TURNSTILE ANTES DE PROCESAR
    const isTurnstileValid = await validateTurnstile(token);
    
    if (!isTurnstileValid) {
      console.warn('Turnstile validation failed for IP:', ip);
      return NextResponse.json(
        {
          ok: false,
          error: 'Turnstile validation failed',
          message: 'Verificación de seguridad fallida. Por favor, recarga la página e inténtalo de nuevo.'
        },
        { status: 400 }
      );
    }
    
    // Verificar honeypot
    if (data.website) {
      // Bot detectado - responder con éxito para engañar
      return NextResponse.json({
        ok: true,
        message: 'Solicitud recibida'
      });
    }
    
    // Verificar tiempo de envío
    if (data.formLoadTime) {
      const timeDiff = Math.floor(Date.now() / 1000) - data.formLoadTime;
      if (timeDiff < MIN_SUBMIT_TIME) {
        // Bot detectado - muy rápido
        return NextResponse.json({
          ok: true,
          message: 'Solicitud recibida'
        });
      }
    }
    
    // Validar datos
    const validationError = validateFormData(data);
    if (validationError) {
      return NextResponse.json(
        {
          ok: false,
          field: validationError.field,
          error: validationError.error
        },
        { status: 422 }
      );
    }
    
    // Metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent') || 'Unknown',
      pageUrl: data.pageUrl || 'Unknown',
      utm: {
        source: data.utm_source || null,
        medium: data.utm_medium || null,
        campaign: data.utm_campaign || null,
      }
    };
    
    // Guardar en almacenamiento
    await saveSubmission(data, metadata);
    
    // Enviar email
    const emailSent = await sendEmail(data, metadata);
    
    if (!emailSent) {
      console.error('Failed to send email');
      return NextResponse.json(
        {
          ok: false,
          error: 'Server Error',
          message: 'Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'
        },
        { status: 500 }
      );
    }
    
    // Limpieza periódica (1% de probabilidad)
    if (Math.random() < 0.01) {
      cleanupRateLimits();
    }
    
    // Respuesta exitosa
    return NextResponse.json({
      ok: true,
      message: 'Solicitud recibida correctamente. Te contactaremos pronto.'
    });
    
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Server Error',
        message: 'Ha ocurrido un error al procesar tu solicitud.'
      },
      { status: 500 }
    );
  }
}

// Manejar OPTIONS para CORS (restringido a dominio propio)
export async function OPTIONS(request: NextRequest) {
  const allowedOrigins = [
    'https://vision360ia.com',
    'https://www.vision360ia.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    process.env.NODE_ENV === 'development' ? 'http://localhost:9002' : '',
  ].filter(Boolean);
  
  const origin = request.headers.get('origin') || '';
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
