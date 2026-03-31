'use client';

import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/context/language-provider';
import { ContactSlideOverProvider } from '@/context/contact-slideover-provider';
import { ContactSlideOver } from '@/components/ui/contact-slideover';
import { CookieBanner } from '@/components/ui/cookie-banner';

// Layout cliente con todos los providers y componentes interactivos
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ContactSlideOverProvider>
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
