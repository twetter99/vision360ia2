'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/shared/animated-section';
import { SectionHeading } from '@/components/shared/section-heading';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const solutions = [
  {
    title: 'ADAS Autobuses',
    description: 'Vision 360 y deteccion de peatones para seguridad de flotas en autobuses urbanos.',
    riskTitle: 'Riesgo operativo',
    risk: 'Giros urbanos, paradas frecuentes y cruce constante de peatones y ciclistas en maniobras de baja velocidad.',
    implementationTitle: 'Implantacion',
    implementation: 'Se adapta a longitud, puertas, zonas de parada y geometria del autobus para validar cobertura antes del despliegue en flota.',
    href: '/adas-autobuses',
    image: '/images/adas_bus.png',
    accent: 'from-sky-500 to-blue-600',
    badge: 'Autobuses',
  },
  {
    title: 'ADAS Camiones',
    description: 'ADAS para camiones con vision 360 y prevencion de maniobras de riesgo.',
    riskTitle: 'Riesgo operativo',
    risk: 'Puntos ciegos de gran tamaño, giros urbanos, marcha atras y accesos a muelle con geometria variable.',
    implementationTitle: 'Implantacion',
    implementation: 'La arquitectura cambia segun rigido, tractora o articulado y se calibra sobre maniobras reales de ciudad y entorno logistico.',
    href: '/adas-camiones',
    image: '/images/adas_camion.png',
    accent: 'from-indigo-500 to-sky-500',
    badge: 'Camiones',
  },
  {
    title: 'Autocares y Minibuses',
    description: 'Vision 360 y proteccion VRU para lanzaderas, escolares y servicios de viajeros con maniobras criticas.',
    riskTitle: 'Riesgo operativo',
    risk: 'Paradas en colegios, hoteles, terminales y aeropuerto con peatones alrededor y accesos estrechos.',
    implementationTitle: 'Implantacion',
    implementation: 'Se define segun longitud del vehiculo, tipo de servicio y entorno de parada para no tratarlo como un autobus urbano generico.',
    href: '/adas-autocares-minibuses',
    image: '/images/adas_bus.png',
    accent: 'from-cyan-500 to-sky-600',
    badge: 'Viajeros',
  },
  {
    title: 'Vehiculos Industriales',
    description: 'ADAS vehiculos industriales para control perimetral y seguridad en maniobra.',
    riskTitle: 'Riesgo operativo',
    risk: 'Interaccion persona-maquina, visibilidad irregular y maniobras en obra, nave o patio industrial.',
    implementationTitle: 'Implantacion',
    implementation: 'Se diseña con fijaciones, cableado y calibracion preparados para vibracion, suciedad, agua a presion y geometria irregular.',
    href: '/vision-360-vehiculos-industriales',
    image: '/images/adas_vi.png',
    accent: 'from-amber-400 to-orange-500',
    badge: 'Industrial',
  },
  {
    title: 'Recogida de Residuos',
    description: 'Deteccion de peatones y seguridad de flotas para operacion RSU en ciudad.',
    riskTitle: 'Riesgo operativo',
    risk: 'Operarios alrededor del vehiculo, maniobras lentas, marcha atras y visibilidad cambiante en cada parada.',
    implementationTitle: 'Implantacion',
    implementation: 'La cobertura se ajusta a carrozado, zonas de operario y maniobra real para validar seguridad antes del despliegue masivo.',
    href: '/adas-vehiculos-recogida-residuos',
    image: '/images/adas_rs.png',
    accent: 'from-emerald-500 to-green-600',
    badge: 'RSU',
  },
  {
    title: 'Furgonetas de Reparto',
    description: 'Vision 360, camaras e inteligencia para mejorar seguridad de flotas y control operativo.',
    riskTitle: 'Riesgo operativo',
    risk: 'Carga y descarga continua, doble fila, maniobras rapidas y calle estrecha en ultima milla.',
    implementationTitle: 'Implantacion',
    implementation: 'Se priorizan angulos de proximidad, eventos utiles y configuracion ligera para reparto urbano de alta repeticion.',
    href: '/adas-furgonetas-reparto',
    image: '/images/adas_vans.jpg',
    accent: 'from-violet-500 to-fuchsia-500',
    badge: 'Furgonetas',
  },
];

export function Solutions() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const scrollActiveTabIntoView = useCallback(() => {
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const tab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, []);

  useEffect(() => {
    scrollActiveTabIntoView();
  }, [activeTab, scrollActiveTabIntoView]);

  const solution = solutions[activeTab];
  const isReversed = activeTab % 2 === 1;
  const sequence = String(activeTab + 1).padStart(2, '0');

  return (
    <SectionWrapper id="solutions" className="section-band section-band-glow">
      <SectionHeading
        eyebrow="SOLUCIONES"
        title="Soluciones ADAS con inteligencia artificial para flotas"
      />

      <div className="mx-auto mt-16 max-w-7xl">
        <div className="mb-5 flex flex-col items-start gap-2 px-4 sm:items-center sm:px-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:text-center">
            Selecciona tu tipo de flota
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-center md:text-[15px]">
            Cada tipologia exige una implantacion distinta. Accede a la solucion especifica para autobuses, camiones, viajeros, industria, RSU o reparto.
          </p>
        </div>

        {/* Tab bar */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Soluciones disponibles"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {solutions.map((sol, index) => (
            <button
              key={sol.href}
              ref={index === activeTab ? activeTabRef : undefined}
              role="tab"
              aria-selected={index === activeTab}
              aria-controls="solutions-panel"
              onClick={() => setActiveTab(index)}
              className={cn(
                'relative shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300',
                index === activeTab
                  ? 'border-slate-900 bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.14)]'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]'
              )}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300',
                    index === activeTab ? `bg-gradient-to-r ${sol.accent}` : 'bg-slate-300'
                  )}
                />
                <span>{sol.badge}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div id="solutions-panel" role="tabpanel" aria-label={solution.title} className="mt-10 md:mt-14">
          <AnimatedSection key={activeTab} animation="fade-in">
            <article
              className="group relative grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-0 xl:gap-x-20"
            >
              <div
                className={cn(
                  'lg:col-span-7',
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                )}
              >
                <div className="relative isolate">
                  <div className={`pointer-events-none absolute left-[10%] top-[8%] h-32 w-32 rounded-full bg-gradient-to-br ${solution.accent} opacity-20 blur-3xl md:h-40 md:w-40 lg:h-52 lg:w-52`} />
                  <div className={`pointer-events-none absolute bottom-[8%] right-[8%] h-36 w-36 rounded-full bg-gradient-to-br ${solution.accent} opacity-15 blur-3xl md:h-44 md:w-44 lg:h-56 lg:w-56`} />
                  <div className="relative aspect-[16/11] w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
                    <div className="pointer-events-none absolute inset-x-[14%] top-[16%] h-24 rounded-full bg-white/70 blur-3xl md:h-28" />
                    <div className="pointer-events-none absolute inset-x-[18%] bottom-[14%] h-24 rounded-full bg-slate-300/20 blur-3xl md:h-28" />
                    <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      width={720}
                      height={520}
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 88vw, 54vw"
                      className="relative h-auto max-h-[440px] w-full max-w-[720px] object-contain drop-shadow-[0_34px_58px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'lg:col-span-5',
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                )}
              >
                <div className="max-w-xl lg:max-w-[30rem]">
                  <div className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 md:text-xs">
                    <span className="text-slate-400">{sequence}</span>
                    <span className="h-px w-10 bg-slate-300" />
                    <span>{solution.badge}</span>
                  </div>

                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-slate-950 md:text-4xl lg:text-[3.1rem] lg:leading-[0.98]">
                    {solution.title}
                  </h3>

                  <p className="mt-6 max-w-[32rem] text-base leading-relaxed text-slate-600 md:text-lg lg:text-[1.15rem] lg:leading-8">
                    {solution.description}
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 md:p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {solution.riskTitle}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
                        {solution.risk}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4 md:p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {solution.implementationTitle}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
                        {solution.implementation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <Link
                      href={solution.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
                    >
                      <span>Ver solucion</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </SectionWrapper>
  );
}