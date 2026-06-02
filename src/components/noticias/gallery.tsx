'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { GaleriaItem } from '@/lib/noticias';

/**
 * Galería de fotos con lightbox. Cuadrícula de miniaturas; al pulsar una se
 * abre a pantalla completa con pie de foto y navegación (teclado + botones).
 * Pensada para reportajes con muchas fotos sin ensuciar el cuerpo del texto.
 */
export function Gallery({ items }: { items: GaleriaItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  if (!items || items.length === 0) return null;

  const active = open === null ? null : items[open];

  return (
    <div className="mt-12">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Galería</p>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((it, i) => (
          <li key={`${it.image}-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
              aria-label={it.caption ? `Ampliar: ${it.caption}` : `Ampliar foto ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={it.caption ?? ''}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          {items.length > 1 ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          ) : null}

          <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.caption ?? ''}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            />
            {active.caption ? (
              <figcaption className="mt-3 max-w-2xl text-center text-sm text-white/80">{active.caption}</figcaption>
            ) : null}
            <p className="mt-1 text-xs text-white/50">{(open ?? 0) + 1} / {items.length}</p>
          </figure>

          {items.length > 1 ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
