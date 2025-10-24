'use client';
import Image from 'next/image';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';

export function SolutionsOverview({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.solutionsSection || initialTranslations.solutionsSection;
  const solutions = translations.solutions || initialTranslations.solutions;

  return (
    <SectionWrapper id="solutions" className="bg-card">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <Tabs defaultValue={solutions[0].id} className="w-full">
        <TabsList className="mx-auto grid h-auto w-full max-w-lg grid-cols-1 sm:grid-cols-3">
          {solutions.map((solution) => (
            <TabsTrigger key={solution.id} value={solution.id} className="py-2.5 font-headline text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">
              {solution.vehicleType}
            </TabsTrigger>
          ))}
        </TabsList>
        {solutions.map((solution) => (
          <TabsContent key={solution.id} value={solution.id} className="mt-10">
            <AnimatedSection animation="fade-in">
              <Card className="overflow-hidden shadow-lg border-border/50">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-[300px] lg:min-h-0">
                    <Image
                      src={solution.image.imageUrl}
                      alt={solution.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={solution.image.imageHint}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <h3 className="mb-4 font-headline text-3xl font-bold text-primary">{solution.title}</h3>
                    <p className="mb-6 text-muted-foreground">{solution.description}</p>
                    <ul className="mb-8 space-y-4">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <ShieldCheck className="h-6 w-6 flex-shrink-0 text-primary" />
                          <span className="font-medium text-foreground">{feature}</span>
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
          </TabsContent>
        ))}
      </Tabs>
    </SectionWrapper>
  );
}
