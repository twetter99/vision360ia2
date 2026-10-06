"use client";

import { useState } from "react";
import { Eye, ScanEye } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Idea 5 (interactiva): "¿Cuántos peatones ves?". En la vista del conductor,
 * tres peatones quedan ocultos en los ángulos muertos; con Vision360IA
 * aparecen señalados. El SVG solo lleva formas: los textos van en HTML.
 */
const PEATONES = [
  { x: 262, y: 128 }, // delante, pegado al frontal
  { x: 196, y: 140 }, // lateral derecho, junto a la puerta
  { x: 92, y: 92 }, // detrás
];

export function PedestrianCheck() {
  const [withSystem, setWithSystem] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[var(--shadow-soft)] sm:p-5">
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Cambiar de vista">
        <button
          type="button"
          aria-pressed={!withSystem}
          onClick={() => setWithSystem(false)}
          className={cn(
            "inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 text-[13px] font-semibold transition-colors min-[360px]:gap-2 min-[360px]:text-sm",
            !withSystem ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700",
          )}
        >
          <Eye className="hidden h-4 w-4 shrink-0 min-[400px]:block" aria-hidden="true" />
          <span>Conductor</span>
        </button>
        <button
          type="button"
          aria-pressed={withSystem}
          onClick={() => setWithSystem(true)}
          className={cn(
            "relative inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 text-[13px] font-semibold transition-colors min-[360px]:gap-2 min-[360px]:text-sm",
            withSystem ? "border-primary bg-primary text-white" : "border-primary/40 bg-primary/5 text-primary",
          )}
        >
          {!withSystem ? (
            <span className="ef-ping pointer-events-none absolute inset-0 rounded-xl" aria-hidden="true" />
          ) : null}
          <ScanEye className="hidden h-4 w-4 shrink-0 min-[400px]:block" aria-hidden="true" />
          <span>Con Vision360IA</span>
        </button>
      </div>

      <svg viewBox="0 0 360 190" className="mt-3 block h-auto w-full" role="img" aria-labelledby="ef-check-title">
        <title id="ef-check-title">
          Autobús visto desde arriba con tres peatones en sus ángulos muertos: delante, en el lateral derecho y detrás.
        </title>
        <line x1="0" y1="100" x2="360" y2="100" className="stroke-slate-200" strokeWidth="1.5" strokeDasharray="10 8" />
        {/* Lo que el conductor ve por los espejos */}
        <g className="fill-sky-400/15">
          <polygon points="248,74 120,40 120,74" />
          <polygon points="248,126 120,160 120,126" />
        </g>
        {/* Autobús */}
        <rect x="120" y="76" width="130" height="48" rx="9" className="fill-slate-700" />
        <rect x="240" y="80" width="7" height="40" rx="2" className="fill-sky-200" />
        {/* Peatones: ocultos en la vista del conductor, señalados con el sistema */}
        {PEATONES.map(({ x, y }) => (
          <g key={`${x}-${y}`}>
            <g className={cn("transition-opacity duration-500", withSystem ? "opacity-100" : "opacity-0")}>
              <rect x={x - 17} y={y - 22} width="34" height="42" rx="5" className="fill-orange-500/15 stroke-orange-500" strokeWidth="2" />
              <circle cx={x} cy={y - 10} r="6" className="fill-orange-600" />
              <rect x={x - 5} y={y - 3} width="10" height="15" rx="3" className="fill-orange-600" />
            </g>
            <g className={cn("transition-opacity duration-500", withSystem ? "opacity-0" : "opacity-100")}>
              <rect x={x - 22} y={y - 26} width="44" height="50" rx="7" className="fill-slate-300/90" />
              <circle cx={x} cy={y - 4} r="9" className="fill-slate-400/70" />
            </g>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-center text-sm font-medium text-slate-700" aria-live="polite">
        {withSystem ? (
          <span>
            Peatones a la vista: <strong className="text-orange-600">3 de 3</strong>
          </span>
        ) : (
          <span>
            Peatones a la vista: <strong className="text-slate-950">0 de 3</strong>
          </span>
        )}
      </p>
    </div>
  );
}
