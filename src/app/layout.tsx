
'use client';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-provider';
import { useLanguage } from '@/hooks/use-language';

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { language } = useLanguage();

  return (
    <html lang={language} className="!scroll-smooth">
      <head>
        <title>Vision360ia</title>
        <meta
          name="description"
          content="Soluciones Avanzadas de Seguridad para Vehículos"
        />
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
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <AppLayout>{children}</AppLayout>
    </LanguageProvider>
  );
}
