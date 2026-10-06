import { InView } from "./in-view";

/**
 * Idea 2: "Un golpe nunca es solo chapa". La reparación es la punta del
 * iceberg; bajo el agua aparecen, una a una, el resto de consecuencias.
 * Las etiquetas son HTML con flex-wrap: se ajustan a su texto y saltan de
 * línea si no caben (nunca desbordan). El iceberg es solo fondo.
 */
const COSTES = [
  "Vehículo parado",
  "Vehículo de sustitución",
  "Horas de taller",
  "Gestión administrativa",
  "Impacto en el servicio",
  "Peor historial de siniestros",
];

export function Iceberg() {
  return (
    <InView once threshold={0.3}>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        {/* Sobre el agua: lo que se ve */}
        <div className="relative flex h-24 items-end justify-center bg-sky-50">
          <svg viewBox="0 0 120 60" className="h-16 w-32" aria-hidden="true">
            <polygon points="60,4 18,60 102,60" className="fill-white stroke-slate-300" strokeWidth="1.5" />
          </svg>
          <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Reparación
          </span>
        </div>
        {/* Línea de flotación */}
        <div className="h-0 border-t-2 border-dashed border-sky-400" aria-hidden="true" />
        {/* Bajo el agua: lo que no se ve */}
        <div className="relative bg-slate-900 px-3 pb-6 pt-4 sm:px-6">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <polygon points="36,0 64,0 98,100 2,100" className="fill-slate-700/60" />
          </svg>
          <p className="relative text-center text-xs font-semibold uppercase tracking-[0.18em] text-sky-200/80">
            Lo que no se ve
          </p>
          <ul className="relative mt-3 flex flex-wrap justify-center gap-2">
            {COSTES.map((coste, index) => (
              <li
                key={coste}
                data-a
                className="ef-pop max-w-full rounded-full bg-white px-3 py-1.5 text-center text-sm font-medium leading-snug text-slate-900"
                style={{ ["--i" as string]: index }}
              >
                {coste}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InView>
  );
}
