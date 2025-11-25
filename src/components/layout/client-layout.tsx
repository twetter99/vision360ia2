'use client';

import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-provider';
import { ContactSlideOverProvider } from '@/context/contact-slideover-provider';
import { ContactSlideOver } from '@/components/ui/contact-slideover';
import { CookieBanner } from '@/components/ui/cookie-banner';
import { useLanguage } from '@/hooks/use-language';

// Componente interno que usa hooks de idioma
function LanguageUpdater() {
  const { language } = useLanguage();

  // SEO: Actualizar lang del HTML dinámicamente en cliente
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language || 'es';
    }
  }, [language]);

  return null;
}

// Layout cliente con todos los providers y componentes interactivos
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ContactSlideOverProvider>
        <LanguageUpdater />
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <ContactSlideOver />
        <CookieBanner />
      </ContactSlideOverProvider>
    </LanguageProvider>
  );
}
