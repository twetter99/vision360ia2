'use client';
import { TruckIcon, Network, HardHat } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { SectionWrapper } from '../shared/section-wrapper';

const vehicleIcons = {
  'Furgonetas': TruckIcon,
  'Flotas': Network,
  'Profesionales': HardHat,
};

export function SolutionsOverview({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.solutionsSection || initialTranslations.solutionsSection;
  const solutions = translations.solutions || initialTranslations.solutions;

  return (
    <SectionWrapper id="solutions" className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Encabezado de sección */}
        <AnimatedSection animation="fade-in" delay={0.1}>
          <div className="mb-10 text-center">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t.title || 'Casos de Uso'}
            </h2>
          </div>
        </AnimatedSection>

        {/* Grid 1x3 compacto */}
        <AnimatedSection animation="fade-in" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution, index) => {
              const Icon = vehicleIcons[solution.vehicleType as keyof typeof vehicleIcons] || TruckIcon;
              
              return (
                <div
                  key={solution.id}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-transparent hover:border-primary/20 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
                >
                  {/* Icono */}
                  <div className="mb-4 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  
                  {/* Tipo de vehículo */}
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                    {solution.vehicleType}
                  </h3>
                  
                  {/* Subtítulo corto */}
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {solution.title}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
