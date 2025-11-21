
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

  return (
    <html lang={language} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
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
