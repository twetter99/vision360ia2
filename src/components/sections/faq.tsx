'use client';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';

export function Faq({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.faqSection || initialTranslations.faqSection;
  const faqs = translations.faqs || initialTranslations.faqs;

  // Nota: el FAQPage JSON-LD se inyecta server-side desde `src/app/page.tsx`
  // para que Google y otros crawlers lo encuentren sin ejecutar JavaScript.
  // No lo duplicamos aquí: dos FAQPage en la misma URL confundiría al crawler.

  return (
    <SectionWrapper id="faq" className="bg-card">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/88 p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-6">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={`item-${index + 1}`} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 data-[state=open]:bg-white">
              <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground text-justify">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}
