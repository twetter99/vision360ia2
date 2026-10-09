import type { Metadata, Viewport } from 'next';
import Link from 'next/link';

import { FleetEvaluationForm } from './_components/fleet-evaluation-form';
import { HomeLink } from './_components/home-link';
import { LandingHeader } from './_components/landing-header';
import { ScrollToFormButton } from './_components/scroll-to-form-button';
import { HeroCopy } from './_components/hero-copy';
import './landing.css';

/** Campaign landing: static Next.js export, existing PHP lead flow and noindex. */

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

export default function EvaluacionFlotaPage() {
  const year = new Date().getFullYear();
  return (
    <div data-lp="evaluacion-flota" className="ef-landing">
      <a className="ef-skip" href="#evaluacion">Ir al formulario de evaluación</a>
      <LandingHeader />
      <section className="ef-hero" aria-label="Vision360IA para flotas profesionales">
        <div className="ef-wrap ef-hero-grid">
          <div className="ef-hero-content">
            <p className="ef-eyebrow">ADAS Y VISIÓN PERIMETRAL PARA FLOTAS PROFESIONALES</p>
            <HeroCopy />
            <ul className="ef-pills" aria-label="Tipos de vehículos">
              <li>Autobuses</li><li>Camiones</li><li>Vehículos industriales</li>
            </ul>
            <figure className="ef-product">
              <div className="ef-product-media">
                <span className="ef-media-label">VISIÓN PERIMETRAL / DETECCIÓN IA</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- responsive local images for static export */}
                <img src={PRODUCT_IMAGE.src} srcSet={PRODUCT_IMAGE.srcSet}
                  sizes="(min-width: 1100px) 620px, (min-width: 781px) 50vw, calc(100vw - 34px)"
                  width={PRODUCT_IMAGE.width} height={PRODUCT_IMAGE.height} alt={PRODUCT_IMAGE.alt}
                  loading="eager" fetchPriority="high" decoding="async" />
                <span className="ef-media-caption">Imagen real de Vision360IA</span>
              </div>
              <figcaption>Funcionamiento real de Vision360IA · No es una simulación.</figcaption>
            </figure>
            <div className="ef-hero-actions">
              <ScrollToFormButton interest="demo">Solicitar demostración ↗</ScrollToFormButton>
              <a className="ef-text-link" href="#proceso">Así funciona →</a>
            </div>
          </div>
          <FleetEvaluationForm />
        </div>
      </section>

      <section className="ef-trust" aria-label="Experiencia de WINFIN">
        <div className="ef-wrap ef-trust-grid">
          <p className="ef-trust-lead">Una solución respaldada por la experiencia de WINFIN</p>
          <p className="ef-trust-item"><strong>20+ años</strong><span>de experiencia en instalaciones embarcadas</span></p>
          <p className="ef-trust-item"><strong>2.000+</strong><span>vehículos equipados por WINFIN</span></p>
          <p className="ef-trust-item"><strong>España</strong><span>ingeniería e instalación especializada</span></p>
        </div>
        <p className="ef-wrap ef-trust-note">Las cifras de experiencia y vehículos equipados corresponden a WINFIN, no exclusivamente a Vision360IA.</p>
      </section>

      <section id="proceso" className="ef-section ef-tint" aria-labelledby="ef-process-title">
        <div className="ef-wrap">
          <p className="ef-section-label">De la demostración a una implantación viable</p>
          <h2 id="ef-process-title">No necesitas decidir sobre toda la flota desde el principio</h2>
          <p className="ef-section-lead">Primero revisamos el vehículo y sus maniobras. Después mostramos la tecnología en funcionamiento y valoramos contigo si un piloto tiene sentido.</p>
          <div className="ef-steps">
            <article><span>01 · EVALUACIÓN</span><h3>Entendemos tu operación</h3><p>Tipo de vehículo, puntos ciegos, maniobras habituales y necesidades de seguridad.</p></article>
            <article><span>02 · DEMOSTRACIÓN</span><h3>Ves el sistema real</h3><p>Conoces la visión perimetral, la detección y los avisos al conductor antes de decidir.</p></article>
            <article><span>03 · PROPUESTA</span><h3>Decides cómo avanzar</h3><p>Si encaja, planteamos un piloto o una propuesta de integración adaptada a la flota.</p></article>
          </div>
          <ScrollToFormButton interest="piloto" variant="link" className="ef-process-cta">Consultar un piloto en un vehículo →</ScrollToFormButton>
        </div>
      </section>

      <section id="winfin" className="ef-section" aria-labelledby="ef-integration-title">
        <div className="ef-wrap ef-case-grid">
          <div>
            <p className="ef-section-label">La diferencia está en la integración</p>
            <h2 id="ef-integration-title">No vendemos solo cámaras. Adaptamos la solución al vehículo.</h2>
            <p className="ef-section-lead">La instalación importa tanto como la tecnología. WINFIN analiza el vehículo, determina la cobertura necesaria y realiza la integración y la calibración para la operación real.</p>
            <ul className="ef-checks">
              <li>Estudio de geometría y maniobras críticas</li>
              <li>Instalación sobre vehículos que ya están en servicio</li>
              <li>Configuración, calibración y validación técnica</li>
              <li>Interlocución con especialistas en vehículos y equipos embarcados</li>
            </ul>
            <ScrollToFormButton interest="implantacion" variant="link">Evaluar un vehículo de mi flota →</ScrollToFormButton>
          </div>
          <figure className="ef-team">
            {/* eslint-disable-next-line @next/next/no-img-element -- existing srcset for static export */}
            <img src={TEAM_IMAGE.src} srcSet={TEAM_IMAGE.srcSet} sizes="(min-width: 1100px) 590px, (min-width: 781px) 50vw, calc(100vw - 34px)"
              width={TEAM_IMAGE.width} height={TEAM_IMAGE.height} alt={TEAM_IMAGE.alt} loading="lazy" decoding="async" />
            <figcaption>Equipo de WINFIN trabajando junto a la flota de un cliente.</figcaption>
          </figure>
        </div>
      </section>

      <section className="ef-section ef-section-compact ef-tint" aria-labelledby="ef-applications-title">
        <div className="ef-wrap">
          <p className="ef-section-label">Aplicaciones</p>
          <h2 id="ef-applications-title">Diseñada para operaciones donde la visibilidad importa</h2>
          <div className="ef-audiences">
            <article><h3>Autobuses</h3><p>Giros, paradas, incorporación y circulación urbana.</p></article>
            <article><h3>Camiones</h3><p>Maniobras, accesos a muelles y tráfico mixto.</p></article>
            <article><h3>Vehículos municipales</h3><p>Residuos, limpieza y trabajo entre peatones.</p></article>
            <article><h3>Vehículos industriales</h3><p>Operaciones especiales, recintos y logística.</p></article>
          </div>
        </div>
      </section>

      <section className="ef-section ef-section-compact" aria-labelledby="ef-faq-title">
        <div className="ef-wrap">
          <p className="ef-section-label">Preguntas frecuentes</p>
          <h2 id="ef-faq-title">Lo que necesita saber un responsable de flota</h2>
          <div className="ef-faq">
            <details><summary>¿Sirve para vehículos que ya tenemos?</summary><p>Sí, la integración puede evaluarse sobre flotas en servicio. Es necesario revisar modelo, configuración, maniobras y condiciones de instalación de cada vehículo.</p></details>
            <details><summary>¿Sustituye la atención del conductor?</summary><p>No. Es un sistema de asistencia que mejora la información disponible para el conductor; no sustituye la vigilancia, las normas ni una conducción segura.</p></details>
            <details><summary>¿Se puede empezar con un solo vehículo?</summary><p>Para empresas con flotas desde cinco vehículos, podemos estudiar un piloto en uno de ellos antes de plantear un despliegue mayor. Sus condiciones y alcance se concretan según la flota y la instalación.</p></details>
            <details><summary>¿La demostración obliga a contratar?</summary><p>La solicitud de información y demostración no implica un contrato. El alcance de un eventual piloto o instalación se define en una propuesta posterior.</p></details>
          </div>
        </div>
      </section>

      <section className="ef-bottom-cta" aria-labelledby="ef-final-title">
        <div className="ef-wrap">
          <div><h2 id="ef-final-title">La mejor forma de valorarlo es verlo funcionar</h2><p>Cuéntanos qué vehículos operas y qué situaciones quieres cubrir.</p></div>
          <ScrollToFormButton interest="demo">Solicitar evaluación técnica →</ScrollToFormButton>
        </div>
      </section>
      <footer className="ef-footer">
        <div className="ef-wrap">
          <p>© {year} Vision360IA · WINFIN Instalaciones, S.L.</p>
          <nav aria-label="Enlaces legales">
            <Link href="/privacidad" target="_blank" rel="noopener noreferrer">Privacidad</Link>
            <Link href="/aviso-legal" target="_blank" rel="noopener noreferrer">Aviso legal</Link>
            <Link href="/cookies" target="_blank" rel="noopener noreferrer">Cookies</Link>
            <HomeLink>Web oficial</HomeLink>
          </nav>
        </div>
      </footer>
      <div className="ef-mobile-bar">
        <span>¿Quieres evaluar tu flota?</span>
        <ScrollToFormButton interest="demo">Solicitar demo ↗</ScrollToFormButton>
      </div>
    </div>
  );
}
