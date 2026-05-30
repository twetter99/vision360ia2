import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ContactFormButton } from '@/components/shared/contact-form-button';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Sala de prensa: Vision360IA y WINFIN en los medios',
  description:
    'Apariciones de Vision360IA y WINFIN en medios del sector del transporte y alianzas como Socio Colaborador de CONFEBUS. Cobertura sobre visión 360°, detección de ángulos muertos y digitalización de flotas.',
  keywords: [
    'Vision360IA prensa',
    'WINFIN noticias',
    'WINFIN CONFEBUS',
    'Vision360IA medios',
    'WINFIN transporte autobús',
  ],
  alternates: { canonical: '/sala-de-prensa' },
  openGraph: {
    title: 'Sala de prensa | Vision360IA',
    description:
      'Vision360IA y WINFIN en los medios del sector del transporte y alianza con CONFEBUS.',
    url: `${SITE_URL}/sala-de-prensa`,
    type: 'website',
  },
};

type PressItem = {
  outlet: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  url: string;
  summary: string;
};

const pressItems: PressItem[] = [
  {
    outlet: 'CONFEBUS',
    title: 'WINFIN y CONFEBUS apuestan por el impulso de la digitalización integral',
    date: '2026-05-11',
    dateLabel: '11 de mayo de 2026',
    url: 'https://confebus.org/publicaciones/ver/5189/winfin-y-confebus-apuestan-por-el-impulso-de-la-digitalizacion-integral',
    summary:
      'WINFIN se incorpora como Socio Colaborador de CONFEBUS (Confederación Española de Transporte en Autobús) para ofrecer soluciones tecnológicas embarcadas, integración de sistemas, mantenimiento técnico y auditorías de digitalización a las empresas asociadas.',
  },
  {
    outlet: 'Nexotrans',
    title: 'WINFIN y CONFEBUS se alían para impulsar la digitalización del transporte en autobús',
    date: '2026-05-11',
    dateLabel: 'Mayo de 2026',
    url: 'https://nexotrans.com/winfin-y-confebus-se-alian-para-impulsar-la-digitalizacion-del-transporte-en-autobus/',
    summary:
      'Cobertura de la alianza entre WINFIN y CONFEBUS para impulsar la digitalización y la seguridad en el sector del transporte de viajeros por carretera.',
  },
  {
    outlet: 'Todotransporte',
    title: 'La plataforma Vision360 incorpora detección de doble ángulo ciego para vehículos V.I.',
    date: '2026-04-07',
    dateLabel: '7 de abril de 2026',
    url: 'https://www.todotransporte.com/texto-diario/mostrar/5835537/plataforma-vision360-incorpora-deteccion-doble-angulo-ciego-vehiculos-vi',
    summary:
      'Vision360IA incorpora la detección simultánea de peatones y vehículos que se aproximan sin visibilidad directa, con alertas coordinadas, integrándose sobre el hardware existente para mejorar la seguridad en ángulos muertos.',
  },
  {
    outlet: 'Autobuses & Autocares',
    title: 'WINFIN lanza la solución 360º Vision360IA con IA',
    date: '2025-12-31',
    dateLabel: '31 de diciembre de 2025',
    url: 'https://www.autobusesyautocares.com/texto-diario/mostrar/5719828/winfin-lanza-solucion-360-vision360ia-ia',
    summary:
      'Presentación de Vision360IA, la solución de visión perimetral 360° con inteligencia artificial de WINFIN para flotas profesionales, con cámaras HD e IA que identifican peatones, ciclistas y usuarios vulnerables en maniobras urbanas e interurbanas.',
  },
  {
    outlet: 'Global Mobility Call (LinkedIn)',
    title: 'Vision360IA en Global Mobility Call 2026',
    date: '2026-01-01',
    dateLabel: '2026',
    url: 'https://www.linkedin.com/posts/global-mobility-call_gmc2026-globalmobilitycall-gmc2026-activity-7466074521922351105-zZx7',
    summary:
      'Presencia de Vision360IA y WINFIN en el ecosistema de Global Mobility Call (GMC2026), evento de referencia sobre movilidad sostenible e inteligente.',
  },
];

export default function SalaDePrensaPage() {
  const schemas = [
    breadcrumbSchema([{ name: 'Sala de prensa', url: '/sala-de-prensa' }]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Sala de prensa de Vision360IA',
      description:
        'Apariciones de Vision360IA y WINFIN en medios del sector del transporte y alianzas sectoriales.',
      url: `${SITE_URL}/sala-de-prensa`,
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: 'es-ES',
      hasPart: pressItems.map((p) => ({
        '@type': 'NewsArticle',
        headline: p.title,
        datePublished: p.date,
        url: p.url,
        publisher: { '@type': 'Organization', name: p.outlet },
        about: { '@id': ORGANIZATION_ID },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <article className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        <SectionWrapper className="max-w-5xl px-6 pb-10 pt-20 md:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-950">Inicio</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">Sala de prensa</span>
          </nav>

          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8 lg:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">SALA DE PRENSA</p>
            <h1 className="max-w-4xl font-headline text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">
              Vision360IA y WINFIN en los medios
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Medios del sector del transporte y asociaciones de referencia cubren la tecnología de
              visión 360° con IA de Vision360IA y la actividad de WINFIN. Destaca nuestra
              incorporación como <strong className="text-slate-900">Socio Colaborador de CONFEBUS</strong>,
              la Confederación Española de Transporte en Autobús.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
              Socio Colaborador de CONFEBUS
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper className="max-w-5xl bg-transparent px-6 py-6 md:px-6 md:py-10">
          <ul className="space-y-5">
            {pressItems.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  className="group block rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:border-sky-200 md:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700/80">
                    <span>{item.outlet}</span>
                    <span className="text-slate-300">·</span>
                    <time dateTime={item.date} className="text-slate-500">{item.dateLabel}</time>
                  </div>
                  <h2 className="mt-3 font-headline text-xl font-semibold tracking-[-0.02em] text-slate-950 md:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{item.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                    Leer en {item.outlet} <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </SectionWrapper>

        <SectionWrapper className="max-w-4xl bg-transparent px-6 py-12 md:px-6 md:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_28%),linear-gradient(180deg,#0f172a,#020617)] p-8 text-center text-white md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">¿Eres periodista o medio?</p>
            <h2 className="mt-3 font-headline text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
              Contacta con nosotros para información o entrevistas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Escríbenos para material gráfico, datos técnicos sobre Vision360IA o declaraciones sobre
              seguridad en flotas y digitalización del transporte.
            </p>
            <div className="mt-6 flex justify-center">
              <ContactFormButton size="lg">Contactar con prensa</ContactFormButton>
            </div>
          </div>
        </SectionWrapper>
      </article>
    </>
  );
}
