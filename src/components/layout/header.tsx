
'use client';

import Link from 'next/link';
import { Menu, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useContactSlideOver } from '@/context/contact-slideover-provider';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '../brand/BrandLogo';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { translations } = useLanguage();
  const { openContactSlideOver } = useContactSlideOver();
  const pathname = usePathname();

  const navigationLinks = translations.navigationLinks;
  const t = translations.header;
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const isHeroOverlay = !isScrolled;

  const solutionPages = [
    { href: '/adas-autobuses', label: 'ADAS Autobuses' },
    { href: '/adas-camiones', label: 'ADAS Camiones' },
    { href: '/anti-atropellos-peatones-ciclistas', label: 'Anti-Atropellos' },
    { href: '/vision-360-vehiculos-industriales', label: 'Vehículos Industriales' },
    { href: '/camaras-vision-artificial-flotas', label: 'Visión Artificial' },
    { href: '/adas-vehiculos-recogida-residuos', label: 'Recogida de Residuos' },
  ];

  useEffect(() => {
    let animationFrameId: number | null = null;
    let lastScrollY = window.scrollY;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const nextIsScrolled = currentScrollY > 24;
      const scrollDelta = currentScrollY - lastScrollY;

      setIsScrolled(previousIsScrolled => {
        if (previousIsScrolled === nextIsScrolled) {
          return previousIsScrolled;
        }

        return nextIsScrolled;
      });

      setIsHidden(previousIsHidden => {
        if (currentScrollY <= 40) {
          return false;
        }

        if (scrollDelta > 8 && currentScrollY > 180) {
          return true;
        }

        if (scrollDelta < -8) {
          return false;
        }

        return previousIsHidden;
      });

      lastScrollY = currentScrollY;

      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          'pointer-events-none fixed inset-x-0 top-[max(16px,calc(env(safe-area-inset-top)+8px))] z-[60] px-4 transition-transform duration-300 sm:px-6 lg:px-8',
          isHidden ? '-translate-y-[140%]' : 'translate-y-0'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto mx-auto flex items-center rounded-[24px] border transition-[max-width,background-color,border-color,box-shadow,backdrop-filter] duration-300',
            isScrolled ? 'max-w-6xl' : 'max-w-7xl',
            isScrolled
              ? 'border-white/60 bg-white/78 shadow-[0_16px_42px_rgba(15,23,42,0.12)] backdrop-blur-xl'
              : 'border-white/28 bg-slate-950/55 shadow-[0_18px_48px_rgba(15,23,42,0.28)] backdrop-blur-[14px]'
          )}
        >
          <div className={cn(
            'flex w-full items-center px-5 sm:px-6 lg:px-7',
            isScrolled ? 'h-[60px] lg:h-[62px]' : 'h-[68px] lg:h-[72px]'
          )}>
            <Link href="/" className={cn('mr-4 flex items-center gap-2 lg:mr-6', isScrolled && 'lg:mr-5')}>
              <BrandLogo className={cn('w-auto transition-[height] duration-300', isScrolled ? 'h-7 md:h-8' : 'h-8 md:h-10')} priority />
            </Link>
            <nav className="hidden items-center gap-2 text-sm md:flex lg:gap-3">
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-2 font-medium transition-all lg:px-4',
                  isHeroOverlay
                    ? 'text-white hover:bg-white/10 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]'
                    : 'text-foreground/70 hover:bg-white/80 hover:text-foreground'
                )}>
                  Soluciones <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', solutionsOpen && 'rotate-180')} />
                </button>
                {solutionsOpen && (
                  <div className="absolute left-0 top-full z-[70] pt-3">
                    <div className="w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
                      {solutionPages.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          className={cn(
                            'block px-4 py-2.5 text-sm text-foreground/70 transition-colors hover:bg-slate-100/80 hover:text-foreground',
                            pathname === page.href && 'bg-slate-100/80 text-foreground'
                          )}
                        >
                          {page.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {navigationLinks.map((link) => (
                link.href === '#contact' ? (
                  <button
                    key={link.href}
                    onClick={openContactSlideOver}
                    className={cn(
                      'rounded-full px-3 py-2 font-medium transition-all lg:px-4',
                      isHeroOverlay
                        ? 'text-white hover:bg-white/10 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]'
                        : 'text-foreground/70 hover:bg-white/80 hover:text-foreground'
                    )}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'rounded-full px-3 py-2 font-medium transition-all lg:px-4',
                      isHeroOverlay
                        ? 'text-white hover:bg-white/10 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]'
                        : 'text-foreground/70 hover:bg-white/80 hover:text-foreground',
                      pathname === link.href && (isHeroOverlay ? 'text-white' : 'text-foreground')
                    )}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:gap-2.5">
              <Button 
                className={cn(
                  'hidden rounded-full md:flex',
                  isScrolled
                    ? 'h-10 px-5 text-sm shadow-[0_12px_28px_rgba(245,158,11,0.2)]'
                    : 'shadow-[0_16px_36px_rgba(245,158,11,0.24)]',
                  'bg-accent text-accent-foreground hover:bg-accent/90'
                )}
                onClick={openContactSlideOver}
              >
                {t.getQuote}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn(
                    'h-10 w-10 rounded-full border shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur-md md:hidden',
                    isHeroOverlay
                      ? 'border-white/24 bg-white/10 text-white hover:bg-white/16 hover:text-white'
                      : 'border-white/35 bg-white/50'
                  )}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">{t.openMenu}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] border-l-white/20 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] px-0 sm:w-[400px]">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menú principal</SheetTitle>
                    <SheetDescription>
                      Navega por soluciones y páginas principales.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex h-full flex-col overflow-y-auto">
                    <div className="border-b border-slate-200/80 px-6 pb-5 pt-8">
                      <div className="flex items-center justify-between gap-4">
                        <BrandLogo className="h-9 w-auto" />
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
                          <Sparkles className="h-3.5 w-3.5" />
                          B2B Flotas
                        </div>
                      </div>
                      <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-slate-600">
                        Reduce puntos ciegos, mejora seguridad urbana y refuerza cumplimiento en autobuses, camiones y vehículos municipales.
                      </p>
                    </div>

                    <nav className="flex flex-1 flex-col gap-8 px-6 py-6">
                      <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Soluciones</span>
                        <div className="grid gap-2">
                          {solutionPages.map((page) => (
                            <SheetClose asChild key={page.href}>
                              <Link
                                href={page.href}
                                className={cn(
                                  'flex min-h-[48px] items-center justify-between rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-md',
                                  pathname === page.href && 'border-amber-300 bg-amber-50 text-slate-950'
                                )}
                              >
                                <span>{page.label}</span>
                                <ArrowRight className="h-4 w-4 text-slate-400" />
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Navegación</span>
                        <div className="grid gap-2">
                          {navigationLinks.map((link) => (
                            link.href === '#contact' ? (
                              <SheetClose asChild key={link.href}>
                                <button
                                  onClick={openContactSlideOver}
                                  className="flex min-h-[48px] items-center rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-left text-base font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-md"
                                >
                                  {link.label}
                                </button>
                              </SheetClose>
                            ) : (
                              <SheetClose asChild key={link.href}>
                                <Link
                                  href={link.href}
                                  className={cn(
                                    'flex min-h-[48px] items-center rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3 text-base font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:text-slate-950 hover:shadow-md',
                                    pathname === link.href && 'border-amber-300 bg-amber-50 text-slate-950'
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            )
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex flex-col gap-3 border-t border-slate-200/80 pt-5">
                        <SheetClose asChild>
                          <Button variant="outline" onClick={openContactSlideOver} className="min-h-[50px] rounded-full border-slate-300 bg-white/85 text-base">
                            {t.login}
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            className="min-h-[54px] rounded-full bg-accent text-base text-accent-foreground shadow-[0_18px_40px_rgba(245,158,11,0.22)] hover:bg-accent/90"
                            onClick={openContactSlideOver}
                          >
                            {t.getQuote}
                          </Button>
                        </SheetClose>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
