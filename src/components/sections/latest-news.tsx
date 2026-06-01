import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { getNoticias } from '@/lib/noticias';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
function formatFecha(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

/**
 * Teaser de "Últimas noticias" para la home. Muestra las 3 más recientes.
 * Si todavía no hay noticias publicadas, no renderiza nada (evita un bloque
 * vacío). Server component: lee el contenido en build con getNoticias().
 */
export function LatestNews() {
  const noticias = getNoticias().slice(0, 3);
  if (noticias.length === 0) return null;

  return (
    <SectionWrapper>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">Actualidad</p>
          <h2 className="font-headline text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-950 md:text-4xl">
            Últimas noticias
          </h2>
        </div>
        <Link
          href="/noticias"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
        >
          Ver todas las noticias <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {noticias.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/noticias/${n.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:border-sky-200"
            >
              {n.image ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <time dateTime={n.date} className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {formatFecha(n.date)}
                </time>
                <h3 className="mt-2 font-headline text-lg font-semibold leading-snug tracking-[-0.02em] text-slate-950">
                  {n.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{n.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                  Leer noticia <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
