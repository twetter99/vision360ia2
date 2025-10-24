import { faqs } from "@/lib/data";
import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <SectionWrapper id="faq" className="bg-card">
      <SectionHeading
        eyebrow="Preguntas Frecuentes"
        title="Tus Preguntas, Respondidas"
        description="Encuentra respuestas a preguntas comunes sobre nuestros productos, servicios y seguridad vehicular en general."
      />
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.id} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionWrapper>
  );
}
