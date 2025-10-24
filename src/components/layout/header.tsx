'use client';

import Link from 'next/link';
import { Menu, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/use-language';
import { LanguageBanner } from './language-banner';
import { CataloniaFlag, SpainFlag, BasqueCountryFlag } from './flags';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setLanguage, translations } = useLanguage();
  const pathname = usePathname();

  const navigationLinks = translations.navigationLinks;
  const t = translations.header;

  const languageOptions = [
    {
      code: 'es',
      name: 'Castellano',
      flag: <SpainFlag />,
    },
    {
      code: 'ca',
      name: 'Catalan',
      flag: <CataloniaFlag />,
    },
    {
      code: 'eu',
      name: 'Euskera',
      flag: <BasqueCountryFlag />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'border-b border-border/60 bg-background/80 backdrop-blur-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold text-primary">
              Vision360ia
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-medium text-foreground/60 transition-colors hover:text-foreground',
                  pathname === link.href && 'text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t.changeLanguage}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languageOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.code}
                    className="flex items-center"
                    onClick={() => setLanguage(option.code as 'es' | 'ca' | 'eu')}
                  >
                    {option.flag}
                    {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="hidden md:flex">
              {t.login}
            </Button>
            <Button className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:flex">
              {t.getQuote}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t.openMenu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 pt-10">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-4">
                    <Button variant="outline">{t.login}</Button>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {t.getQuote}
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <LanguageBanner />
    </>
  );
}
