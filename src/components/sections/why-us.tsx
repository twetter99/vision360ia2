
'use client';
import { SectionWrapper } from '../shared/section-wrapper';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import {
  Users,
  Handshake,
  BrainCircuit,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import React from 'react';
import { AnimatedSection } from '../shared/animated-section';
import { Button } from '../ui/button';
import Link from 'next/link';

const iconMap: { [key: string]: React.ElementType } = {
  Users,
  Handshake,
  BrainCircuit,
  Lightbulb,
};

export function WhyUs({
  translations: initialTranslations,
}: {
  translations: Translation['es'];
}) {
  const { language, translations } = useLanguage();
  const t = translations.whyWinfinSection || initialTranslations.whyWinfinSection;
  const cards = translations.whyWinfinCards || initialTranslations.whyWinfinCards;

  return (
    <SectionWrapper id="why-winfin" className="bg-card" lang={language}>
      <div className="mx-auto max-w-7xl">
        <AnimatedSection animation="fade-in" delay={0.1}>
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl [text-wrap:balance]">
                {t.title}
              </h2>
              <p className="mt-4 max-w-prose text-lg text-muted-foreground text-justify leading-relaxed tracking-normal">
                {t.description}
              </p>
            </div>
            <Link href="/quienes-somos" passHref>
              <Button
                variant="secondary"
                className="shrink-0"
                aria-label={t.aboutUsAriaLabel}
              >
                {t.aboutUsButton}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon];
            return (
              <AnimatedSection
                key={card.id}
                as="div"
                animation="fade-in"
                delay={0.2 + index * 0.1}
                className="h-full"
              >
                <Card className="flex h-full flex-col rounded-2xl border-border/50 bg-background shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-lg focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <CardHeader className="p-6">
                    {Icon && (
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                    )}
                    <CardTitle className="font-headline text-xl font-bold [text-wrap:balance]">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p
                      className="text-left leading-relaxed tracking-normal text-muted-foreground"
                      lang={language}
                      dangerouslySetInnerHTML={{ __html: card.text }}
                    />
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
