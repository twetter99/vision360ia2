import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function SectionWrapper({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("container py-16 md:py-24", className)}
      {...props}
    />
  );
}
