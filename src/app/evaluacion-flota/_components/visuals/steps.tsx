import { Bus, Eye, ListChecks } from "lucide-react";

import { InView } from "./in-view";

/**
 * Idea 4: "Lo ves. Lo pruebas. Decides." La línea de progreso se dibuja y los
 * pasos se encienden uno detrás de otro al llegar (una sola vez).
 */
const PASOS = [
  { icon: Eye, title: "Lo ves", text: "Demo en vivo en tu cochera o base." },
  { icon: Bus, title: "Lo pruebas", text: "Piloto en uno de tus vehículos." },
  { icon: ListChecks, title: "Decides", text: "Con lo visto, valoramos el resto de la flota." },
];

export function Steps() {
  return (
    <InView once threshold={0.35}>
      <ol className="relative grid gap-4 md:grid-cols-3 md:gap-6">
        {/* Línea de progreso: vertical en móvil, horizontal en escritorio */}
        <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 bg-slate-200 md:hidden" />
        <span aria-hidden="true" data-a className="ef-grow-y absolute bottom-6 left-6 top-6 w-0.5 origin-top bg-primary md:hidden" />
        <span aria-hidden="true" className="absolute left-[16.6%] right-[16.6%] top-6 hidden h-0.5 bg-slate-200 md:block" />
        <span aria-hidden="true" data-a className="ef-grow-x absolute left-[16.6%] right-[16.6%] top-6 hidden h-0.5 origin-left bg-primary md:block" />

        {PASOS.map(({ icon: Icon, title, text }, index) => (
          <li
            key={title}
            data-a
            className="ef-pop relative flex items-center gap-4 md:flex-col md:items-center md:text-center"
            style={{ ["--i" as string]: index }}
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_20px_rgba(32,76,207,0.25)]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-headline text-xl font-semibold text-slate-950">{title}</p>
              <p className="text-[15px] leading-snug text-slate-600">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </InView>
  );
}
