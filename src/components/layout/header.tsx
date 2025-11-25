
'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useContactSlideOver } from '@/context/contact-slideover-provider';
import { LanguageBanner } from './language-banner';
import { CataloniaFlag, SpainFlag, BasqueCountryFlag } from './flags';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '../brand/BrandLogo';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, translations } = useLanguage();
  const { openContactSlideOver } = useContactSlideOver();
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

  const otherLanguages = languageOptions.filter(opt => opt.code !== language);

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
            <BrandLogo className="h-8 w-auto md:h-10" priority />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navigationLinks.map((link) => (
              link.href === '#contact' ? (
                <button
                  key={link.href}
                  onClick={openContactSlideOver}
                  className="font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ) : (
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
              )
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2">
              {otherLanguages.map(option => (
                <Button 
                  key={option.code}
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setLanguage(option.code as 'es' | 'ca' | 'eu')}
                  aria-label={`${t.changeLanguage} ${option.name}`}
                  className="h-10 w-10 md:h-8 md:w-8"
                >
                  {option.flag}
                </Button>
              ))}
            </div>
            
            <Button variant="outline" className="hidden md:flex" onClick={openContactSlideOver}>
              {t.login}
            </Button>
            <Button 
              className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:flex"
              onClick={openContactSlideOver}
            >
              {t.getQuote}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t.openMenu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 pt-10">
                  {navigationLinks.map((link) => (
                    link.href === '#contact' ? (
                      <SheetClose asChild key={link.href}>
                        <button
                          onClick={openContactSlideOver}
                          className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground min-h-[44px] flex items-center text-left"
                        >
                          {link.label}
                        </button>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground min-h-[44px] flex items-center"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    )
                  ))}
                  <div className="mt-4 flex flex-col gap-4">
                    <SheetClose asChild>
                      <Button variant="outline" onClick={openContactSlideOver} className="min-h-[44px]">{t.login}</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button 
                        className="bg-accent text-accent-foreground hover:bg-accent/90 min-h-[44px]"
                        onClick={openContactSlideOver}
                      >
                        {t.getQuote}
                      </Button>
                    </SheetClose>
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
