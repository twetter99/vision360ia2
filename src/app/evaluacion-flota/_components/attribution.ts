"use client";

import { useEffect, useState } from "react";

/**
 * Atribución de la landing /evaluacion-flota (tráfico de OpenAI/ChatGPT Ads).
 *
 * Se leen UNA vez por carga, en memoria y sin storage: igual que el píxel de
 * OpenAI (components/analytics/openai-pixel.tsx), no se guarda nada en el
 * navegador antes del consentimiento. La URL de llegada no se reescribe nunca,
 * así GA4, el píxel y el `pageUrl` del correo siguen viendo los parámetros.
 */
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "oppref",
] as const;

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export interface LandingAttribution {
  /** URL completa de llegada (con UTM y oppref): va al correo como "Página". */
  landingUrl: string;
  /** Solo los parámetros permitidos, para conservarlos en los enlaces internos. */
  query: string;
  params: Partial<Record<AttributionKey, string>>;
}

let captured: LandingAttribution | null = null;

function readLandingAttribution(): LandingAttribution {
  if (captured) return captured;
  const search = new URLSearchParams(window.location.search);
  const kept = new URLSearchParams();
  const params: LandingAttribution["params"] = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = search.get(key);
    if (value) {
      params[key] = value;
      kept.set(key, value);
    }
  }
  const query = kept.toString();
  captured = { landingUrl: window.location.href, query: query ? `?${query}` : "", params };
  return captured;
}

export function useLandingAttribution() {
  const [attribution, setAttribution] = useState<LandingAttribution | null>(null);
  useEffect(() => {
    setAttribution(readLandingAttribution());
  }, []);
  return attribution;
}

/**
 * Texto plano, sin saltos ni enlaces: el PHP rechaza mensajes con más de 2 URLs.
 * Se elimina todo "://" (no se puede recomponer una URL) y se corta por
 * caracteres completos (un emoji partido rompería el JSON en el servidor).
 */
function clean(value: string) {
  return Array.from(value.replace(/:\/\//g, " ").replace(/[\r\n]+/g, " "))
    .slice(0, 100)
    .join("");
}

/** Líneas de origen que se añaden al mensaje que recibe el equipo. */
export function buildAttributionNote(attribution: LandingAttribution | null): string {
  const params = attribution?.params ?? {};
  const utms = ATTRIBUTION_KEYS.filter((key) => key !== "oppref" && params[key]).map(
    (key) => `${key}=${clean(params[key] as string)}`,
  );
  return [
    `Origen: ${utms.length ? utms.join("; ") : "sin parámetros UTM"}.`,
    `Clic de anuncio de OpenAI (oppref): ${params.oppref ? "sí" : "no"}.`,
  ].join("\n");
}
