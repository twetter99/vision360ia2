import Link from 'next/link';
import { CheckCircle2, type LucideIcon } from 'lucide-react';

import { AnimatedSection } from '@/components/shared/animated-section';
import { ContactFormButton } from '@/components/shared/contact-form-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SolutionStat {
  value: string;
  label: string;
}

export interface SolutionFeatureCard {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: string;
  iconTone: string;
  tag: string;
}

export interface SolutionFaqItem {
  q: string;
  a: string;
}

export interface SolutionLinkItem {
  href: string;
  label: string;
}

export interface SolutionSpecGroup {
  title: string;
  specs: string[];
}

export interface SolutionTheme {
  heroBackground: string;
  heroGlowStart: string;
  heroGlowEnd: string;
  accentText: string;
  accentSoftText: string;
  badgeIcon: string;
  heroPanelIconBg: string;
  heroPanelIconText: string;
  heroPanelAccent: string;
  primaryButton: string;
  darkPanel: string;
  specDot: string;
  relatedLinkHover: string;
}

export interface SolutionPageContent {
  schemas?: Record<string, unknown>[];
  theme: SolutionTheme;
  hero: {
    badge: string;
    badgeIcon: LucideIcon;
    title: string;
    description: string;
    highlights: string[];
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    panelEyebrow: string;
    panelTitle: string;
    panelIcon: LucideIcon;
    panelStats: SolutionStat[];
    panelBenefitsLabel: string;
    panelBenefits: string[];
  };
  context: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    sideTitle: string;
    sideItems: string[];
    sideStyle?: 'tiles' | 'check';
  };
  features: {
    eyebrow: string;
    title: string;
    description?: string;
    cards: SolutionFeatureCard[];
  };
  middleSection?:
    | {
        type: 'tag-grid';
        eyebrow: string;
        title: string;
        description: string;
        items: string[];
      }
    | {
        type: 'spec-groups';
        eyebrow: string;
        title: string;
        groups: SolutionSpecGroup[];
      };
  metrics: {
    eyebrow: string;
    title: string;
    items: SolutionStat[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: SolutionFaqItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    relatedLinks: SolutionLinkItem[];
  };
}

export function SolutionPageTemplate({ content }: { content: SolutionPageContent }) {
  const { hero, context, features, middleSection, metrics, faq, cta, theme, schemas } = content;
  const HeroBadgeIcon = hero.badgeIcon;
  const HeroPanelIcon = hero.panelIcon;

  return (
    <>
      {schemas?.map((schema, index) => (
        <script
          key={`solution-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f8fafc_100%)]">
        <section className={cn('relative overflow-hidden px-6 pb-18 pt-20 text-white md:pb-24 md:pt-24', theme.heroBackground)}>
          <div className="absolute inset-0 hero-grid opacity-65" />
          <div className={cn('absolute left-[8%] top-[14%] h-40 w-40 rounded-full blur-3xl', theme.heroGlowStart)} />
          <div className={cn('absolute right-[10%] top-[18%] h-56 w-56 rounded-full blur-3xl', theme.heroGlowEnd)} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/12 via-transparent to-slate-950/28" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_30%)]" />

          <div className="container relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <AnimatedSection animation="slide-up" className="max-w-4xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-md md:text-xs">
                  <HeroBadgeIcon className={cn('h-4 w-4', theme.badgeIcon)} />
                  {hero.badge}
                </div>

                <h1 className="max-w-4xl font-headline text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-6xl">
                  {hero.title}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
                  {hero.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {hero.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  {hero.primaryCtaHref === '/#contacto' ? (
                    <ContactFormButton size="lg" className={cn('min-h-[54px] w-full justify-center rounded-full px-7 shadow-[0_20px_45px_rgba(15,23,42,0.22)] sm:w-auto', theme.primaryButton)}>
                      {hero.primaryCtaLabel}
                    </ContactFormButton>
                  ) : (
                    <Link href={hero.primaryCtaHref} className="w-full sm:w-auto">
                      <Button size="lg" className={cn('min-h-[54px] w-full justify-center rounded-full px-7 shadow-[0_20px_45px_rgba(15,23,42,0.22)] sm:w-auto', theme.primaryButton)}>
                        {hero.primaryCtaLabel}
                      </Button>
                    </Link>
                  )}
                  <Link href={hero.secondaryCtaHref} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="min-h-[54px] w-full justify-center rounded-full border-white/20 bg-white/10 px-7 text-white backdrop-blur-md hover:bg-white/15 sm:w-auto"
                    >
                      {hero.secondaryCtaLabel}
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-up" delay={0.08} className="glass-panel rounded-[2rem] p-5 md:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', theme.heroPanelIconBg, theme.heroPanelIconText)}>
                    <HeroPanelIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">{hero.panelEyebrow}</p>
                    <h2 className="text-xl font-semibold text-white md:text-2xl">{hero.panelTitle}</h2>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {hero.panelStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-950/25 p-5">
                  <div className={cn('mb-3 text-sm font-semibold uppercase tracking-[0.2em]', theme.heroPanelAccent)}>
                    {hero.panelBenefitsLabel}
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-white/80">
                    {hero.panelBenefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3">
                        <CheckCircle2 className={cn('mt-0.5 h-4 w-4 flex-shrink-0', theme.heroPanelAccent)} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <SectionWrapper className="bg-transparent px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <AnimatedSection animation="slide-up" className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
              <p className={cn('mb-3 text-xs font-semibold uppercase tracking-[0.28em]', theme.accentText)}>
                {context.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
                {context.title}
              </h2>
              <div className="mt-6 space-y-6 text-lg leading-relaxed text-slate-700">
                {context.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-up" delay={0.08} className="elevated-card rounded-[2rem] border border-white/70 p-6 md:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{context.sideTitle}</p>
              <div className="space-y-4">
                {context.sideItems.map((item) => (
                  <div
                    key={item}
                    className={cn(
                      'interactive-tile rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700',
                      context.sideStyle === 'check' && 'flex items-center gap-3'
                    )}
                  >
                    {context.sideStyle === 'check' ? (
                      <CheckCircle2 className={cn('h-5 w-5 flex-shrink-0', theme.specDot)} />
                    ) : null}
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </SectionWrapper>

        <SectionWrapper className="bg-transparent px-6 md:px-8">
          <SectionHeading
            eyebrow={features.eyebrow}
            title={features.title}
            description={features.description}
            className="max-w-4xl"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {features.cards.map((item, index) => (
              <AnimatedSection key={item.title} animation="slide-up" delay={0.04 + index * 0.05} className="h-full">
                <div className={cn('elevated-card h-full rounded-[2rem] border p-6 md:p-8', item.tone)}>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md', item.iconTone)}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </SectionWrapper>

        {middleSection ? (
          <SectionWrapper className="bg-transparent px-6 md:px-8">
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
              <SectionHeading
                eyebrow={middleSection.eyebrow}
                title={middleSection.title}
                description={middleSection.type === 'tag-grid' ? middleSection.description : undefined}
                className="mb-10 max-w-4xl"
              />

              {middleSection.type === 'tag-grid' ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {middleSection.items.map((item, index) => (
                    <AnimatedSection
                      key={item}
                      animation="slide-up"
                      delay={0.04 + index * 0.03}
                      className="interactive-tile rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-5 text-center text-sm font-semibold text-slate-700 md:text-base"
                    >
                      {item}
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-3">
                  {middleSection.groups.map((group, index) => (
                    <AnimatedSection
                      key={group.title}
                      animation="slide-up"
                      delay={0.04 + index * 0.05}
                      className="interactive-tile rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-6"
                    >
                      <h3 className="mb-4 text-xl font-semibold text-slate-950">{group.title}</h3>
                      <ul className="space-y-3">
                        {group.specs.map((entry) => (
                          <li key={entry} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className={cn('h-1.5 w-1.5 flex-shrink-0 rounded-full', theme.specDot)} />
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          </SectionWrapper>
        ) : null}

        <SectionWrapper className="bg-transparent px-6 md:px-8">
          <div className={cn('rounded-[2.25rem] px-6 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] md:px-10 md:py-12', theme.darkPanel)}>
            <div className="mb-10 flex flex-col gap-3 text-center">
              <p className={cn('text-xs font-semibold uppercase tracking-[0.28em]', theme.accentSoftText)}>
                {metrics.eyebrow}
              </p>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {metrics.title}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {metrics.items.map((stat, index) => (
                <AnimatedSection
                  key={stat.label}
                  animation="slide-up"
                  delay={0.04 + index * 0.04}
                  className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-5 text-center backdrop-blur-sm md:px-5 md:py-6"
                >
                  <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60 md:text-[11px]">{stat.label}</div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper className="bg-transparent px-6 md:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <SectionHeading eyebrow={faq.eyebrow} title={faq.title} className="mb-8 max-w-4xl" />
            <Accordion type="single" collapsible className="space-y-4">
              {faq.items.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${index}`}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/85 px-5"
                >
                  <AccordionTrigger className="py-5 text-left text-lg font-semibold text-slate-900 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-0 text-base leading-relaxed text-slate-600">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionWrapper>

        <SectionWrapper className="bg-transparent px-6 pb-20 pt-6 md:px-8 md:pb-24">
          <div className={cn('mx-auto max-w-5xl rounded-[2.25rem] px-6 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] md:px-10 md:py-12', theme.darkPanel)}>
            <div className="mx-auto max-w-3xl text-center">
              <p className={cn('mb-3 text-xs font-semibold uppercase tracking-[0.28em]', theme.accentSoftText)}>
                {cta.eyebrow}
              </p>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{cta.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70 md:text-xl">{cta.description}</p>
              <div className="mt-8 flex justify-center">
                {cta.buttonHref === '/#contacto' ? (
                  <ContactFormButton size="lg" className={cn('min-h-[54px] rounded-full px-7 shadow-[0_20px_45px_rgba(15,23,42,0.22)]', theme.primaryButton)}>
                    {cta.buttonLabel}
                  </ContactFormButton>
                ) : (
                  <Link href={cta.buttonHref}>
                    <Button size="lg" className={cn('min-h-[54px] rounded-full px-7 shadow-[0_20px_45px_rgba(15,23,42,0.22)]', theme.primaryButton)}>
                      {cta.buttonLabel}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <nav className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-white/60" aria-label="Páginas relacionadas">
              {cta.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors', theme.relatedLinkHover)}
                >
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