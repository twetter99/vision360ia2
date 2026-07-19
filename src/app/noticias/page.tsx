import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema } from '@/lib/seo/structured-data';
import { getNoticias } from '@/lib/noticias';

export const metadata: Metadata = {
  title: 'Noticias de seguridad y digitalización en flotas',
  description:
    'Noticias y novedades sobre seguridad vial, sistemas ADAS, visión 360°, normativa GSR y digitalización del transporte en autobuses, camiones y flotas profesionales.',
  keywords: [
    'noticias ADAS flotas',
    'noticias seguridad vial transporte',
    'novedades visión 360 vehículos',
    'normativa GSR noticias',
    'Vision360IA noticias',
  ],
  alternates: { canonical: '/noticias' },
  openGraph: {
    images: [{ url: 'https://www.vision360ia.com/images/og-image.jpg', width: 1200, height: 630, alt: 'Vision360IA — visión 360° con inteligencia artificial para flotas' }],
    title: 'Noticias | Vision360IA',
    description:
      'Novedades sobre seguridad, ADAS, visión 360° y digitalización del transporte en flotas profesionales.',
    url: `${SITE_URL}/noticias`,
    type: 'website',
  },
};

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
function formatFecha(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

export default function NoticiasPage() {
  const noticias = getNoticias();

  const schemas = [
    breadcrumbSchema([{ name: 'Noticias', url: '/noticias' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Noticias de Vision360IA',
      description:
        'Noticias y novedades sobre seguridad vial, ADAS, visión 360° y digitalización de flotas.',
      url: `${SITE_URL}/noticias`,
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: 'es-ES',
      hasPart: noticias.map((n) => ({
        '@type': 'NewsArticle',
        headline: n.title,
        datePublished: n.date,
        url: `${SITE_URL}/noticias/${n.slug}`,
        about: { '@id': ORGANIZATION_ID },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <article className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        <SectionWrapper className="max-w-5xl px-6 pb-8 pt-20 md:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-950">Inicio</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">Noticias</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">NOTICIAS</p>
          <h1 className="max-w-4xl font-headline text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 md:text-6xl md:leading-[1.02]">
            Noticias de seguridad y digitalización en flotas
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Novedades sobre seguridad vial, sistemas ADAS, visión 360°, normativa GSR y digitalización del transporte en autobuses, camiones y vehículos industriales.
          </p>
        </SectionWrapper>

        <SectionWrapper className="max-w-5xl bg-transparent px-6 pb-20 md:px-6">
          {noticias.length === 0 ? (
            <p className="rounded-2xl border border-slate-200 bg-white/80 p-8 text-center text-slate-500">
              Próximamente publicaremos noticias aquí.
            </p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
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
                      <h2 className="mt-2 font-headline text-xl font-semibold leading-snug tracking-[-0.02em] text-slate-950">
                        {n.title}
                      </h2>
                      <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">{n.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                        Leer noticia <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionWrapper>
      </article>
    </>
  );
}
