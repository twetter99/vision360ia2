'use client';
import Link from 'next/link';
import { Shield, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;
  const navLinks = translations.navigationLinks;

  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Facebook, href: '#' },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col items-start gap-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold text-primary">
                Vision360ia
              </span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
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
              <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">{t.company.title}</h4>
            <Link href="#" className="text-muted-foreground hover:text-foreground">{t.company.about}</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">{t.company.jobs}</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">{t.company.press}</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">{t.legal.title}</h4>
            <Link href="#" className="text-muted-foreground hover:text-foreground">{t.legal.privacy}</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">{t.legal.terms}</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vision360ia. {t.copyright}.</p>
        </div>
      </div>
    </footer>
  );
}
