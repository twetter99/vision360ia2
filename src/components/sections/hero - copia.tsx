'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, ShieldCheck, Cpu, GitMerge } from 'lucide-react';
import { heroData } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { Badge } from '@/components/ui/badge';

export function Hero({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.hero || initialTranslations.hero;
  const heroImage = heroData.image;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cálculo de opacidad y blur basado en scroll (efecto Apple)
  // Desactivar efectos al 90% del hero para evitar que el texto desaparezca
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const fadeThreshold = heroHeight * 0.9; // 90% del hero
  const opacity = scrollY < fadeThreshold ? 1 : Math.max(0, 1 - (scrollY - fadeThreshold) / 400);
  const blur = scrollY < fadeThreshold ? 0 : Math.min(10, (scrollY - fadeThreshold) / 50);
  const parallaxY = scrollY < fadeThreshold ? scrollY * 0.5 : fadeThreshold * 0.5; // Parallax se detiene al 90%

  return (
    <section 
      className="relative w-full flex flex-col justify-center items-center overflow-visible"
      style={{ 
        minHeight: 'calc(100vh - 72px)', // Compensación navbar
        paddingTop: '4rem',
        paddingBottom: 'max(4rem, calc(3rem + env(safe-area-inset-bottom)))' // Safe area + espacio inferior
      }}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateY(${parallaxY}px)` }}>
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover scale-105"
          data-ai-hint={heroImage.imageHint}
          priority
        />
        {/* Gradiente superior más intenso para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" 
             style={{ height: '65%' }} />
        {/* Gradiente inferior - muy retrasado y suavizado */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent" 
             style={{ height: '20%' }} />
        {/* Gradientes laterales */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center w-full">
        <div 
          className="container max-w-7xl px-6 w-full" 
          style={{
            opacity: opacity > 0.95 ? 1 : opacity, // Mantener opacidad completa hasta casi el final
            filter: blur > 0.5 ? `blur(${blur}px)` : 'none', // Solo aplicar blur si es significativo
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
          }}
        >
          {/* Título Principal - Nivel 1 */}
          <AnimatedSection 
            as="h1" 
            className="font-headline font-bold tracking-tight text-white
                       bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent
                       drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]
                       animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{
              fontSize: 'clamp(1.875rem, 5.5vw, 4.5rem)', // Reducido 10-12%: 30px → 72px
              lineHeight: 'clamp(1.1, 1.15, 1.2)'
            }}
            animation="slide-up"
          >
            {t.title}
          </AnimatedSection>

          {/* Métrica - Nivel 2 */}
          <AnimatedSection 
            as="p" 
            className="mt-8 font-headline text-xl font-bold text-accent md:text-2xl lg:text-3xl
                       drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]
                       tracking-wide
                       animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-150"
            animation="slide-up"
            delay={0.15}
          >
            {t.subtitle}
          </AnimatedSection>

          {/* Párrafo - Nivel 3 con jerarquía interna */}
          <AnimatedSection 
            as="div" 
            className="mx-auto mt-10 max-w-[1200px] px-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300"
            style={{ marginBottom: 'clamp(3.5rem, 5vw, 5rem)' }}
            animation="slide-up"
            delay={0.3}
          >
            <div className="space-y-6 text-center">
              {/* Línea 1 */}
              <p className="text-lg font-normal text-white/90 md:text-xl lg:text-2xl">
                Cada día, tu flota se enfrenta a lo imprevisible.
              </p>

              {/* Línea 2 - Con Vision360IA */}
              <div className="space-y-4 mt-10">
                <p className="text-base font-light text-white/85 md:text-lg lg:text-xl">
                  Con <strong className="font-semibold text-white">Vision360IA</strong>, tus vehículos ven más allá
                </p>
                
                {/* Badges tecnológicos HUD */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mt-4 max-w-4xl mx-auto">
                  <span className="hero-badge inline-flex items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-emerald-600/20 to-teal-600/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-300/60 hover:from-emerald-500/35 hover:via-emerald-600/30 hover:to-teal-600/35 hover:scale-105 md:px-4 md:py-2 md:text-sm animate-in fade-in zoom-in duration-500 delay-500">
                    <span className="relative">Detecta riesgos</span>
                  </span>
                  <span className="hero-badge inline-flex items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-emerald-600/20 to-teal-600/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-300/60 hover:from-emerald-500/35 hover:via-emerald-600/30 hover:to-teal-600/35 hover:scale-105 md:px-4 md:py-2 md:text-sm animate-in fade-in zoom-in duration-500 delay-600">
                    <span className="relative">Anticipa colisiones</span>
                  </span>
                  <span className="hero-badge inline-flex items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-emerald-600/20 to-teal-600/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-300/60 hover:from-emerald-500/35 hover:via-emerald-600/30 hover:to-teal-600/35 hover:scale-105 md:px-4 md:py-2 md:text-sm animate-in fade-in zoom-in duration-500 delay-700">
                    <span className="relative">Convierte datos en seguridad activa</span>
                  </span>
                </div>
              </div>

              {/* Línea 3 */}
              <p className="text-sm font-light text-white/75 md:text-base lg:text-lg pt-6">
                Tecnología <strong className="font-semibold text-white/90">ADAS potenciada por IA</strong>, diseñada para proteger lo que más importa: <strong className="font-semibold text-white/90">tu equipo y tus activos</strong>.
              </p>
            </div>
          </AnimatedSection>

          {/* Botones CTA */}
          <AnimatedSection
            as="div"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            animation="slide-up"
            delay={0.45}
          >
            <Button size="lg" className="bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90">
              {t.mainCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm shadow-lg transition-transform hover:scale-105 hover:bg-white/20">
              <PlayCircle className="mr-2 h-5 w-5" />
              {t.secondaryCta}
            </Button>
          </AnimatedSection>

          {/* Trust Bar - Franja de confianza */}
          <AnimatedSection
            as="div"
            className="mt-8 w-full max-w-4xl mx-auto"
            animation="slide-up"
            delay={0.55}
          >
            <div className="rounded-full bg-black/20 backdrop-blur-md border border-white/10 px-6 py-4 md:px-8 md:py-5">
              <p className="text-xs text-white/70 mb-3 md:text-sm">{t.trustedBy}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8">
                <p className="font-headline text-base font-semibold text-white/80 grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:text-lg">TRANSCO</p>
                <p className="font-headline text-base font-semibold text-white/80 grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:text-lg">LogiMove</p>
                <p className="font-headline text-base font-semibold text-white/80 grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:text-lg">URBAN-X</p>
                <p className="font-headline text-base font-semibold text-white/80 grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100 md:text-lg">FleetMax</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Badges tecnológicos IP69K, IA ADAS, etc. */}
          <AnimatedSection
            as="div"
            className="mt-8 flex flex-col items-center gap-6"
            style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
            animation="slide-up"
            delay={0.6}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>IP69K</span>
              </Badge>
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span>IA ADAS</span>
              </Badge>
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                <GitMerge className="h-4 w-4 text-purple-400" />
                <span>Integración CAN/FMS</span>
              </Badge>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
