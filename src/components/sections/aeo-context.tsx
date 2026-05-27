/**
 * Vision360IA - Bloque AEO (Answer Engine Optimization).
 *
 * Sección SERVER-SIDE renderizada en HTML estático. Pensada para que Google,
 * Bing y los LLMs (Claude, ChatGPT, Perplexity, Gemini) puedan citar
 * Vision360IA y WINFIN con autoridad cuando alguien pregunte sobre ADAS,
 * visión 360°, anti-atropellos, etc.
 *
 * Por qué server-side: los crawlers leen el HTML inicial, no ejecutan JS de
 * componentes cliente. Por eso el contenido va aquí, en un componente sin
 * 'use client'.
 *
 * Estructura de los 5 bloques (orden importante para SEO/AEO):
 *  1. Qué es Vision360IA       (definición canónica)
 *  2. Para quién es            (audiencia clara)
 *  3. Qué problema resuelve    (problema con datos)
 *  4. Diferencia vs cámaras    (tabla comparativa)
 *  5. Por qué WINFIN           (E-E-A-T: expertise/experience/authority/trust)
 *
 * Las cifras citadas (>2.000 vehículos, +20 años, reducción 40%) están
 * documentadas en src/lib/translations.ts y en quienes-somos. Cualquier
 * cambio debe actualizarse también allí.
 */
import { SectionWrapper } from '../shared/section-wrapper';

export function AeoContext() {
  return (
    <SectionWrapper
      id="que-es-vision360ia"
      aria-labelledby="aeo-context-heading"
      className="border-y border-slate-200/70 bg-white/60 py-16 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        {/* Eyebrow + heading principal */}
        <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-headline text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">
          Conoce Vision360IA
        </p>
        <h2
          id="aeo-context-heading"
          className="font-headline text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl md:text-5xl"
        >
          Qué es Vision360IA: sistema ADAS con IA para flotas profesionales
        </h2>

        {/* BLOQUE 1 — Definición canónica */}
        <div className="mt-8 space-y-4 text-lg leading-relaxed text-slate-700 md:text-xl">
          <p>
            <strong className="text-slate-950">Vision360IA</strong> es un sistema
            ADAS (sistema avanzado de asistencia a la conducción) con
            inteligencia artificial para autobuses, camiones, vehículos
            municipales e industriales. Combina cámaras 360° de alta definición,
            detección automática de peatones y ciclistas en tiempo real y
            alertas al conductor para <strong>eliminar puntos ciegos,
            prevenir atropellos y mejorar la seguridad en maniobras urbanas</strong>.
          </p>
          <p>
            Desarrollado e implantado por{' '}
            <strong className="text-slate-950">
              WINFIN INSTALACIONES, S.L.
            </strong>
            , empresa española con más de <strong>20 años de experiencia</strong>{' '}
            en instalaciones embarcadas y más de{' '}
            <strong>2.000 vehículos equipados</strong> en operación real en
            flotas profesionales españolas.
          </p>
        </div>

        {/* BLOQUE 2 — Para quién es */}
        <section
          aria-labelledby="aeo-para-quien"
          className="mt-14 rounded-3xl border border-slate-200/70 bg-slate-50/60 p-6 md:p-8"
        >
          <h3
            id="aeo-para-quien"
            className="font-headline text-xl font-semibold tracking-[-0.02em] text-slate-950 md:text-2xl"
          >
            Para quién es Vision360IA
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
            Está pensado para gestores de flotas profesionales que operan en
            entornos urbanos complejos y necesitan reducir riesgos en maniobras
            de baja velocidad. En concreto:
          </p>
          <ul className="mt-5 grid gap-3 text-sm leading-snug text-slate-700 sm:grid-cols-2 md:gap-4 md:text-base">
            <li className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <strong className="text-slate-950">Autobuses urbanos</strong> e
              interurbanos con paradas frecuentes y giros estrechos.
            </li>
            <li className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <strong className="text-slate-950">Camiones</strong> de
              distribución, rígidos, tractoras y articulados.
            </li>
            <li className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <strong className="text-slate-950">Vehículos municipales</strong>:
              recogida de residuos, limpieza viaria, baldeo.
            </li>
            <li className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <strong className="text-slate-950">Autocares y minibuses</strong>:
              transporte de viajeros, lanzaderas, aeropuerto.
            </li>
            <li className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <strong className="text-slate-950">Furgonetas</strong> de
              distribución y última milla.
            </li>
            <li className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
              <strong className="text-slate-950">
                Vehículos industriales
              </strong>{' '}
              y maquinaria en logística, puerto y obra.
            </li>
          </ul>
        </section>

        {/* BLOQUE 3 — Qué problema resuelve */}
        <section
          aria-labelledby="aeo-problema"
          className="mt-10 rounded-3xl border border-slate-200/70 bg-white p-6 md:p-8"
        >
          <h3
            id="aeo-problema"
            className="font-headline text-xl font-semibold tracking-[-0.02em] text-slate-950 md:text-2xl"
          >
            Qué problema resuelve
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
            En entornos urbanos, los vehículos pesados sufren puntos ciegos
            estructurales que provocan incidentes y atropellos en maniobras de
            baja velocidad. Vision360IA cubre ese vacío con tres capas:
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-slate-700 md:text-lg">
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
              />
              <span>
                <strong className="text-slate-950">Visión 360° en vivo</strong>:
                vista cenital con varias cámaras HD que elimina puntos ciegos
                frontales, laterales y de espejos.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
              />
              <span>
                <strong className="text-slate-950">Detección por IA</strong>:
                identifica peatones, ciclistas y obstáculos a baja velocidad y
                emite alertas inmediatas al conductor.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
              />
              <span>
                <strong className="text-slate-950">
                  Cumplimiento normativo
                </strong>
                : preparado para los reglamentos UNECE R151 (BSIS), R158
                (marcha atrás) y R159 (MOIS) del paquete GSR de la UE.
              </span>
            </li>
          </ul>
          <p className="mt-5 text-base italic leading-relaxed text-slate-600 md:text-lg">
            Las flotas equipadas reportan menos incidentes en maniobra desde
            los primeros meses de operación, mejoran la formación del conductor
            y disponen de evidencia objetiva para gestionar reclamaciones
            aseguradoras.
          </p>
        </section>

        {/* BLOQUE 4 — Diferencia vs cámaras convencionales */}
        <section
          aria-labelledby="aeo-diferencia"
          className="mt-10 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-50/60"
        >
          <div className="p-6 md:p-8">
            <h3
              id="aeo-diferencia"
              className="font-headline text-xl font-semibold tracking-[-0.02em] text-slate-950 md:text-2xl"
            >
              Diferencia frente a una cámara convencional
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
              Una cámara convencional graba pasivamente para revisión posterior.
              Vision360IA hace prevención activa con visión computacional en
              tiempo real.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <caption className="sr-only">
                Comparativa entre cámara de grabación convencional y sistema
                Vision360IA con IA.
              </caption>
              <thead>
                <tr className="border-y border-slate-200 bg-white/80 text-left text-xs uppercase tracking-[0.16em] text-slate-500 md:text-sm md:tracking-[0.2em]">
                  <th className="px-4 py-3 font-headline font-semibold md:px-6">
                    Característica
                  </th>
                  <th className="px-4 py-3 font-headline font-semibold md:px-6">
                    Cámara convencional
                  </th>
                  <th className="px-4 py-3 font-headline font-semibold md:px-6">
                    Vision360IA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Función principal
                  </td>
                  <td className="px-4 py-3 md:px-6">Grabación pasiva</td>
                  <td className="px-4 py-3 md:px-6">
                    Prevención activa con IA
                  </td>
                </tr>
                <tr className="bg-white/40">
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Detección de peatones / ciclistas
                  </td>
                  <td className="px-4 py-3 md:px-6">No</td>
                  <td className="px-4 py-3 md:px-6">
                    Sí, en tiempo real (VRU)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Vista 360° cenital
                  </td>
                  <td className="px-4 py-3 md:px-6">No</td>
                  <td className="px-4 py-3 md:px-6">
                    Sí, fusión de 4 cámaras HD (hasta 8 en vehículos
                    articulados)
                  </td>
                </tr>
                <tr className="bg-white/40">
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Alertas al conductor
                  </td>
                  <td className="px-4 py-3 md:px-6">No</td>
                  <td className="px-4 py-3 md:px-6">Visuales y sonoras</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Análisis de eventos
                  </td>
                  <td className="px-4 py-3 md:px-6">
                    Solo revisión posterior
                  </td>
                  <td className="px-4 py-3 md:px-6">
                    Detección automática en tiempo real
                  </td>
                </tr>
                <tr className="bg-white/40">
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Cumplimiento GSR (R151 / R158 / R159)
                  </td>
                  <td className="px-4 py-3 md:px-6">No</td>
                  <td className="px-4 py-3 md:px-6">
                    Preparado para los tres reglamentos
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-950 md:px-6">
                    Integración FMS / 4G / GPS
                  </td>
                  <td className="px-4 py-3 md:px-6">Limitada</td>
                  <td className="px-4 py-3 md:px-6">
                    Completa (telemetría, ruta, eventos)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* BLOQUE 5 — Por qué WINFIN */}
        <section
          aria-labelledby="aeo-por-que-winfin"
          className="mt-10 rounded-3xl border border-slate-200/70 bg-white p-6 md:p-8"
        >
          <h3
            id="aeo-por-que-winfin"
            className="font-headline text-xl font-semibold tracking-[-0.02em] text-slate-950 md:text-2xl"
          >
            Por qué WINFIN es especialista
          </h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
            WINFIN no vende un kit estándar: cada instalación se{' '}
            <strong>diseña, calibra y valida</strong> específicamente para la
            geometría de cada vehículo y las condiciones reales de cada flota.
            Tres pilares lo diferencian:
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 md:p-5">
              <dt className="font-headline text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                +2.000
              </dt>
              <dd className="mt-1 text-sm text-slate-600 md:text-base">
                vehículos equipados en operación real en flotas profesionales.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 md:p-5">
              <dt className="font-headline text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                +20 años
              </dt>
              <dd className="mt-1 text-sm text-slate-600 md:text-base">
                de experiencia en instalaciones embarcadas e ingeniería de
                integración.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 md:p-5">
              <dt className="font-headline text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                2 talleres
              </dt>
              <dd className="mt-1 text-sm text-slate-600 md:text-base">
                propios en Madrid (Ciempozuelos) y Donostia / San Sebastián
                (Parque Tecnológico de Euskadi).
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-base leading-relaxed text-slate-700 md:text-lg">
            Cuando contactas con Vision360IA hablas con{' '}
            <strong>ingenieros de instalación, no con comerciales</strong>:
            cada flota recibe un análisis técnico previo del vehículo antes de
            cualquier propuesta, se diseña la instalación a medida, se ejecuta
            en taller propio y se valida sobre la operación real. Si tu flota
            no es buen encaje, lo decimos también.
          </p>
        </section>
      </div>
    </SectionWrapper>
  );
}
