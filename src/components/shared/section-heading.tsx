import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function SectionHeading({ title, description, eyebrow, className, ...props }: SectionHeadingProps) {
  const descriptionParagraphs = description?.split(/\n{2,}/).filter(Boolean);

  return (
    <AnimatedSection
      animation="slide-up"
      className={cn("mx-auto mb-12 max-w-3xl text-center md:mb-14", className)}
      {...props}
    >
      {eyebrow && (
        <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-headline text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">
          {eyebrow}
        </p>
      )}
      <h2 className="font-headline text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed tracking-[-0.015em] text-muted-foreground md:text-xl">
          {descriptionParagraphs?.map((paragraph, index) => (
            <span key={`${title}-description-${index}`}>
              {index > 0 ? <><br /><br /></> : null}
              {paragraph}
            </span>
          ))}
        </p>
      )}
    </AnimatedSection>
  );
}
