'use client';
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

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center py-20">
      <div className="absolute inset-0">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <AnimatedSection as="div" className="container" animation="slide-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            {t.title}
          </h1>
          <p className="mt-4 font-headline text-xl font-semibold text-accent drop-shadow-md md:text-2xl">
            {t.subtitle}
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-primary-foreground/90 drop-shadow-md md:text-xl text-justify">
            {t.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90">
              {t.mainCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-border/70 bg-background/50 backdrop-blur-sm shadow-lg transition-transform hover:scale-105 hover:bg-background/80">
              <PlayCircle className="mr-2 h-5 w-5" />
              {t.secondaryCta}
            </Button>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>IP69K</span>
              </Badge>
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span>IA ADAS</span>
              </Badge>
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                <GitMerge className="h-4 w-4 text-purple-400" />
                <span>Integración CAN/FMS</span>
              </Badge>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-primary-foreground/70">{t.trustedBy}</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-75">
                <p className="font-headline text-xl font-semibold text-white">TRANSCO</p>
                <p className="font-headline text-xl font-semibold text-white">LogiMove</p>
                <p className="font-headline text-xl font-semibold text-white">URBAN-X</p>
                <p className="font-headline text-xl font-semibold text-white">FleetMax</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
