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
  // Focus the card, not an input: no mobile keyboard. Respect reduced motion.
  anchor.focus({ preventScroll: true });
  anchor.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: "start" });
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
          "ef-text-button",
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
        "ef-primary",
        className,
      )}
    >
      {children}
    </Button>
  );
}
