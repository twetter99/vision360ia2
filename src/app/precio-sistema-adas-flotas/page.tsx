import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ContactFormButton } from '@/components/shared/contact-form-button';
import { JsonLd } from '@/components/seo/json-ld';
import {
  SITE_URL,
  ORGANIZATION_ID,
  breadcrumbSchema,
  faqPageSchema,
} from '@/lib/seo/structured-data';

// El layout añade " | Vision360IA" vía template, así que NO lo repetimos aquí.
export const metadata: Metadata = {
  title: 'Precio sistema ADAS para flotas | Cámaras 360 con IA',
  description:
    'Precio de un sistema ADAS con cámaras 360° e IA para flotas: desde 2.500 € + IVA por vehículo (habitual 2.500–4.500 €). Qué factores determinan el coste y cómo pedir presupuesto a medida.',
  keywords: [
    'precio sistema adas flotas',
    'cuánto cuesta sistema adas',
    'precio cámaras 360 camión',
    'precio cámaras 360 autobús',
    'precio visión 360 flota',
    'precio sistema antiatropello',
    'presupuesto adas flota',
    'coste retrofit adas',
    'precio adas autobuses',
    'precio adas camiones',
  ],
  alternates: { canonical: '/precio-sistema-adas-flotas' },
  openGraph: {
    images: [{ url: 'https://www.vision360ia.com/images/og-image.jpg', width: 1200, height: 630, alt: 'Vision360IA — visión 360° con inteligencia artificial para flotas' }],
    title: 'Precio de un sistema ADAS para flotas | Vision360IA',
    description:
      'Desde 2.500 € + IVA por vehículo. Qué determina el precio de un sistema ADAS con cámaras 360° e IA y cómo pedir presupuesto a medida.',
    url: `${SITE_URL}/precio-sistema-adas-flotas`,
    type: 'website',
  },
};

const factors = [
  {
    title: 'Tipo y geometría del vehículo',
    desc: 'No cuesta lo mismo un autobús articulado, un camión rígido, una tractora o una máquina de obra. La geometría define cuántas cámaras y qué cobertura necesita.',
  },
  {
    title: 'Número de cámaras',
    desc: 'Las configuraciones habituales usan entre 4 y 6 cámaras para cubrir el perímetro completo. A más zonas críticas, más cámaras.',
  },
  {
    title: 'Integración y monitor',
    desc: 'Monitor en cabina, unidad de proceso (ECU/IA), conectividad e integración con tu sistema de gestión de flotas (FMS) si la necesitas.',
  },
  {
    title: 'Cableado e instalación',
    desc: 'El recorrido de cableado, los puntos de anclaje y la complejidad del montaje varían según el vehículo y condicionan la mano de obra.',
  },
  {
    title: 'Calibración y validación',
    desc: 'Cada sistema se calibra y se valida en servicio para que la alerta sea útil y no ruido. Es lo que separa una instalación que funciona de una que estorba.',
  },
  {
    title: 'Alcance del proyecto y normativa',
    desc: 'El volumen de la flota (precio por vehículo mejora a escala) y el nivel de cumplimiento GSR (R151, R158, R159) ajustan la configuración y el coste.',
  },
];

const faqs = [
  {
    question: '¿Cuánto cuesta un sistema ADAS con cámaras 360° para una flota?',
    answer:
      'Como referencia, Vision360IA parte desde 2.500 € + IVA por vehículo en proyectos de flota, con configuraciones habituales entre 2.500 € y 4.500 € + IVA por vehículo. El precio final depende del tipo de vehículo, el número de cámaras, la integración, el cableado, la calibración y el alcance del proyecto.',
  },
  {
    question: '¿Por qué el precio depende del vehículo?',
    answer:
      'Porque la geometría y los puntos ciegos de un autobús, un camión, un vehículo de recogida de residuos o una máquina de obra son distintos. Eso cambia el número y la posición de las cámaras, el cableado y la calibración necesaria, y por tanto el coste.',
  },
  {
    question: '¿Hay mejor precio por volumen de flota?',
    answer:
      'Sí. El precio por vehículo mejora en proyectos de flota frente a instalaciones de un solo vehículo, porque se optimiza la ingeniería de implantación, la logística y la instalación en serie.',
  },
  {
    question: '¿El precio incluye la instalación y la calibración?',
    answer:
      'El presupuesto de flota contempla la instalación, la calibración y la validación en servicio. El cableado y la mano de obra se ajustan según el tipo de vehículo. Te detallamos en el presupuesto qué incluye cada partida.',
  },
  {
    question: '¿Se amortiza la inversión?',
    answer:
      'Normalmente el sistema se amortiza evitando uno o dos incidentes relevantes, reduciendo inmovilizaciones, daños en maniobra, reclamaciones y exposición al siniestro. En flotas con operación urbana intensiva el retorno suele ser rápido.',
  },
  {
    question: '¿El precio incluye garantía y mantenimiento?',
    answer:
      'Los equipos se entregan con garantía. El mantenimiento y el soporte posterior se pueden contratar como servicio para mantener el sistema operativo y calibrado a lo largo de la vida de la flota.',
  },
];

export default function PrecioSistemaAdasFlotasPage() {
  const schemas = [
    breadcrumbSchema([{ name: 'Precio sistema ADAS para flotas', url: '/precio-sistema-adas-flotas' }]),
    faqPageSchema(faqs),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Sistema ADAS con visión 360° e IA para flotas',
      serviceType: 'Instalación de sistema ADAS y visión 360° para flotas profesionales',
      description:
        'Sistema ADAS con cámaras 360° e inteligencia artificial para autobuses, camiones y vehículos industriales, instalado y calibrado por WINFIN sobre flota existente.',
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: 'España' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '2500',
          maxPrice: '4500',
          referenceQuantity: {
            '@type': 'QuantitativeValue',
            value: '1',
            unitText: 'vehículo',
          },
          valueAddedTaxIncluded: false,
        },
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/precio-sistema-adas-flotas`,
      },
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <article className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        {/* Hero + price card */}
        <SectionWrapper className="max-w-5xl px-6 pb-10 pt-20 md:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition-colors hover:text-slate-950">Inicio</Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">Precio</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8 lg:p-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">PRECIO</p>
              <h1 className="max-w-3xl font-headline text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 md:text-5xl md:leading-[1.02]">
                Precio de un sistema ADAS para flotas: desde 2.500 €/vehículo
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                El precio de un sistema ADAS con cámaras 360° e inteligencia artificial para flotas depende del tipo de vehículo, número de cámaras, integración, cableado, calibración y alcance del proyecto. Como referencia, Vision360IA parte <strong className="text-slate-900">desde 2.500 € + IVA por vehículo</strong> en proyectos de flota, con configuraciones habituales entre <strong className="text-slate-900">2.500 € y 4.500 € + IVA</strong> por vehículo.
              </p>
            </div>

            <aside className="flex flex-col justify-between rounded-[2rem] border border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.96))] p-6 text-center shadow-[var(--shadow-soft)] md:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Precio orientativo</p>
                <div className="mt-3 font-headline text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
                  desde 2.500 €
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500">+ IVA por vehículo</p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Configuraciones habituales entre <strong className="text-slate-900">2.500 € y 4.500 € + IVA</strong> por vehículo, según vehículo y proyecto.
                </p>
              </div>
              <div className="mt-6">
                <ContactFormButton size="lg" className="min-h-[52px] w-full justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.24)] hover:bg-accent/90">
                  Solicitar presupuesto a medida
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ContactFormButton>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Precio orientativo. El presupuesto final depende de tu flota.
                </p>
              </div>
            </aside>
          </div>
        </SectionWrapper>

        {/* Qué determina el precio */}
        <SectionWrapper className="max-w-5xl bg-transparent px-6 py-8 md:px-6 md:py-12">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700/80">Qué determina el precio</p>
            <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              6 factores que mueven el coste por vehículo
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              No hay un precio único porque no hay dos flotas iguales. Estos son los factores que ajustamos para darte un presupuesto realista.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {factors.map((f) => (
              <div key={f.title} className="rounded-[1.75rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm">
                <h3 className="font-headline text-xl font-semibold tracking-[-0.02em] text-slate-950">{f.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Qué incluye el presupuesto de flota */}
        <SectionWrapper className="max-w-5xl bg-transparent px-6 py-6 md:px-6 md:py-10">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="font-headline text-2xl font-semibold tracking-[-0.03em] text-slate-950 md:text-3xl">
              Qué incluye un presupuesto de flota
            </h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                'Estudio previo del vehículo, puntos ciegos y maniobras críticas',
                'Cámaras 360° HD de grado industrial (IP69K) y unidad de proceso con IA',
                'Monitor en cabina e integración con tu operación o FMS',
                'Instalación profesional y cableado adaptado al vehículo',
                'Calibración y validación en servicio antes de escalar la flota',
                'Garantía de equipos y soporte; mantenimiento opcional',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-base leading-relaxed text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-sky-200/70 bg-sky-50/70 px-5 py-4 text-base leading-relaxed text-slate-700">
              <strong className="text-slate-900">Sobre la amortización:</strong> el sistema suele amortizarse evitando uno o dos incidentes relevantes, reduciendo inmovilizaciones, daños en maniobra y reclamaciones. En operación urbana intensiva el retorno es rápido.
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="max-w-4xl bg-transparent px-6 py-8 md:px-6 md:py-12">
          <h2 className="mb-8 font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
            Preguntas frecuentes sobre el precio
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[var(--shadow-soft)]">
                <h3 className="font-headline text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* CTA final */}
        <SectionWrapper className="max-w-4xl bg-transparent px-6 py-12 md:px-6 md:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_28%),linear-gradient(180deg,#0f172a,#020617)] p-8 text-center text-white md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">Presupuesto a medida</p>
            <h2 className="mt-3 font-headline text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
              Dinos cómo es tu flota y te damos un precio cerrado
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Cuéntanos el tipo y número de vehículos y las maniobras críticas. Te preparamos una propuesta con la configuración recomendada y el precio por vehículo. Respuesta en 24-48 h.
            </p>
            <div className="mt-6 flex justify-center">
              <ContactFormButton size="lg" className="min-h-[52px] rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.24)] hover:bg-accent/90">
                Solicitar presupuesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </ContactFormButton>
            </div>
            <nav className="mt-8 flex flex-wrap justify-center gap-3 text-sm" aria-label="Páginas relacionadas">
              {[
                { href: '/adas-autobuses', label: 'ADAS para autobuses' },
                { href: '/adas-camiones', label: 'ADAS para camiones' },
                { href: '/camaras-vision-artificial-flotas', label: 'Cámaras 360 con IA' },
                { href: '/normativa-gsr-flotas', label: 'Normativa GSR' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-white/15 bg-white px-4 py-2 text-slate-600 transition-colors hover:border-white/35 hover:text-slate-950">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </SectionWrapper>
      </article>
    </>
  );
}
