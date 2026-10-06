import { TriangleAlert } from "lucide-react";

import { InView } from "./in-view";

/**
 * Idea 1 (primera pantalla): autobús visto desde arriba con sus zonas de
 * cobertura; un peatón entra en el ángulo muerto y salta el aviso.
 * Solo formas en el SVG; el único texto va en una etiqueta HTML que se ajusta
 * a su contenido (nunca desborda).
 */
export function BlindSpotStrip({ className }: { className?: string }) {
  return (
    <InView className={className} threshold={0.2}>
      <figure className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <svg viewBox="0 0 320 120" className="block h-auto w-full" role="img" aria-labelledby="ef-strip-title">
          <title id="ef-strip-title">
            Autobús visto desde arriba con su cobertura de 360 grados. Un peatón entra en el ángulo muerto y el sistema
            avisa al conductor.
          </title>
          {/* Calzada */}
          <line x1="0" y1="61" x2="320" y2="61" className="stroke-slate-200" strokeWidth="1.5" strokeDasharray="10 8" />
          {/* Zonas de cobertura 360° */}
          <g className="fill-sky-400/20 stroke-sky-500/50" strokeWidth="1" strokeDasharray="4 3">
            <rect x="110" y="8" width="120" height="33" rx="6" />
            <rect x="110" y="81" width="120" height="33" rx="6" />
            <rect x="233" y="41" width="40" height="40" rx="6" />
            <rect x="67" y="41" width="40" height="40" rx="6" />
          </g>
          {/* Zona en alerta */}
          <rect data-a x="110" y="8" width="120" height="33" rx="6" className="ef-alert fill-orange-500/30 stroke-orange-500" strokeWidth="1.5" />
          {/* Autobús */}
          <rect x="110" y="44" width="120" height="34" rx="7" className="fill-slate-700" />
          <rect x="221" y="47" width="6" height="28" rx="2" className="fill-sky-200" />
          <rect x="122" y="50" width="22" height="22" rx="3" className="fill-slate-600" />
          <rect x="152" y="50" width="22" height="22" rx="3" className="fill-slate-600" />
          <rect x="182" y="50" width="22" height="22" rx="3" className="fill-slate-600" />
          {/* Peatón que entra en el ángulo muerto */}
          <g data-a className="ef-ped">
            <circle cx="186" cy="18" r="5" className="fill-orange-600" />
            <rect x="182" y="24" width="8" height="12" rx="3" className="fill-orange-600" />
          </g>
        </svg>
        <figcaption
          data-a
          className="ef-alert absolute bottom-2 left-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-full bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm"
        >
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Peatón detectado · aviso al conductor</span>
        </figcaption>
      </figure>
    </InView>
  );
}
