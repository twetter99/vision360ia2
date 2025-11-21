'use client';
import { SectionWrapper } from '../shared/section-wrapper';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import {
  Users,
  Handshake,
  BrainCircuit,
  Lightbulb,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

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

  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer para animaciones
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px',
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [cards.length]);

  return (
    <div className="relative bg-[#f9f9f9] py-16 md:py-20">
      <SectionWrapper id="why-winfin" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          {/* Encabezado */}
          <div className="mb-10 text-center lg:mb-12">
            <h2 className="apple-text apple-smooth text-4xl font-semibold tracking-tight text-[#333] md:text-5xl">
              {t.title}
            </h2>
          </div>

          {/* Grid 2x2 de píldoras */}
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {cards.map((card, index) => {
              const Icon = iconMap[card.icon];
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`transform transition-all duration-[600ms] ease-out ${
                    isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  role="article"
                  aria-label={`${card.title} - Beneficio ${index + 1} de ${cards.length}`}
                >
                  <div className="rounded-3xl bg-white p-6 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:border-primary/20 border border-transparent md:p-8 h-full flex flex-col md:min-h-[280px]">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#0077ed] text-white shadow-md">
                      {Icon && <Icon className="h-7 w-7" />}
                    </div>

                    <h3 className="apple-text mb-2 text-xl font-semibold text-[#1d1d1f] md:text-2xl">
                      {card.title}
                    </h3>

                    {/* Subtítulo si existe */}
                    {(card as any).subtitle && (
                      <p className="apple-text mb-3 text-base font-medium text-primary md:text-lg">
                        {(card as any).subtitle}
                      </p>
                    )}

                    {/* Métrica grande si existe */}
                    {(card as any).metric && (
                      <div className="mb-4">
                        <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                          {(card as any).metric}
                        </div>
                      </div>
                    )}

                    <div
                      className="apple-text text-sm leading-relaxed text-[#6e6e73] md:text-base flex-grow"
                      dangerouslySetInnerHTML={{ __html: card.text }}
                    />

                    {/* Submétrica si existe */}
                    {(card as any).submetric && (
                      <div className="mt-4 text-lg font-semibold text-[#1d1d1f]">
                        {(card as any).submetric}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
