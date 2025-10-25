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

  return (
    <SectionWrapper id="faq" className="bg-card">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.id} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground text-justify">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
