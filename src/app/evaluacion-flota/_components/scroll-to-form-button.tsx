"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FORM_ANCHOR_ID, SELECT_INTEREST_EVENT, type Interest } from "./interest";

/**
 * Lleva al formulario principal sin tocar la URL (sin #hash) y, si se indica,
 * preselecciona el interés ("demo", "piloto"…).
 */
function goToForm(interest?: Interest) {
  if (interest) {
    window.dispatchEvent(new CustomEvent<Interest>(SELECT_INTEREST_EVENT, { detail: interest }));
  }
  const anchor = document.getElementById(FORM_ANCHOR_ID);
  if (!anchor) return;
  // Solo desplaza: enfocar un campo abriría el teclado del móvil a mitad del scroll.
  anchor.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ScrollToFormButton({
  children,
  interest,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  interest?: Interest;
  variant?: "primary" | "link";
  className?: string;
}) {
  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={() => goToForm(interest)}
        className={cn(
          "inline-flex min-h-[44px] items-center text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-950 hover:decoration-slate-500",
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <Button
      type="button"
      onClick={() => goToForm(interest)}
      className={cn(
        "h-auto min-h-[52px] w-full whitespace-normal rounded-full bg-accent px-6 py-3 text-sm font-semibold leading-tight tracking-[0.04em] text-slate-950 shadow-[0_16px_36px_rgba(245,158,11,0.22)] [text-wrap:balance] hover:bg-accent/90 sm:w-auto sm:px-7",
        className,
      )}
    >
      {children}
    </Button>
  );
}
