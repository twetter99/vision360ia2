'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { AnimatedSection } from '../shared/animated-section';
import { useLanguage } from '@/hooks/use-language';
import { useContactSlideOver } from '@/context/contact-slideover-provider';
import type { Translation } from '@/lib/translations';

export function WhyUs({
  translations: initialTranslations,
}: {
  translations: Translation['es'];
}) {
  const { translations } = useLanguage();
  const { openContactSlideOver } = useContactSlideOver();
  const t = translations.whyWinfinSection || initialTranslations.whyWinfinSection;
  const cards = translations.whyWinfinCards || initialTranslations.whyWinfinCards;
  const localPresence = 'localPresence' in t ? t.localPresence : undefined;
  const implementationPhases = [
    {
      step: '01',
      title: 'Analisis del vehiculo',
      description: 'Evaluamos geometria, puntos ciegos, maniobras y tipologia antes de definir cobertura.',
    },
    {
      step: '02',
      title: 'Diseno de instalacion',
      description: 'La arquitectura se adapta a zonas de riesgo, recorrido operativo y condicion real de la flota.',
    },
    {
      step: '03',
      title: 'Montaje profesional',
      description: 'Integramos camaras, cableado y equipos embarcados sobre flota existente en operacion.',
    },
    {
      step: '04',
      title: 'Calibracion y validacion',
      description: 'Ajustamos el sistema y validamos su utilidad en condiciones reales de servicio.',
    },
  ];
  const accentStyles = [
    {
      card: 'border-sky-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.96))]',
      halo: 'from-sky-500/20 via-blue-500/8 to-transparent',
      accent: 'bg-sky-500',
    },
    {
      card: 'border-indigo-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,242,255,0.96))]',
      halo: 'from-indigo-500/20 via-sky-500/8 to-transparent',
      accent: 'bg-indigo-500',
    },
    {
      card: 'border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
      halo: 'from-amber-400/22 via-orange-500/10 to-transparent',
      accent: 'bg-amber-500',
    },
    {
      card: 'border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))]',
      halo: 'from-emerald-400/22 via-teal-500/10 to-transparent',
      accent: 'bg-emerald-500',
    },
  ];

  return (
    <SectionWrapper id="why-winfin" className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.subtitle}
          className="max-w-5xl"
        />

        <AnimatedSection animation="slide-up" delay={0.04} className="mx-auto mb-10 max-w-6xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.92))] shadow-[var(--shadow-soft)] backdrop-blur-md">
          <div className="relative overflow-hidden px-6 pb-6 pt-6 md:px-8 md:pb-8 md:pt-8">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),rgba(255,255,255,0)_68%)] blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_0.8fr] lg:items-end">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/75">Proceso de implantacion</p>
                  <h3 className="max-w-3xl font-headline text-2xl font-semibold tracking-[-0.04em] text-slate-950 md:text-3xl lg:text-[2.35rem] lg:leading-[1.02]">
                    No instalamos un kit estandar. Diseñamos una cobertura util para cada vehiculo.
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                    La fiabilidad en flota depende del proceso completo: analisis previo, diseño tecnico, instalacion profesional y validacion en servicio.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="rounded-2xl border border-sky-100 bg-white/80 px-4 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Cobertura por tipologia</div>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-700 md:text-[0.96rem]">
                      Cada autobus, camion o vehiculo especial exige una arquitectura distinta para cubrir sus maniobras criticas.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Validacion en servicio</div>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-700 md:text-[0.96rem]">
                      Ajustamos y comprobamos el sistema en condiciones reales para que la alerta sea util y no ruido operativo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(241,245,249,0.78),rgba(255,255,255,0.96))] p-3 shadow-[0_24px_55px_rgba(15,23,42,0.08)] md:p-5">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <Image
                    src="/images/fases_instalacion_vision360.png"
                    alt="Proceso de implantacion de Vision360IA: analisis del vehiculo, diseño de instalacion, montaje profesional y calibracion final."
                    fill
                    priority={false}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1100px"
                    className="object-contain object-center"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {implementationPhases.map((phase) => (
                  <article
                    key={phase.step}
                    className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-4 py-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)]"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Fase {phase.step}</div>
                    <h4 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-slate-900">{phase.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{phase.description}</p>
                  </article>
                ))}
              </div>

              <div className="flex flex-col gap-5 rounded-[1.75rem] border border-slate-200/80 bg-slate-950 px-5 py-5 text-white shadow-[0_24px_55px_rgba(15,23,42,0.18)] md:px-6 md:py-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/80">Revision tecnica previa</div>
                  <p className="mt-3 text-base font-medium leading-relaxed text-white/92 md:text-lg">
                    Si tu flota opera en entorno urbano o maniobras criticas, revisamos la tipologia del vehiculo y proponemos una implantacion ajustada a su geometria real.
                  </p>
                  {localPresence ? (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68 md:text-[0.96rem]">
                      {localPresence}
                    </p>
                  ) : null}
                </div>
                <div className="flex w-full max-w-[28rem] flex-col gap-3 lg:max-w-[24rem] lg:items-end xl:max-w-[30rem]">
                  <div className="flex w-full flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <Link
                      href="/quienes-somos"
                      aria-label={t.aboutUsAriaLabel}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-medium text-white/86 transition-all duration-300 hover:bg-white/10"
                    >
                      {t.aboutUsButton}
                    </Link>
                    <button
                      type="button"
                      onClick={openContactSlideOver}
                      className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.24)] transition-all duration-300 hover:bg-accent/90"
                    >
                      Ver si encaja en mi flota
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((card, index) => {
            const accent = accentStyles[index] || accentStyles[accentStyles.length - 1];
            const sequence = String(index + 1).padStart(2, '0');

            return (
              <AnimatedSection
                key={card.id}
                as="article"
                animation="slide-up"
                delay={0.04 + index * 0.06}
                className="h-full"
              >
                <div
                  tabIndex={0}
                  className={`group interactive-tile elevated-card relative flex h-full min-h-[24rem] overflow-hidden rounded-[2rem] border p-6 outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:p-7 lg:min-h-[28rem] ${accent.card}`}
                >
                  <div className={`pointer-events-none absolute inset-x-6 top-5 h-24 rounded-full bg-gradient-to-r ${accent.halo} blur-3xl`} />
                  <div className={`pointer-events-none absolute left-7 top-8 h-12 w-px ${accent.accent} opacity-70`} />

                  <div className="relative z-10 flex h-full w-full flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <span className="pl-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 md:text-xs">
                        {card.label}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-300 transition-colors duration-300 lg:group-hover:text-slate-400 lg:group-focus-visible:text-slate-400">
                        {sequence}
                      </span>
                    </div>

                    <div className="mt-8 max-w-[15rem] transition-transform duration-500 ease-out lg:group-hover:-translate-y-3 lg:group-focus-visible:-translate-y-3">
                      <h3 className="font-headline text-[2.4rem] font-semibold leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-[2.75rem] lg:text-[2.55rem]">
                        {card.metric}
                      </h3>
                    </div>

                    <p className="mt-4 max-w-[18rem] text-sm leading-7 text-slate-600 transition-transform duration-500 ease-out lg:group-hover:-translate-y-2 lg:group-focus-visible:-translate-y-2 md:text-[0.96rem]">
                      {card.text}
                    </p>

                    <div className="relative mt-auto pt-8">
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/90 via-white/60 to-transparent lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100" />
                      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-slate-200/70 px-4 py-3 backdrop-blur-sm">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                            {card.footerLabel}
                          </span>
                          <span className={`h-2.5 w-2.5 rounded-full ${accent.accent}`} />
                        </div>
                        <div className="relative aspect-[5/4] overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0.08))]">
                          <Image
                            src={card.image}
                            alt={card.imageAlt}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                            style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                            className="object-cover object-center opacity-100 transition-[opacity,transform,filter] duration-500 ease-out lg:translate-y-5 lg:scale-[1.04] lg:opacity-0 lg:grayscale-[0.1] lg:group-hover:translate-y-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:scale-100 lg:group-focus-visible:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/22 via-slate-900/6 to-transparent opacity-60 transition-opacity duration-500 lg:opacity-40 lg:group-hover:opacity-15 lg:group-focus-visible:opacity-15" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
