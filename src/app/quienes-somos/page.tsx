import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { ContactFormButton } from '@/components/shared/contact-form-button';
import { translations } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'Quiénes somos | WINFIN y Vision360IA',
  description:
    'Conoce a WINFIN y Vision360IA: ingeniería, integración embarcada, instalación y validación de sistemas ADAS, visión 360° y detección inteligente para flotas profesionales.',
  openGraph: {
    title: 'Quiénes somos | WINFIN y Vision360IA',
    description:
      'Ingeniería, implantación y experiencia real en autobuses, camiones y vehículos industriales para desplegar sistemas ADAS con criterio técnico.',
  },
};

export default function AboutPage() {
  const t = translations.es.aboutPage;
  const offices = [
    {
      city: 'Madrid',
      role: 'Oficina y taller propios',
      address: ['Moreras, 1, N 65 y 66', '28350 Ciempozuelos, Madrid'],
      phone: '+34 914 520 406',
    },
    {
      city: 'Donostia / San Sebastián',
      role: 'Oficina y taller propios',
      address: ['P. Mikeletegui, 56, of 314', '20009 Donostia / San Sebastián, Guipúzcoa'],
      phone: '+34 943 284 721',
      context: 'Presencia en el campus de Donostia del Parke, Parque Tecnológico de Euskadi.',
    },
  ];
  const capabilities = [
    {
      title: 'Ingeniería de implantación',
      text: 'Estudiamos geometría, maniobras, puntos ciegos y operación del vehículo antes de definir arquitectura, cobertura y montaje.',
    },
    {
      title: 'Integración embarcada',
      text: 'Trabajamos con cámaras, cableado, monitores, unidades de proceso y configuraciones adaptadas a autobuses, camiones y vehículos especiales.',
    },
    {
      title: 'Validación en servicio',
      text: 'Ajustamos el sistema en condiciones reales para que la alerta sea útil en operación y no una capa adicional de ruido para conductor y flota.',
    },
  ];

  const milestones = [
    'Más de 20 años en instalaciones embarcadas y soluciones para transporte.',
    '+2.000 vehículos equipados en operación real.',
    'Experiencia en retrofit y despliegues sobre flota profesional.',
    'Cobertura para autobuses, camiones, RSU, industria y vehículos especiales.',
  ];

  return (
    <main className="pb-20 pt-28 md:pb-24 md:pt-32">
      <section className="container">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] px-6 py-8 shadow-[var(--shadow-soft)] md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-headline text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">
                Empresa e implantación
              </p>
              <h1 className="max-w-3xl font-headline text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl md:leading-[1.02]">
                {t.hero.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {t.hero.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                WINFIN desarrolla e implanta sistemas ADAS, visión perimetral y hardware embarcado para flotas que operan en entornos urbanos, logísticos e industriales donde la fiabilidad depende de cómo se integra la tecnología en cada vehículo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ContactFormButton
                  className="min-h-12 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.24)] transition-colors duration-300 hover:bg-accent/90"
                >
                  {t.hero.cta}
                </ContactFormButton>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-300 hover:bg-white"
                >
                  Volver a la home
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/Equipo-winfin.jpeg"
                    alt="Equipo y medios de WINFIN en un despliegue sobre flota profesional."
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Trayectoria</div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">20+ años</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">Implantando tecnología embarcada en transporte, vehículos industriales y operaciones de servicio intensivo.</p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/88 px-5 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Base instalada</div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">+2.000</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">Vehículos equipados en operación real con soluciones implantadas sobre flota profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-16 md:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-headline text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">
            Capacidades
          </p>
          <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
            Capacidades técnicas para llevar el sistema del plano a la operación real
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            No somos solo proveedor de hardware. Aportamos criterio técnico para estudiar el vehículo, implantar la arquitectura correcta y validarla antes del despliegue a escala.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm"
            >
              <h3 className="font-headline text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pt-16 md:pt-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-headline text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">
            Oficinas y talleres propios
          </p>
          <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
            Estructura real para soporte comercial, implantación técnica y seguimiento de proyectos
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            WINFIN opera con estructura propia en Madrid y Donostia / San Sebastián para dar soporte a proyectos de integración embarcada, despliegue sobre flota profesional y validación en servicio.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2">
          {offices.map((office) => (
            <article
              key={office.city}
              className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-8"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">{office.role}</div>
              <h3 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {office.city}
              </h3>
              <div className="mt-5 space-y-2 text-base leading-relaxed text-slate-600">
                {office.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {'context' in office ? (
                <p className="mt-4 text-sm leading-6 text-slate-500">{office.context}</p>
              ) : null}
              <a
                href={`tel:${office.phone.replace(/\s+/g, '')}`}
                className="mt-5 inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-white"
              >
                {office.phone}
              </a>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Entorno de innovación</div>
              <h3 className="mt-3 font-headline text-2xl font-semibold tracking-[-0.03em] text-slate-950 md:text-3xl">
                Presencia en el Parque Tecnológico de Euskadi
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Contamos con oficina y taller en el campus de Donostia del Parke, Parque Tecnológico de Euskadi, uno de los principales polos de innovación tecnológica del norte de España. Esta presencia refuerza nuestra capacidad para desarrollar e implantar soluciones avanzadas de movilidad, sistemas embarcados y tecnologías inteligentes.
              </p>
              <a
                href="https://parke.eus/campus/donostia/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Ver campus de Donostia del Parke
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <div className="relative mx-auto aspect-[16/7] w-full max-w-[22rem]">
                <Image
                  src="/images/parke-B-eu.png"
                  alt="Logo del Parke, Parque Tecnológico de Euskadi."
                  fill
                  sizes="(max-width: 1023px) 80vw, 320px"
                  className="object-contain object-center"
                />
              </div>
              <p className="mt-4 text-center text-sm leading-6 text-slate-500">
                Referencia institucional que sitúa nuestra actividad en un entorno consolidado de innovación, tecnología e industria avanzada.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Web corporativa</div>
              <h3 className="mt-3 font-headline text-2xl font-semibold tracking-[-0.03em] text-slate-950 md:text-3xl">
                Más información sobre la empresa, estructura y capacidad de implantación en WINFIN
              </h3>
            </div>
            <a
              href="https://www.winfin.es"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Visitar www.winfin.es
            </a>
          </div>
        </div>
      </section>

      <section className="container pt-16 md:pt-20">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-8">
            <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {t.sections.mission.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {t.sections.mission.text}
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-8">
            <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {t.sections.vision.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {t.sections.vision.text}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                {t.sections.whatWeDo.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                {t.sections.whatWeDo.text}
              </p>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {milestones.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-white px-4 py-4 text-sm font-medium leading-6 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container pt-16 md:pt-20">
        <div className="rounded-[2.25rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_55px_rgba(15,23,42,0.18)] md:px-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/80">Siguiente paso</p>
              <h2 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {t.cta.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/72 md:text-lg">
                {t.cta.text}
              </p>
            </div>
            <ContactFormButton
              className="min-h-12 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.24)] transition-colors duration-300 hover:bg-accent/90"
            >
              {t.cta.button}
            </ContactFormButton>
          </div>
        </div>
      </section>
    </main>
  );
}