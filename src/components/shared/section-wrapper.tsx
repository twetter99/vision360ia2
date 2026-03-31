import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function SectionWrapper({ className, id, ...props }: HTMLAttributes<HTMLElement>) {
  const sectionToneById: Record<string, string> = {
    'why-winfin': 'section-band section-band-mist z-10 mt-12 md:mt-16',
    'productos': 'section-band section-band-glow',
    'testimonials': 'section-band section-band-mist',
    'faq': 'section-band section-band-grid',
  };
  
  return (
    <section
      id={id}
      className={cn(
        "container relative py-16 md:py-24",
        id ? sectionToneById[id] : undefined,
        className
      )}
      {...props}
    />
  );
}
