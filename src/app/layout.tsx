import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-provider';

export const metadata: Metadata = {
  title: 'Vision360ia',
  description: 'Soluciones Avanzadas de Seguridad para Vehículos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="es" className="!scroll-smooth">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-body antialiased">
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
