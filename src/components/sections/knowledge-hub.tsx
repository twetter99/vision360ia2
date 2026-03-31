import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { AnimatedSection } from '@/components/shared/animated-section';
import { SectionHeading } from '@/components/shared/section-heading';
import { SectionWrapper } from '@/components/shared/section-wrapper';

const topicCards = [
  {
    eyebrow: 'Normativa y ángulo muerto',
    title: 'Sistema BSIS para camiones y autobuses',
    description:
      'Explicación práctica de R151, protección VRU y cómo encajar BSIS con visión 360° en una flota real.',
    href: '/bsis-camiones-autobuses',
  },
  {
    eyebrow: 'Prevención frontal',
    title: 'Sistema FCW para flotas',
    description:
      'Qué aporta una alerta de colisión frontal y cómo se conecta con una arquitectura ADAS más amplia.',
    href: '/fcw-flotas',
  },
  {
    eyebrow: 'Transporte de viajeros',
    title: 'ADAS para autocares y minibuses',
    description:
      'Cobertura específica para lanzaderas, escolares, aeropuerto y servicios de viajeros con maniobras críticas.',
    href: '/adas-autocares-minibuses',
  },
  {
    eyebrow: 'Última milla',
    title: 'ADAS para furgonetas de reparto',
    description:
      'Reparto urbano, carga y descarga y visión artificial aplicada a flotas ligeras con alta repetición operativa.',
    href: '/adas-furgonetas-reparto',
  },
  {
    eyebrow: 'Sector aeroportuario',
    title: 'ADAS para aeropuerto y lanzaderas',
    description:
      'Cobertura para shuttle buses, lanzaderas, minibuses y vehículos de apoyo con maniobras en terminales y accesos complejos.',
    href: '/adas-aeropuerto-lanzaderas',
  },
  {
    eyebrow: 'Sector portuario',
    title: 'ADAS para logística portuaria',
    description:
      'Visión 360° y prevención de riesgo en patios, muelles, portacontenedores y operativa con tráfico mixto en entorno portuario.',
    href: '/adas-logistica-portuaria',
  },
  {
    eyebrow: 'Construcción y obra',
    title: 'ADAS para construcción y obra',
    description:
      'Visión 360°, maniobra crítica y protección persona-máquina para excavadoras, dumpers, palas y vehículos de obra.',
    href: '/adas-construccion-obra',
  },
];

export function KnowledgeHub() {
  return (
    <SectionWrapper className="section-band section-band-mist bg-transparent">
      <SectionHeading
        eyebrow="RECURSOS Y COBERTURA"
        title="Contexto técnico para búsquedas más específicas"
        description="Además de las soluciones principales, Vision360IA ya cubre conceptos, tipologías y sectores que suelen aparecer en búsquedas técnicas o verticales: BSIS, FCW, autocares, minibuses, furgonetas, aeropuerto y logística portuaria."
      />

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {topicCards.map((card, index) => (
          <AnimatedSection
            key={card.href}
            as="article"
            animation="slide-up"
            delay={0.04 + index * 0.05}
            className="elevated-card flex h-full flex-col rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700/80">
              {card.eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              {card.title}
            </h2>
            <p className="mt-4 flex-1 text-base leading-relaxed text-slate-600">
              {card.description}
            </p>
            <div className="mt-6">
              <Link
                href={card.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
              >
                <span>Ver recurso</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}