'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { heroData } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';

export function Hero({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.hero || initialTranslations.hero;
  const heroImage = heroData.image;

  return (
    <section className="relative h-screen min-h-[750px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <AnimatedSection as="div" className="container" animation="slide-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-primary-foreground/90 drop-shadow-md md:text-xl">
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
        </AnimatedSection>
      </div>
    </section>
  );
}
