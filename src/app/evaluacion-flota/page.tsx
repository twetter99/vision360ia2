import type { Metadata, Viewport } from 'next';
import Link from 'next/link';

import { FleetEvaluationForm } from './_components/fleet-evaluation-form';
import { HomeLink } from './_components/home-link';
import { LandingHeader } from './_components/landing-header';
import { ScrollToFormButton } from './_components/scroll-to-form-button';
import { BlindSpotStrip } from './_components/visuals/blind-spot-strip';
import { CoverageMap } from './_components/visuals/coverage-map';
import { Iceberg } from './_components/visuals/iceberg';
import { PedestrianCheck } from './_components/visuals/pedestrian-check';
import { Steps } from './_components/visuals/steps';
import './landing.css';

/**
 * Landing de conversión para tráfico de OpenAI/ChatGPT Ads.
 *
 * - Pensada para móvil Android (la mayoría del tráfico): mensajes cortos y
 *   gráficos que explican sin leer (ver _components/visuals).
 * - Eje comercial: verlo funcionar (demo) o probarlo en un vehículo propio
 *   (piloto) antes de decidir. Vamos a la cochera o base del cliente en toda
 *   España (por eso el formulario pide la provincia).
 * - Página independiente: noindex, fuera del sitemap y sin navegación global
 *   (ver landing.css). No modifica ninguna otra página de la web.
 */

const PAGE_URL = 'https://www.vision360ia.com/evaluacion-flota';
const TITLE = 'Demo o piloto de visión 360° para tu flota';
const DESCRIPTION =
  'Vision360IA detecta peatones, ciclistas y obstáculos en ángulos muertos. Demo en vivo o piloto en tu cochera o base, en toda España. Sin compromiso.';
const TEAM_IMAGE = {
  src: '/images/landing-evaluacion/equipo-winfin-instalacion.jpg',
  srcSet:
    '/images/landing-evaluacion/equipo-winfin-instalacion-720.jpg 720w, /images/landing-evaluacion/equipo-winfin-instalacion.jpg 1440w',
  width: 1440,
  height: 593,
  alt: 'Técnicos de WINFIN y furgonetas de instalación junto a una flota de autobuses.',
};
const PRODUCT_IMAGE = {
  src: '/images/landing-evaluacion/vision360-deteccion-peatones.jpg',
  srcSet:
    '/images/landing-evaluacion/vision360-deteccion-peatones-720.jpg 720w, /images/landing-evaluacion/vision360-deteccion-peatones.jpg 1280w',
  width: 1280,
  height: 582,
  alt: 'Pantalla real del sistema Vision360IA: vista 360° desde arriba, aviso de peatón y detección de vehículos.',
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Solo para tráfico de campaña: que Google no la indexe, pero sí siga enlaces.
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: PAGE_URL,
    siteName: 'Vision360IA',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: TEAM_IMAGE.src, width: TEAM_IMAGE.width, height: TEAM_IMAGE.height, alt: TEAM_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [TEAM_IMAGE.src],
  },
};

// Solo tema claro, para que el navegador del móvil no la oscurezca por su cuenta.
export const viewport: Viewport = {
  colorScheme: 'only light',
};

const H2 = 'font-headline text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.02em] text-slate-950 [text-wrap:balance] md:text-4xl';
const SECTION = 'mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-20';

export default function EvaluacionFlotaPage() {
  const year = new Date().getFullYear();

  return (
    <div data-lp="evaluacion-flota" className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_55%)] text-slate-900">
      {/* Cabecera fina y fija con el enlace a la web general (se esconde al bajar) */}
      <LandingHeader />

      {/* 1 · Primera pantalla: titular, el sistema en acción, la oferta y el formulario */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 pb-12 pt-4 sm:gap-6 sm:px-6 sm:pt-6 md:pt-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14 lg:pb-20 lg:pt-14">
        <div className="min-w-0">
          <h1 className="font-headline text-[1.6rem] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-950 [text-wrap:balance] min-[400px]:text-[1.8rem] sm:text-4xl lg:text-[3.2rem] lg:leading-[1.05]">
            Míralo funcionar antes de decidir
          </h1>
          <BlindSpotStrip className="mt-3 sm:mt-5 lg:mt-8" />
          <p className="mt-3 text-[15px] leading-normal text-slate-700 sm:text-base md:text-lg lg:mt-6">
            <strong className="font-semibold text-slate-950">Vamos donde está tu flota:</strong> demo en vivo o piloto en
            uno de tus vehículos, en toda España.
          </p>
        </div>

        <FleetEvaluationForm />
      </section>

      {/* 2 · Interactiva: lo que ve el conductor frente a lo que ve el sistema */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className={SECTION}>
          <div className="max-w-2xl">
            <h2 className={H2}>¿Cuántos peatones ves?</h2>
            <p className="mt-2 text-base text-slate-600 md:text-lg">Pulsa y compara.</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
            <PedestrianCheck />
            <figure className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-[var(--shadow-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- srcset propio (export estático sin optimizador) */}
                <img
                  src={PRODUCT_IMAGE.src}
                  srcSet={PRODUCT_IMAGE.srcSet}
                  sizes="(min-width: 1024px) 560px, calc(100vw - 2rem)"
                  alt={PRODUCT_IMAGE.alt}
                  width={PRODUCT_IMAGE.width}
                  height={PRODUCT_IMAGE.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-sm text-slate-500">Así lo ve el conductor: pantalla real del sistema.</figcaption>
            </figure>
          </div>
          {/* Momento clave: quien quiera saber más de la tecnología puede ir a la web general */}
          <p className="mt-4">
            <HomeLink className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">Descubre más sobre la tecnología →</HomeLink>
          </p>
        </div>
      </section>

      {/* 3 · Cómo trabajamos: lo ves, lo pruebas, decides */}
      <section className="border-t border-slate-200/80">
        <div className={SECTION}>
          <h2 className={`${H2} max-w-2xl`}>Empieza por un vehículo, no por toda la flota</h2>
          <div className="mt-8">
            <Steps />
          </div>
          <div className="mt-9 md:text-center">
            <ScrollToFormButton interest="piloto">QUIERO HACER UN PILOTO</ScrollToFormButton>
          </div>
        </div>
      </section>

      {/* 4 · El coste real de un golpe (sin prometer ahorros) */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className={`${SECTION} grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-14`}>
          <div className="min-w-0">
            <h2 className={H2}>Un golpe nunca es solo chapa</h2>
            <p className="mt-3 text-base text-slate-700 md:text-lg">
              Vision360IA ayuda al conductor a anticiparse en maniobras y ángulos muertos.
            </p>
            <p className="mt-2 text-sm text-slate-500">Y suma en tus conversaciones con aseguradoras y prevención.</p>
          </div>
          <Iceberg />
        </div>
      </section>

      {/* 5 · Cobertura y experiencia */}
      <section className="border-t border-slate-200/80">
        <div className={`${SECTION} grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-14`}>
          <div className="min-w-0">
            <h2 className={H2}>Vamos donde está tu flota</h2>
            <p className="mt-2 text-base text-slate-600 md:text-lg">De A Coruña a Almería. De Girona a Huelva.</p>
            <div className="mt-6">
              <CoverageMap />
            </div>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- srcset propio (export estático sin optimizador) */}
              <img
                src={TEAM_IMAGE.src}
                srcSet={TEAM_IMAGE.srcSet}
                sizes="(min-width: 1024px) 560px, calc(100vw - 2rem)"
                alt={TEAM_IMAGE.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <figcaption className="mt-2 text-sm text-slate-500">Nuestro equipo, trabajando junto a la flota de un cliente.</figcaption>
          </figure>
        </div>
      </section>

      {/* Cierre */}
      <section className="border-t border-slate-200/80 bg-slate-950">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 md:py-20">
          <h2 className="mx-auto max-w-3xl font-headline text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white [text-wrap:balance] md:text-4xl">
            Decide con el sistema delante, no con una presentación
          </h2>
          <div className="mt-8 flex flex-col items-center gap-3">
            <ScrollToFormButton interest="demo">VER UNA DEMO EN VIVO</ScrollToFormButton>
            <ScrollToFormButton
              interest="piloto"
              variant="link"
              className="text-slate-200 decoration-slate-500 hover:text-white hover:decoration-slate-300"
            >
              Prefiero un piloto en uno de mis vehículos
            </ScrollToFormButton>
            <HomeLink className="inline-flex min-h-[44px] items-center text-sm text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline">
              o conoce toda la web de Vision360IA →
            </HomeLink>
          </div>
        </div>
      </section>

      {/* Pie mínimo: solo los enlaces legales (el footer global está oculto aquí) */}
      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>&copy; {year} Vision360IA · WINFIN. Todos los derechos reservados.</p>
          <nav aria-label="Enlaces del pie" className="-my-2 flex flex-wrap gap-x-5">
            <HomeLink className="py-2 font-medium text-slate-700 hover:text-slate-950">Web de Vision360IA</HomeLink>
            <Link href="/aviso-legal" target="_blank" className="py-2 hover:text-slate-900">
              Aviso legal
            </Link>
            <Link href="/privacidad" target="_blank" className="py-2 hover:text-slate-900">
              Privacidad
            </Link>
            <Link href="/cookies" target="_blank" className="py-2 hover:text-slate-900">
              Cookies
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
