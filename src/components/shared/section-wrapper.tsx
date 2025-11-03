import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function SectionWrapper({ className, id, ...props }: HTMLAttributes<HTMLElement>) {
  // Si es la primera sección después del hero, añadir margen superior y z-index
  const isAfterHero = id === 'why-winfin';
  
  return (
    <section
      id={id}
      className={cn(
        "container py-16 md:py-24",
        isAfterHero && "relative z-10 mt-12 md:mt-16",
        className
      )}
      style={isAfterHero ? { backgroundColor: '#f9f9f9' } : undefined}
      {...props}
    />
  );
}
