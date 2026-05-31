
import { Sora, Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/client-layout';
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/analytics/google-tag-manager';
import { JsonLd } from '@/components/seo/json-ld';
import {
  organizationSchema,
  localBusinessMadridSchema,
  localBusinessDonostiaSchema,
  websiteSchema,
} from '@/lib/seo/structured-data';
import type { Metadata, Viewport } from 'next';

// Notas sobre display:
//   - 'swap'    → muestra fallback inmediatamente, cambia a la fuente real
//                  cuando llega. Provoca FOUT y CLS al cambiar las métricas.
//   - 'fallback'→ muestra fallback inmediatamente, da 100ms a la fuente real;
//                  si no llega, descarta. SIN cambio posterior → sin CLS.
//   - 'optional'→ similar a 'fallback' pero solo carga la real si cae en cache.
//
// Elegimos 'fallback' como compromiso: usuarios con buena conexión ven Sora
// e Inter en la primera carga (lo común en banda ancha); el resto ven el
// fallback ajustado y NO sufren CLS por swap posterior.
//
// adjustFontFallback (true por defecto en Next 14+) ajusta las métricas
// del fallback (system-ui) a las de Sora/Inter para minimizar el shift.
const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-headline',
  display: 'fallback',
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'fallback',
  adjustFontFallback: true,
});

// ✅ SEO: Metadata global - OPTIMIZADA PARA B2B FLOTAS ESPAÑA
export const metadata: Metadata = {
  metadataBase: new URL('https://www.vision360ia.com'),
  title: {
    default: 'Sistemas ADAS y Visión Perimetral 360° para Flotas | Vision360IA',
    template: '%s | Vision360IA'
  },
  description: 'Sistemas ADAS con visión perimetral 360° para autobuses y flotas profesionales. Eliminación de puntos ciegos, protección VRU y cumplimiento GSR.',
  keywords: [
    // Keywords ADAS (prioridad máxima - alto volumen)
    'sistemas ADAS flotas',
    'sistemas ADAS vehiculos industriales',
    'sistemas ADAS camiones',
    'sistemas ADAS autobuses',
    'ADAS transporte pesado',
    'proveedor sistemas ADAS España',
    'instalacion ADAS flotas',
    // Keywords Visión Perimetral (término técnico)
    'vision perimetral bus',
    'vision 360 autobus',
    'vision perimetral camion',
    'camaras 360 autobus',
    'vision perimetral flotas industriales',
    'vision perimetral 360 ADAS',
    // Keywords combinadas
    'sistema ADAS vision 360',
    'ADAS eliminar puntos ciegos',
    'eliminacion puntos ciegos flotas',
    'vision perimetral ADAS autobus',
    // Keywords normativa GSR
    'GSR R151 BSIS',
    'GSR R158 marcha atrás',
    'GSR R159 MOIS',
    'homologacion GSR autobus',
    'cumplimiento GSR flotas',
    // Marca
    'Vision360IA',
    'WINFIN'
  ],
  authors: [{ name: 'WINFIN Instalaciones S.L.', url: 'https://vision360ia.com' }],
  creator: 'WINFIN',
  publisher: 'Vision360IA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.vision360ia.com',
    siteName: 'Vision360IA',
    title: 'Sistemas ADAS y Visión Perimetral 360° | Vision360IA',
    description: 'Sistemas ADAS con visión 360° para autobuses, camiones y flotas industriales. Elimina puntos ciegos y cumple normativa GSR.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision360IA - Sistema ADAS con Inteligencia Artificial para flotas de transporte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision360IA | Sistema ADAS con IA para Flotas',
    description: 'Reduce un 40% los accidentes en tu flota. Visión 360°, alertas inteligentes y análisis IA.',
    images: ['/images/og-image.jpg'],
    creator: '@vision360ia',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  category: 'technology',
};

// ✅ SEO: Viewport optimizado
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect para recursos externos - mejora LCP */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Search Console */}
        <meta name="google-site-verification" content="Qq7WtxHJTiP4ZrM5ZK_83vhgNClaQrfpk6RBjMv_ymw" />

        {/*
          JSON-LD global. Aparecen en TODAS las páginas (no solo home) para
          que Google y los LLMs entiendan en cualquier landing la marca,
          oficinas y sitio web. Schemas específicos por página (Service,
          BreadcrumbList, FAQPage) van en cada page.tsx propio.
        */}
        <JsonLd
          data={[
            organizationSchema(),
            localBusinessMadridSchema(),
            localBusinessDonostiaSchema(),
            websiteSchema(),
          ]}
        />
      </head>
      <body className="font-body antialiased">
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
