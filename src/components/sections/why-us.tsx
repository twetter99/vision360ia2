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
    <div className="relative bg-[#f9f9f9] py-16 md:py-24">
      <SectionWrapper id="why-winfin" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          {/* Encabezado */}
          <div className="mb-12 text-center lg:mb-16">
            <h2 className="apple-text apple-smooth mb-4 text-4xl font-semibold tracking-tight text-[#333] md:text-5xl">
              {t.title}
            </h2>
            <div className="mx-auto text-center max-w-[66ch] md:max-w-[68ch] px-4">
              {t.description.split('\n').map((line, idx) => (
                <p
                  key={idx}
                  className={`apple-text apple-smooth text-lg md:text-xl leading-relaxed text-[#6e6e73] text-balance ${idx > 0 ? 'mt-4' : ''}`}
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </div>
          </div>

          {/* Tarjetas apiladas verticalmente */}
          <div className="mx-auto max-w-4xl space-y-8 md:space-y-12">
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
                  <div className="rounded-3xl bg-white p-8 shadow-lg transition-transform hover:scale-[1.02] md:p-12">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#0077ed] text-white shadow-md">
                      {Icon && <Icon className="h-8 w-8" />}
                    </div>

                    <h3 className="apple-text mb-4 text-2xl font-semibold text-[#1d1d1f] md:text-3xl">
                      {card.title}
                    </h3>

                    <div
                      className="apple-text text-base leading-relaxed text-[#6e6e73] md:text-lg"
                      dangerouslySetInnerHTML={{ __html: card.text }}
                    />
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
