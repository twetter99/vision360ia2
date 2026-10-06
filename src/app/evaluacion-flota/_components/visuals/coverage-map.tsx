import { CountUp } from "./count-up";
import { InView } from "./in-view";

/**
 * Idea 3: "Vamos donde está tu flota". Mapa esquemático de España (ciudades en
 * su posición real) con las dos rutas que lo cruzan: A Coruña–Almería y
 * Girona–Huelva. Debajo, las cifras suben al aparecer.
 * Los nombres de ciudad son texto SVG: escalan con el mapa, así que ocupan el
 * mismo sitio en cualquier pantalla (comprobado que caben en el viewBox).
 */
const CIUDADES = [
  [116, 100], // Madrid
  [233, 75], // Barcelona
  [182, 123], // Valencia
  [70, 175], // Sevilla
  [131, 29], // Bilbao
  [172, 69], // Zaragoza
  [102, 192], // Málaga
  [96, 69], // Valladolid
  [16, 54], // Vigo
  [167, 160], // Murcia
] as const;

const CLAVE = [
  { x: 22, y: 26, label: "A Coruña", lx: 32, ly: 22, anchor: "start" },
  { x: 141, y: 189, label: "Almería", lx: 151, ly: 205, anchor: "start" },
  { x: 246, y: 61, label: "Girona", lx: 238, ly: 49, anchor: "end" },
  { x: 51, y: 179, label: "Huelva", lx: 46, ly: 203, anchor: "middle" },
] as const;

export function CoverageMap() {
  return (
    <div>
      <InView once={false} threshold={0.3}>
        <svg viewBox="0 0 300 215" className="mx-auto block h-auto w-full max-w-md" role="img" aria-labelledby="ef-map-title">
          <title id="ef-map-title">
            Mapa de España con dos rutas que lo cruzan: de A Coruña a Almería y de Girona a Huelva. Trabajamos en toda
            España.
          </title>
          <g className="fill-slate-300">
            {CIUDADES.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
            ))}
          </g>
          <line data-a x1="22" y1="26" x2="141" y2="189" className="ef-draw stroke-primary" strokeWidth="3" strokeLinecap="round" style={{ ["--len" as string]: 202 }} />
          <line data-a x1="246" y1="61" x2="51" y2="179" className="ef-draw stroke-primary" strokeWidth="3" strokeLinecap="round" style={{ ["--len" as string]: 228, animationDelay: "0.5s" }} />
          {CLAVE.map(({ x, y }) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6.5" className="fill-white stroke-primary" strokeWidth="3" />
          ))}
          <g className="fill-slate-700" fontSize="12" fontWeight="600">
            {CLAVE.map(({ label, lx, ly, anchor }) => (
              <text key={label} x={lx} y={ly} textAnchor={anchor}>
                {label}
              </text>
            ))}
          </g>
          {/* Furgoneta de instalación recorriendo la ruta */}
          <g data-a className="ef-van" style={{ transform: "translate(22px, 26px)" }}>
            <rect x="-10" y="-7" width="20" height="13" rx="3" className="fill-accent" />
            <rect x="3" y="-5" width="5" height="5" rx="1" className="fill-white/80" />
          </g>
        </svg>
      </InView>

      <ul className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        <li className="rounded-2xl border border-slate-200 bg-white px-1.5 py-3 text-center min-[360px]:px-2 sm:px-4">
          <p className="font-headline text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-950 min-[360px]:text-2xl sm:text-3xl">
            <CountUp to={15} />
          </p>
          <p className="mt-0.5 text-xs leading-snug text-slate-600 sm:text-sm">años en cocheras de clientes</p>
        </li>
        <li className="rounded-2xl border border-slate-200 bg-white px-1.5 py-3 text-center min-[360px]:px-2 sm:px-4">
          <p className="font-headline text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-950 min-[360px]:text-2xl sm:text-3xl">
            <CountUp to={2000} prefix="+" />
          </p>
          <p className="mt-0.5 text-xs leading-snug text-slate-600 sm:text-sm">vehículos equipados</p>
        </li>
        <li className="rounded-2xl border border-slate-200 bg-white px-1.5 py-3 text-center min-[360px]:px-2 sm:px-4">
          <p className="font-headline text-[1.35rem] font-semibold tracking-[-0.03em] text-slate-950 min-[360px]:text-2xl sm:text-3xl">
            <CountUp to={20} prefix="+" />
          </p>
          <p className="mt-0.5 text-xs leading-snug text-slate-600 sm:text-sm">años de experiencia</p>
        </li>
      </ul>
    </div>
  );
}
