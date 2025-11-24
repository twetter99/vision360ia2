import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Language = 'es' | 'ca' | 'eu';

/**
 * Detecta el idioma basado en la ubicación geográfica del usuario
 * usando la información de Vercel Edge (request.geo)
 */
function detectLanguageFromLocation(request: NextRequest): Language {
  const geo = request.geo;
  
  // Si no hay información geográfica, devolver español por defecto
  if (!geo) {
    return 'es';
  }

  const country = geo.country?.toLowerCase();
  const region = geo.region?.toUpperCase();
  
  // Solo procesar si es España
  if (country !== 'es') {
    return 'es';
  }

  // Euskadi: País Vasco
  // Códigos posibles: BI (Bizkaia), SS (Gipuzkoa), VI (Araba/Álava), PV (País Vasco genérico)
  const euskadiRegions = ['BI', 'SS', 'VI', 'PV', 'EUS', 'ES-PV'];
  if (region && euskadiRegions.includes(region)) {
    return 'eu';
  }

  // Cataluña, Baleares y Valencia (idioma catalán)
  // Cataluña: CT, CAT, ES-CT, B (Barcelona), GI (Girona), L (Lleida), T (Tarragona)
  // Baleares: IB, BAL, ES-IB, PM (Palma de Mallorca)
  // Valencia: VC, V, ES-VC, ES-V, CV (Comunidad Valenciana)
  const catalanRegions = [
    'CT', 'CAT', 'ES-CT', 'B', 'GI', 'L', 'T',
    'IB', 'BAL', 'ES-IB', 'PM',
    'VC', 'V', 'ES-VC', 'ES-V', 'CV'
  ];
  if (region && catalanRegions.includes(region)) {
    return 'ca';
  }

  // Por defecto: español
  return 'es';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Excluir rutas que no necesitan procesamiento de idioma
  const excludedPaths = [
    '/_next',
    '/api',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/images',
    '/fonts',
  ];

  // Si la ruta coincide con alguna de las excluidas, continuar sin modificar
  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verificar si ya existe una cookie de idioma
  const existingLangCookie = request.cookies.get('lang');
  
  // Si ya existe la cookie, no hacer nada (el usuario ya eligió su idioma)
  if (existingLangCookie) {
    return NextResponse.next();
  }

  // Detectar el idioma basado en la ubicación
  const detectedLanguage = detectLanguageFromLocation(request);

  // Crear la respuesta y establecer la cookie
  const response = NextResponse.next();
  
  // Establecer cookie con el idioma detectado
  // maxAge: 1 año (365 días)
  response.cookies.set('lang', detectedLanguage, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

// Configuración del matcher para aplicar el middleware solo a las rutas necesarias
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api|robots.txt|sitemap.xml).*)',
  ],
};
