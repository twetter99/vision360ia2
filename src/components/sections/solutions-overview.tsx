'use client';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { SectionWrapper } from '../shared/section-wrapper';

export function SolutionsOverview({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.solutionsSection || initialTranslations.solutionsSection;
  const solutions = translations.solutions || initialTranslations.solutions;

  return (
    <SectionWrapper id="solutions" className="bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado de sección */}
        <AnimatedSection animation="fade-in" delay={0.1}>
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              {t.title || 'Casos de Uso'}
            </h2>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.description || 'Soluciones adaptadas a cada necesidad'}
            </p>
          </div>
        </AnimatedSection>

        {/* Grid de soluciones - scroll natural */}
        <div className="space-y-12 md:space-y-16">
          {solutions.map((solution, index) => (
            <AnimatedSection
              key={solution.id}
              animation="fade-in"
              delay={index * 0.15}
              className="w-full"
            >
              <Card className="overflow-hidden shadow-xl border-border/50 hover:shadow-2xl transition-shadow duration-300">
                <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[500px] ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Imagen - alterna izquierda/derecha en desktop */}
                  <div className={`relative min-h-[300px] lg:min-h-full ${
                    index % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}>
                    <Image
                      src={solution.image.imageUrl}
                      alt={solution.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={solution.image.imageHint}
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex flex-col justify-center p-8 md:p-12 bg-card">
                    <div className="mb-4">
                      <span className="inline-block px-4 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                        {solution.vehicleType}
                      </span>
                    </div>
                    
                    <h3 className="mb-4 font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                      {solution.title}
                    </h3>
                    
                    <p className="mb-6 text-muted-foreground text-justify text-base md:text-lg leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <ul className="mb-8 space-y-3">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                          <span className="font-medium text-foreground text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button size="lg" className="w-full sm:w-fit group">
                      {t.learnMore}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
