"use client";

import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { cn } from "@/lib/utils";

import { HomeLink } from "./home-link";

/**
 * Cabecera fina y fija con el enlace a la web general, disponible en cualquier
 * momento: se esconde al bajar (no quita pantalla mientras se lee) y vuelve en
 * cuanto el visitante sube un poco o navega con el teclado.
 */
export function LandingHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80) setHidden(false);
        else if (y > lastY + 6) setHidden(true);
        else if (y < lastY - 6) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 transition-transform duration-300 motion-reduce:transition-none",
        hidden && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-14">
        <BrandLogo className="h-6 w-auto md:h-8" priority />
        <HomeLink className="inline-flex min-h-[44px] items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-950">
          Conoce Vision360IA →
        </HomeLink>
      </div>
    </div>
  );
}
