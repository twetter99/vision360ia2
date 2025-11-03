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
  name: string;
  email: string;
  company?: string;
  vehicleType: string;
  location?: string;
  specificConcerns?: string;
  website?: string; // honeypot
  formLoadTime?: number;
  pageUrl?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface ValidationError {
  field: string;
  error: string;
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
  
  // Tipo de vehículo requerido
  if (!data.vehicleType || !ALLOWED_VEHICLE_TYPES.includes(data.vehicleType)) {
    return { field: 'vehicleType', error: 'Por favor, selecciona un tipo de vehículo válido' };
  }
  
  // Longitud máxima de concerns
  if (data.specificConcerns && data.specificConcerns.length > 2000) {
    return { field: 'specificConcerns', error: 'El mensaje no puede exceder 2000 caracteres' };
  }
  
  return null;
}

// Sanitizar datos
function sanitizeData(data: any): FormData {
  return {
    name: String(data.name || '').trim().slice(0, 100),
    email: String(data.email || '').trim().toLowerCase().slice(0, 100),
    company: data.company ? String(data.company).trim().slice(0, 100) : undefined,
    vehicleType: String(data.vehicleType || '').trim(),
    location: data.location ? String(data.location).trim().slice(0, 100) : undefined,
    specificConcerns: data.specificConcerns ? String(data.specificConcerns).trim().slice(0, 2000) : undefined,
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
    const csvLine = `"${metadata.timestamp}","${data.name}","${data.email}","${data.company || ''}","${data.vehicleType}","${metadata.ip}"\n`;
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
        pass: process.env.SMTP_PASS || '1g5[%ce@5C]l',
      },
    });
    
    // Email HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #667eea; }
          .value { margin-top: 5px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚗 Nueva Solicitud de Contacto - Vision360 IA</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.company ? `
            <div class="field">
              <div class="label">Empresa:</div>
              <div class="value">${data.company}</div>
            </div>` : ''}
            <div class="field">
              <div class="label">Tipo de Vehículo:</div>
              <div class="value">${data.vehicleType}</div>
            </div>
            ${data.location ? `
            <div class="field">
              <div class="label">Ubicación:</div>
              <div class="value">${data.location}</div>
            </div>` : ''}
            ${data.specificConcerns ? `
            <div class="field">
              <div class="label">Mensaje:</div>
              <div class="value">${data.specificConcerns}</div>
            </div>` : ''}
            <div class="footer">
              <p><strong>Metadata:</strong></p>
              <p>IP: ${metadata.ip} | Fecha: ${metadata.timestamp}</p>
              ${metadata.utm.source ? `<p>UTM: ${metadata.utm.source} / ${metadata.utm.medium} / ${metadata.utm.campaign}</p>` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Enviar email
    await transporter.sendMail({
      from: `"Vision360 IA" <${process.env.SMTP_USER || 'noreply@vision360ia.com'}>`,
      to: process.env.MAIL_TO || 'info@vision360ia.com',
      subject: `Nueva solicitud de ${data.name} - ${data.vehicleType}`,
      html: htmlContent,
      text: `Nueva solicitud de contacto\n\nNombre: ${data.name}\nEmail: ${data.email}\n${data.company ? `Empresa: ${data.company}\n` : ''}Tipo: ${data.vehicleType}\n${data.specificConcerns ? `Mensaje: ${data.specificConcerns}\n` : ''}\n\nIP: ${metadata.ip}\nFecha: ${metadata.timestamp}`,
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
    const data = sanitizeData(rawData);
    
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

// Manejar OPTIONS para CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
