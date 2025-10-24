import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function SectionHeading({ title, description, eyebrow, className, ...props }: SectionHeadingProps) {
  return (
    <div
      className={cn("mx-auto mb-12 max-w-3xl text-center", className)}
      {...props}
    >
      {eyebrow && (
        <p className="mb-2 font-headline font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
