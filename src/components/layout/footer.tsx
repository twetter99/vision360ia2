import Link from 'next/link';
import { Shield, Twitter, Linkedin, Facebook } from 'lucide-react';
import { navigationLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Footer() {
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
              Advanced Vehicle Security Solutions for a safer tomorrow.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <Button key={index} asChild variant="ghost" size="icon">
                  <Link href={social.href} aria-label={`Follow us on ${social.icon.displayName}`}>
                    <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">Quick Links</h4>
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">Company</h4>
            <Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-headline font-semibold">Legal</h4>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vision360ia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}