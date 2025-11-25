
'use client';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-provider';
import { ContactSlideOverProvider } from '@/context/contact-slideover-provider';
import { ContactSlideOver } from '@/components/ui/contact-slideover';
import { useLanguage } from '@/hooks/use-language';
import { useEffect } from 'react';

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

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { language } = useLanguage();

  // SEO: Actualizar lang del HTML dinámicamente
  useEffect(() => {
    document.documentElement.lang = language || 'es';
  }, [language]);

  return (
    <html lang={language} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        {/* SEO: Preconnect para recursos externos */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* SEO: Canonical URL */}
        <link rel="canonical" href="https://vision360ia.com" />
        
        {/* SEO: hreflang para multi-idioma */}
        <link rel="alternate" hrefLang="es" href="https://vision360ia.com" />
        <link rel="alternate" hrefLang="ca" href="https://vision360ia.com" />
        <link rel="alternate" hrefLang="eu" href="https://vision360ia.com" />
        <link rel="alternate" hrefLang="x-default" href="https://vision360ia.com" />
        
        {/* Google Search Console - REEMPLAZAR CON TU CÓDIGO */}
        {/* <meta name="google-site-verification" content="TU_CODIGO_DE_VERIFICACION_AQUI" /> */}
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:locale:alternate" content="ca_ES" />
        <meta property="og:locale:alternate" content="eu_ES" />
        <meta property="og:site_name" content="Vision360IA" />
        <meta property="og:image" content="https://vision360ia.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://vision360ia.com/images/og-image.jpg" />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <ContactSlideOver />
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <ContactSlideOverProvider>
        <AppLayout>{children}</AppLayout>
      </ContactSlideOverProvider>
    </LanguageProvider>
  );
}
