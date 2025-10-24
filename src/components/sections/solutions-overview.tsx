'use client';
import Image from 'next/image';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';

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
            <TabsTrigger key={solution.id} value={solution.id} className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {solution.vehicleType}
            </TabsTrigger>
          ))}
        </TabsList>
        {solutions.map((solution) => (
          <TabsContent key={solution.id} value={solution.id} className="mt-8">
            <Card className="overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative min-h-[300px] md:min-h-0">
                  <Image
                    src={solution.image.imageUrl}
                    alt={solution.image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={solution.image.imageHint}
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <h3 className="mb-3 font-headline text-2xl font-bold">{solution.title}</h3>
                  <p className="mb-6 text-muted-foreground">{solution.description}</p>
                  <ul className="mb-8 space-y-3">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="w-full sm:w-fit">{t.learnMore}</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </SectionWrapper>
  );
}
