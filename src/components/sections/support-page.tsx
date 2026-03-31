import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { AnimatedSection } from '@/components/shared/animated-section';
import { ContactFormButton } from '@/components/shared/contact-form-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type SupportFaq = {
  question: string;
  answer: string;
};

type SupportSection = {
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type RelatedLink = {
  href: string;
  label: string;
};

type PrimarySolutionLink = {
  href: string;
  label: string;
  helperText: string;
};

type SupportPageProps = {
  title: string;
  description: string;
  eyebrow: string;
  breadcrumbLabel: string;
  schemas?: Record<string, unknown>[];
  primarySolution?: PrimarySolutionLink;
  intro: {
    badge: string;
    highlights: string[];
  };
  sections: SupportSection[];
  faq: {
    eyebrow: string;
    title: string;
    items: SupportFaq[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    relatedLinks: RelatedLink[];
  };
};

export function SupportPage({ title, description, eyebrow, breadcrumbLabel, schemas = [], primarySolution, intro, sections, faq, cta }: SupportPageProps) {
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
        name: 'Recursos',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: breadcrumbLabel,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {schemas.map((schema, index) => (
        <script
          key={`support-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        <SectionWrapper className="max-w-6xl px-6 pb-10 pt-20 md:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-950">Inicio</Link>
            <span className="text-slate-300">/</span>
            <span>Recursos</span>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">{breadcrumbLabel}</span>
          </nav>

          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8 lg:p-10">
            <div className="mb-6 inline-flex rounded-full border border-sky-200/80 bg-sky-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700 md:text-xs">
              {intro.badge}
            </div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">{eyebrow}</p>
            <h1 className="max-w-4xl font-headline text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">{description}</p>
            {primarySolution ? (
              <div className="mt-6 rounded-[1.5rem] border border-sky-100 bg-sky-50/70 p-4 md:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700/80 md:text-xs">
                  Solución base recomendada
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {primarySolution.helperText}
                </p>
                <div className="mt-4">
                  <Link
                    href={primarySolution.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
                  >
                    <span>{primarySolution.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {intro.highlights.map((highlight) => (
                <span key={highlight} className="rounded-full border border-slate-200/80 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {sections.map((section, index) => (
          <SectionWrapper key={section.title} className="max-w-6xl bg-transparent px-6 py-10 md:px-6 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <AnimatedSection animation="slide-up">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">{section.eyebrow}</p>
                <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">{section.title}</h2>
              </AnimatedSection>
              <AnimatedSection animation="slide-up" delay={0.06 + index * 0.02} className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
                {section.paragraphs ? (
                  <div className="space-y-5 text-lg leading-relaxed text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
                {section.items ? (
                  <ul className="space-y-4 text-base text-slate-700">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AnimatedSection>
            </div>
          </SectionWrapper>
        ))}

        <SectionWrapper id="faq" className="max-w-5xl bg-transparent px-6 py-16 md:px-6 md:py-20">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <SectionHeading eyebrow={faq.eyebrow} title={faq.title} className="mb-10 max-w-4xl" />
            <Accordion type="single" collapsible className="space-y-4">
              {faq.items.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-2xl border border-slate-200/80 bg-slate-50/85 px-5 data-[state=open]:border-slate-300/90">
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-slate-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </SectionWrapper>

        <SectionWrapper className="max-w-6xl bg-transparent px-6 pb-20 pt-6 md:px-6 md:pb-24">
          <div className="rounded-[2.25rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_28%),linear-gradient(180deg,#0f172a,#020617)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] md:px-10 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">{cta.eyebrow}</p>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">{cta.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70 md:text-xl">{cta.description}</p>
              <div className="mt-8 flex justify-center">
                {cta.buttonHref === '/#contacto' ? (
                  <ContactFormButton size="lg" className="min-h-[54px] rounded-full bg-sky-500 px-7 text-white shadow-[0_20px_45px_rgba(59,130,246,0.28)] hover:bg-sky-600">
                    {cta.buttonLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ContactFormButton>
                ) : (
                  <Link href={cta.buttonHref}>
                    <Button size="lg" className="min-h-[54px] rounded-full bg-sky-500 px-7 text-white shadow-[0_20px_45px_rgba(59,130,246,0.28)] hover:bg-sky-600">
                      {cta.buttonLabel}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <nav className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-white/70" aria-label="Páginas relacionadas">
              {cta.relatedLinks.map((link) => (
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