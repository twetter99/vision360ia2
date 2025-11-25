'use client';
import Link from 'next/link';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { BrandLogo } from '../brand/BrandLogo';
import { useContactSlideOver } from '@/context/contact-slideover-provider';

export function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;
  const navLinks = translations.navigationLinks;
  const { openContactSlideOver } = useContactSlideOver();

  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Facebook, href: '#' },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo className="h-7 w-auto" />
            </Link>
            <p className="max-w-xs text-muted-foreground text-justify">
              {t.tagline}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button key={index} asChild variant="ghost" size="icon">
                  <Link href={social.href} aria-label={`${t.followUsOn} ${social.icon.displayName}`}>
                    <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">{t.quickLinks}</h4>
            {navLinks.map((link) => (
              link.href === '#contact' ? (
                <button
                  key={link.href}
                  onClick={openContactSlideOver}
                  className="text-muted-foreground hover:text-foreground text-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              )
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">{t.legal.title}</h4>
            <Link href="/aviso-legal" className="text-muted-foreground hover:text-foreground">Aviso Legal</Link>
            <Link href="/privacidad" className="text-muted-foreground hover:text-foreground">{t.legal.privacy}</Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground">Cookies</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vision360ia. {t.copyright}.</p>
        </div>
      </div>
    </footer>
  );
}
