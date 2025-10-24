'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { heroData } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';

export function Hero({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.hero || initialTranslations.hero;
  const heroImage = heroData.image;

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full">
      <div className="absolute inset-0 bg-primary/5">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover opacity-20"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <AnimatedSection as="div" className="container" animation="slide-up">
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {t.title}
            <br />
            <span className="text-primary">{t.subtitle}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            {t.description}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              {t.mainCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-border/70 bg-background/50 backdrop-blur-sm hover:bg-background/80">
              {t.secondaryCta}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
