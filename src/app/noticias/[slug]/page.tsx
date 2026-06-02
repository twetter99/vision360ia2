import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ContactFormButton } from '@/components/shared/contact-form-button';
import { Gallery } from '@/components/noticias/gallery';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE_URL, breadcrumbSchema, newsArticleSchema } from '@/lib/seo/structured-data';
import { getNoticia, getNoticiaSlugs, getNoticias } from '@/lib/noticias';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
function formatFecha(iso: string): string {
  const [y, m, d] = iso.split('-').map((n) => parseInt(n, 10));
  if (!y || !m || !d) return iso;
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

// Enlaces internos hacia las landings clave (reparte autoridad SEO y guía al lead).
const SOLUCIONES_RELACIONADAS = [
  { href: '/adas-autobuses', label: 'ADAS para autobuses' },
  { href: '/adas-camiones', label: 'ADAS para camiones' },
  { href: '/anti-atropellos-peatones-ciclistas', label: 'Anti-atropellos' },
  { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° industrial' },
  { href: '/precio-sistema-adas-flotas', label: 'Precio orientativo' },
];

export function generateStaticParams() {
  return getNoticiaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNoticia(slug);
  if (!n) return { title: 'Noticia no encontrada' };
  const url = `${SITE_URL}/noticias/${slug}`;
  const image = n.image ? `${SITE_URL}${n.image}` : `${SITE_URL}/images/og-image.jpg`;
  return {
    title: n.title,
    description: n.description,
    alternates: { canonical: `/noticias/${slug}` },
    openGraph: {
      title: n.title,
      description: n.description,
      url,
      type: 'article',
      publishedTime: n.date,
      images: [{ url: image }],
    },
  };
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNoticia(slug);
  if (!n) notFound();

  const relacionadas = getNoticias().filter((x) => x.slug !== slug).slice(0, 2);

  const schemas = [
    breadcrumbSchema([
      { name: 'Noticias', url: '/noticias' },
      { name: n.title, url: `/noticias/${slug}` },
    ]),
    newsArticleSchema({
      headline: n.title,
      description: n.description,
      url: `/noticias/${slug}`,
      datePublished: n.date,
      dateModified: n.dateModified,
      image: n.image ? `${SITE_URL}${n.image}` : undefined,
      authorName: n.author,
    }),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <article className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        <SectionWrapper className="max-w-3xl px-6 pb-10 pt-20 md:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-950">Inicio</Link>
            <span className="text-slate-300">/</span>
            <Link href="/noticias" className="transition-colors hover:text-slate-950">Noticias</Link>
            <span className="text-slate-300">/</span>
            <span className="line-clamp-1 font-medium text-slate-700">{n.title}</span>
          </nav>

          <header>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              <time dateTime={n.date}>{formatFecha(n.date)}</time>
              <span className="text-slate-300">·</span>
              <span>{n.author}</span>
            </div>
            <h1 className="mt-3 font-headline text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-slate-950 md:text-5xl md:leading-[1.05]">
              {n.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{n.description}</p>
          </header>

          {n.image ? (
            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/70 shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.image} alt={n.title} className="h-full w-full object-cover" />
              </div>
            </div>
          ) : null}

          <div
            className="mt-8 text-lg leading-relaxed text-slate-700 [&>blockquote]:mt-6 [&>blockquote]:rounded-r-xl [&>blockquote]:border-l-4 [&>blockquote]:border-sky-300 [&>blockquote]:bg-sky-50/60 [&>blockquote]:px-5 [&>blockquote]:py-3 [&>h2]:mt-10 [&>h2]:font-headline [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-[-0.02em] [&>h2]:text-slate-950 md:[&>h2]:text-3xl [&>h3]:mt-8 [&>h3]:font-headline [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-slate-950 [&>ol]:mt-5 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6 [&>p]:mt-5 [&>ul]:mt-5 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_img]:my-6 [&_img]:rounded-2xl [&_figure]:my-8 [&_figure>img]:my-0 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:text-slate-500 [&_strong]:font-semibold [&_strong]:text-slate-900"
            dangerouslySetInnerHTML={{ __html: n.contentHtml }}
          />

          {/* Galería de fotos (lightbox) — para reportajes con muchas imágenes */}
          <Gallery items={n.galeria ?? []} />

          {/* CTA de conversión — objetivo nº1 de la web: captar el lead */}
          <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-7 shadow-[var(--shadow-soft)] md:p-9">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-headline text-2xl font-semibold tracking-[-0.02em] text-slate-950 md:text-3xl">
                  ¿Quieres esto en tu flota?
                </h2>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600">
                  Te asesoramos sin compromiso sobre visión 360°, ADAS y cumplimiento GSR para tus vehículos.
                </p>
              </div>
              <ContactFormButton className="min-h-[48px] shrink-0 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.22)] hover:bg-accent/90">
                Solicitar información <ArrowRight className="ml-1.5 h-4 w-4" />
              </ContactFormButton>
            </div>
          </div>

          {/* Soluciones relacionadas — enlaces internos hacia las landings */}
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Soluciones relacionadas</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOLUCIONES_RELACIONADAS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="inline-flex min-h-[40px] items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:text-slate-950"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Artículos relacionados */}
          {relacionadas.length > 0 ? (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Más noticias</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {relacionadas.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/noticias/${r.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/80 p-5 transition-colors hover:border-sky-200"
                    >
                      <time dateTime={r.date} className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {formatFecha(r.date)}
                      </time>
                      <span className="mt-2 font-headline text-base font-semibold leading-snug tracking-[-0.01em] text-slate-950">
                        {r.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Volver al índice */}
          <div className="mt-10 border-t border-slate-200 pt-8">
            <Link href="/noticias" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950">
              <ArrowLeft className="h-4 w-4" /> Todas las noticias
            </Link>
          </div>
        </SectionWrapper>
      </article>
    </>
  );
}
