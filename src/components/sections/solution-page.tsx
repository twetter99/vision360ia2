import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AnimatedSection } from '@/components/shared/animated-section';
import { ContactFormButton } from '@/components/shared/contact-form-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';

type Stat = {
  value: string;
  label: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  label: string;
};

type BreadcrumbItem = {
  href: string;
  label: string;
};

type FeatureCard = {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: string;
  iconTone: string;
  tag: string;
};

type DetailGroup = {
  title: string;
  specs: string[];
};

type DetailSection = {
  eyebrow: string;
  title: string;
  description?: string;
  variant: 'chips' | 'checklist' | 'groups';
  items?: string[];
  groups?: DetailGroup[];
  bulletColorClass?: string;
};

type HeroBlock = {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  panelEyebrow: string;
  panelTitle: string;
  panelIcon: LucideIcon;
  stats: Stat[];
  gains: string[];
};

type ContextBlock = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  asideEyebrow: string;
  asideItems: string[];
};

type FeatureBlock = {
  eyebrow: string;
  title: string;
  cards: FeatureCard[];
};

type MetricsBlock = {
  eyebrow: string;
  title: string;
  items: Stat[];
};

type ImplementationBlock = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
};

type FaqBlock = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

type CtaBlock = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  relatedLinks: RelatedLink[];
};

export type SolutionPageData = {
  schemas: Record<string, unknown>[];
  breadcrumbLabel: string;
  theme: {
    heroBackground: string;
    heroGlowPrimary: string;
    heroGlowSecondary: string;
    heroAccentText: string;
    heroPanelIconBg: string;
    heroPanelIconText: string;
    heroGainText: string;
    primaryButton: string;
    secondaryButtonText?: string;
    eyebrowText: string;
    metricBackground: string;
    metricEyebrowText: string;
    ctaBackground: string;
    ctaEyebrowText: string;
    detailBullet?: string;
  };
  hero: HeroBlock;
  context: ContextBlock;
  features: FeatureBlock;
  detailSection?: DetailSection;
  implementation?: ImplementationBlock;
  metrics: MetricsBlock;
  faq: FaqBlock;
  cta: CtaBlock;
};

function DetailSectionContent({ section, bulletColorClass }: { section: DetailSection; bulletColorClass: string }) {
  if (section.variant === 'groups') {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {section.groups?.map((group, index) => (
          <AnimatedSection
            key={group.title}
            as="div"
            animation="slide-up"
            delay={0.04 + index * 0.06}
            className="interactive-tile rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-slate-950">{group.title}</h3>
            <ul className="space-y-3">
              {group.specs.map((entry) => (
                <li key={entry} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${bulletColorClass}`} />
                  {entry}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        ))}
      </div>
    );
  }

  const items = section.items ?? [];

  if (section.variant === 'checklist') {
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <AnimatedSection
            key={item}
            as="div"
            animation="slide-up"
            delay={0.04 + index * 0.05}
            className="interactive-tile flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700"
          >
            <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${bulletColorClass}`} />
            {item}
          </AnimatedSection>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((item, index) => (
        <AnimatedSection
          key={item}
          as="div"
          animation="slide-up"
          delay={0.04 + index * 0.05}
          className="interactive-tile rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-5 text-center text-sm font-semibold text-slate-700 md:text-base"
        >
          {item}
        </AnimatedSection>
      ))}
    </div>
  );
}

export function SolutionPage({ data }: { data: SolutionPageData }) {
  const BadgeIcon = data.hero.badgeIcon;
  const PanelIcon = data.hero.panelIcon;
  const detailBulletClass = data.detailSection?.bulletColorClass ?? data.theme.detailBullet ?? 'bg-sky-500';
  const breadcrumbItems: BreadcrumbItem[] = [
    { href: '/', label: 'Inicio' },
    { href: '/#solutions', label: 'Soluciones' },
    { href: '#top', label: data.breadcrumbLabel },
  ];
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://www.vision360ia.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Soluciones',
        item: 'https://www.vision360ia.com/#solutions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.breadcrumbLabel,
      },
    ],
  };

  return (
    <>
      <script
        key="solution-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {data.schemas.map((schema, index) => (
        <script
          key={`solution-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article id="top" className={data.theme.heroBackground}>
        <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-24">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.98))]" />
          <div className="absolute inset-0 hero-grid opacity-[0.16]" />
          <div className={`absolute left-[8%] top-[16%] h-40 w-40 rounded-full blur-3xl ${data.theme.heroGlowPrimary}`} />
          <div className={`absolute right-[10%] top-[22%] h-56 w-56 rounded-full blur-3xl ${data.theme.heroGlowSecondary}`} />
          <div className="container relative mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;

                return (
                  <span key={`${item.label}-${item.href}`} className="flex items-center gap-2">
                    {isLast ? (
                      <span className="font-medium text-slate-700">{item.label}</span>
                    ) : (
                      <Link href={item.href} className="transition-colors hover:text-slate-950">
                        {item.label}
                      </Link>
                    )}
                    {!isLast ? <span className="text-slate-300">/</span> : null}
                  </span>
                );
              })}
            </nav>
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <AnimatedSection animation="slide-up" className="max-w-4xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-md md:text-xs">
                  <BadgeIcon className={`h-4 w-4 ${data.theme.heroAccentText}`} />
                  {data.hero.badge}
                </div>

                <h1 className="max-w-4xl font-headline text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-slate-950 md:text-6xl">
                  {data.hero.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
                  {data.hero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {data.hero.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-slate-200/80 bg-white/82 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <ContactFormButton size="lg" className={`min-h-[54px] w-full justify-center rounded-full px-7 sm:w-auto ${data.theme.primaryButton}`}>
                    {data.hero.primaryCtaLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ContactFormButton>
                  <Link href="/#productos" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className={`min-h-[54px] w-full justify-center rounded-full border-slate-200 bg-white/90 px-7 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-md hover:bg-slate-50 sm:w-auto ${data.theme.secondaryButtonText ?? ''}`}
                    >
                      {data.hero.secondaryCtaLabel}
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-up" delay={0.08} className="rounded-[2rem] border border-white/80 bg-white/92 p-5 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${data.theme.heroPanelIconBg} ${data.theme.heroPanelIconText}`}>
                    <PanelIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{data.hero.panelEyebrow}</p>
                    <h2 className="text-xl font-semibold text-slate-950 md:text-2xl">{data.hero.panelTitle}</h2>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {data.hero.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-slate-950">{stat.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/95 p-5">
                  <div className={`mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] ${data.theme.heroGainText}`}>
                    <ArrowRight className="h-4 w-4" />
                    Lo que gana la operación
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                    {data.hero.gains.map((gain) => (
                      <li key={gain} className="flex gap-3">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${data.theme.heroGainText}`} />
                        {gain}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <SectionWrapper className="max-w-7xl bg-transparent px-6 py-20 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <AnimatedSection animation="slide-up" className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${data.theme.eyebrowText}`}>{data.context.eyebrow}</p>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">{data.context.title}</h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate-700">
                {data.context.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={0.08} className="elevated-card rounded-[2rem] border border-white/70 p-6 md:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{data.context.asideEyebrow}</p>
              <div className="space-y-4">
                {data.context.asideItems.map((item) => (
                  <div key={item} className="interactive-tile rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </SectionWrapper>

        {data.implementation ? (
          <SectionWrapper className="max-w-7xl bg-transparent px-6 py-6 md:px-6 md:py-8">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <AnimatedSection animation="slide-up">
                  <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${data.theme.eyebrowText}`}>{data.implementation.eyebrow}</p>
                  <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">{data.implementation.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">{data.implementation.description}</p>
                </AnimatedSection>
                <div className="grid gap-4 md:grid-cols-2">
                  {data.implementation.steps.map((step, index) => (
                    <AnimatedSection
                      key={step}
                      as="div"
                      animation="slide-up"
                      delay={0.04 + index * 0.05}
                      className="interactive-tile rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-5 text-slate-700"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Paso {index + 1}</div>
                      <div className="mt-2 text-base font-medium leading-relaxed">{step}</div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>
        ) : null}

        <SectionWrapper className="max-w-7xl bg-transparent px-6 py-20 md:px-6">
          <SectionHeading eyebrow={data.features.eyebrow} title={data.features.title} className="max-w-4xl" />
          <div className="grid gap-6 md:grid-cols-2">
            {data.features.cards.map((item, index) => (
              <AnimatedSection
                key={item.title}
                as="article"
                animation="slide-up"
                delay={0.04 + index * 0.06}
                className={`elevated-card rounded-[2rem] border p-6 md:p-8 ${item.tone}`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md ${item.iconTone}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </SectionWrapper>

        {data.detailSection ? (
          <SectionWrapper className="max-w-7xl bg-transparent px-6 py-16 md:px-6 md:py-20">
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
              {data.detailSection.variant === 'groups' ? (
                <div>
                  <SectionHeading
                    eyebrow={data.detailSection.eyebrow}
                    title={data.detailSection.title}
                    description={data.detailSection.description}
                    className="mb-10 max-w-4xl"
                  />
                  <DetailSectionContent section={data.detailSection} bulletColorClass={detailBulletClass} />
                </div>
              ) : (
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <AnimatedSection animation="slide-up">
                    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${data.theme.eyebrowText}`}>{data.detailSection.eyebrow}</p>
                    <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">{data.detailSection.title}</h2>
                    {data.detailSection.description ? (
                      <p className="mt-4 text-lg leading-relaxed text-slate-600">{data.detailSection.description}</p>
                    ) : null}
                  </AnimatedSection>
                  <DetailSectionContent section={data.detailSection} bulletColorClass={detailBulletClass} />
                </div>
              )}
            </div>
          </SectionWrapper>
        ) : null}

        <SectionWrapper className="max-w-7xl bg-transparent px-6 py-20 md:px-6">
          <div className={`rounded-[2.25rem] border border-white/80 px-6 py-10 text-slate-950 shadow-[var(--shadow-soft)] md:px-10 md:py-12 ${data.theme.metricBackground}`}>
            <div className="mb-10 flex flex-col gap-3 text-center">
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${data.theme.metricEyebrowText}`}>{data.metrics.eyebrow}</p>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{data.metrics.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {data.metrics.items.map((stat, index) => (
                <AnimatedSection
                  key={stat.label}
                  as="div"
                  animation="slide-up"
                  delay={0.04 + index * 0.05}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-white px-4 py-5 text-center shadow-[0_12px_28px_rgba(15,23,42,0.05)] backdrop-blur-sm md:px-5 md:py-6"
                >
                  <div className="text-3xl font-bold text-slate-950 md:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500 md:text-[11px]">{stat.label}</div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="faq" className="max-w-5xl bg-transparent px-6 py-20 md:px-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <SectionHeading eyebrow={data.faq.eyebrow} title={data.faq.title} className="mb-10 max-w-4xl" />
            <Accordion type="single" collapsible className="space-y-4">
              {data.faq.items.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/85 px-5 data-[state=open]:border-slate-300/90"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionWrapper>

        <SectionWrapper className="max-w-6xl bg-transparent px-6 pb-20 pt-6 md:px-6 md:pb-24">
          <div className={`rounded-[2.25rem] border border-white/80 px-6 py-10 text-slate-950 shadow-[var(--shadow-soft)] md:px-10 md:py-12 ${data.theme.ctaBackground}`}>
            <div className="mx-auto max-w-3xl text-center">
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${data.theme.ctaEyebrowText}`}>{data.cta.eyebrow}</p>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{data.cta.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70 md:text-xl">{data.cta.description}</p>
              <div className="mt-8 flex justify-center">
                <ContactFormButton size="lg" className={`min-h-[54px] rounded-full px-7 ${data.theme.primaryButton}`}>
                  {data.cta.primaryCtaLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ContactFormButton>
              </div>
            </div>
            <nav className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-white/70" aria-label="Páginas relacionadas">
              {data.cta.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-white/15 bg-white px-4 py-2 text-slate-600 transition-colors hover:border-white/35 hover:text-slate-950">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </SectionWrapper>
      </article>
    </>
  );
}