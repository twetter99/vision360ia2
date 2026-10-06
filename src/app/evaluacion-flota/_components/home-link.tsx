"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useLandingAttribution } from "./attribution";

/**
 * Enlace a la web general que conserva UTM y oppref. Es un <Link> de Next a
 * propósito: la navegación cliente mantiene vivo el oppref en memoria del
 * píxel de OpenAI si el visitante acepta cookies después de salir de aquí.
 */
export function HomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const attribution = useLandingAttribution();
  return (
    <Link href={`/${attribution?.query ?? ""}`} className={className}>
      {children}
    </Link>
  );
}
