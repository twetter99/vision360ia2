
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/client-layout';
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/analytics/google-tag-manager';
import type { Metadata, Viewport } from 'next';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-headline',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// ✅ SEO: Metadata global - OPTIMIZADA PARA B2B FLOTAS ESPAÑA
export const metadata: Metadata = {
  metadataBase: new URL('https://www.vision360ia.com'),
  title: {
    default: 'Visión Perimetral 360° con IA para Autobuses | Vision360IA',
    template: '%s | Vision360IA'
  },
  description: 'Sistema de visión 360° con IA que elimina puntos ciegos en autobuses y flotas. Homologado GSR R151/R158/R159. Protección VRU certificada para tu flota.',
  keywords: [
    // Keywords EXACTAS de búsqueda (prioridad máxima)
    'vision perimetral bus',
    'vision 360 autobus',
    'vision 360 perimetral autobuses urbanos',
    'sistema vision 360 bus industrial',
    'camaras 360 autobus',
    'vision perimetral camion',
    // Keywords secundarias (alto volumen)
    'sistema ADAS autobus',
    'ADAS para flotas',
    'cámaras perimetrales bus',
    'sistema vision perimetral 12V 24V',
    // Keywords técnicos (normativa)
    'GSR R151 BSIS',
    'GSR R158 marcha atrás',
    'GSR R159 MOIS',
    'homologacion GSR autobus',
    'cumplimiento GSR R151 R158 R159',
    // Keywords long-tail comerciales
    'sistema vision 360 homologado autobus',
    'proveedor vision perimetral flotas',
    'instalacion camaras 360 autobus',
    'eliminar puntos ciegos autobus',
    'vision perimetral transporte publico',
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
    canonical: 'https://www.vision360ia.com',
    languages: {
      'es-ES': 'https://www.vision360ia.com',
      'ca-ES': 'https://www.vision360ia.com',
      'eu-ES': 'https://www.vision360ia.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['ca_ES', 'eu_ES'],
    url: 'https://www.vision360ia.com',
    siteName: 'Vision360IA',
    title: 'Vision360IA | Sistema ADAS con IA para Flotas',
    description: 'Reduce un 40% los accidentes en tu flota con nuestro sistema ADAS potenciado por IA. Visión 360°, alertas inteligentes y análisis predictivo. +2000 vehículos equipados.',
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
      { url: '/icon.svg', type: 'image/svg+xml' },
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
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect para recursos externos - mejora LCP */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* hreflang para SEO multi-idioma */}
        <link rel="alternate" hrefLang="es" href="https://www.vision360ia.com" />
        <link rel="alternate" hrefLang="ca" href="https://www.vision360ia.com" />
        <link rel="alternate" hrefLang="eu" href="https://www.vision360ia.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vision360ia.com" />
        
        {/* Google Search Console */}
        <meta name="google-site-verification" content="Qq7WtxHJTiP4ZrM5ZK_83vhgNClaQrfpk6RBjMv_ymw" />
      </head>
      <body className="font-body antialiased">
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
