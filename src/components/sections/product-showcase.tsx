'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { PlayCircle, Check, ArrowRight, X, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

interface VideoCardProps {
  vimeoId: string;
  thumbnail: string;
  productName: string;
  tag: string;
  summary: string;
  metric: string;
  onVideoClick: (vimeoId: string) => void;
}

function VideoCard({ vimeoId, thumbnail, productName, tag, summary, metric, onVideoClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="group relative w-full overflow-hidden rounded-[1.75rem] border border-white/60 elevated-card cursor-pointer
                 hover:shadow-[var(--shadow-strong)] hover:-translate-y-2
                 transition-all duration-300 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick(vimeoId)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onVideoClick(vimeoId);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver demo de ${productName}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-[1.4rem]">
        <Image
          src={thumbnail}
          alt={`Demo de ${productName} - Sistema ADAS Vision360IA`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
          quality={85}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/25 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-95' : 'opacity-78'
        }`} />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
          {tag}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">{metric}</div>
            <div className="mt-1 max-w-[18rem] text-lg font-semibold leading-tight text-white" style={{ whiteSpace: 'pre-line' }}>{productName}</div>
          </div>
          <div className={`flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 backdrop-blur-2xl shadow-[0_8px_32px_rgba(6,182,212,0.15)] transition-all duration-300 ${
            isHovered ? 'scale-105 border-cyan-300/60 shadow-[0_12px_48px_rgba(6,182,212,0.4)]' : ''
          }`}>
            <PlayCircle className="h-7 w-7 text-white transition-colors duration-300 group-hover:text-cyan-300" />
            <span className="text-sm font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-cyan-50">
              Ver Demo
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-5 md:p-6">
        <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
          {summary}
        </p>
      </div>
    </div>
  );
}

export function ProductShowcase({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations?.productsSection || initialTranslations?.productsSection || {};
  const products = translations?.products || initialTranslations?.products || {};
  const architectureItems = [
    {
      title: 'Camara inteligente',
      eyebrow: 'Captacion y deteccion',
      modalDescription: 'Camara 1080P con sensor CMOS 1/2.9, optica de mas de 170° y vision nocturna de 3 a 5 metros, diseñada para captacion perimetral en maniobras criticas y operacion exterior exigente.',
      modalSpecs: '1080P • CMOS 1/2.9 • >170° • IP69K • ISO 16750-3 • -20°C a +70°C',
      image: '/images/producto/detalle_camara_vision360.jpg',
      alt: 'Despiece tecnico de la camara Vision360 con lente, iluminacion infrarroja, sensor y carcasa.',
    },
    {
      title: 'Unidad central',
      eyebrow: 'Procesamiento y conectividad',
      modalDescription: 'Unidad basada en ARM Cortex-A7 dual core con IA integrada y capacidad aproximada de 2 TOPS, preparada para gestionar hasta 6 camaras 1080P, visualizacion panoramica 2D/3D, codificacion H.264, almacenamiento ampliable y conectividad 4G, WiFi y GPS para operacion conectada de flota.',
      modalSpecs: 'ARM Cortex-A7 • 2 TOPS • hasta 6 camaras • H.264 • 4G/WiFi/GPS • 8-32V',
      image: '/images/producto/detalle_cpu_vision360.jpg',
      alt: 'Despiece tecnico de la unidad central Vision360 con placa principal, conectores, almacenamiento y cableado.',
    },
    {
      title: 'Monitor embarcado',
      eyebrow: 'Interfaz en cabina',
      modalDescription: 'Monitor tactil capacitivo de 1024x600 con brillo de 600 cd/m², visualizacion de hasta 4 camaras simultaneas y triggers de activacion automatica para presentar al conductor la informacion relevante en cada maniobra sin añadir complejidad operativa.',
      modalSpecs: '1024x600 • 4 camaras • tactil capacitivo • 600 cd/m² • 10-32V',
      image: '/images/producto/detalle_monitor_vision360.jpg',
      alt: 'Despiece tecnico del monitor Vision360 con pantalla, carcasa, soporte y mando de control.',
    },
    {
      title: 'Cableado y conexion',
      eyebrow: 'Robustez de instalacion',
      modalDescription: 'Cableado automotriz de 4 pines con conductor de cobre puro, compatible con señal AHD y CVBS, preparado para alimentacion de 12 a 24V y para entornos de trabajo con vibracion, suciedad y exigencia termica continua.',
      modalSpecs: '4 pines • cobre puro • AHD/CVBS • 12-24V • -20°C a +80°C',
      image: '/images/producto/detalle_manguera_vision360.jpg',
      alt: 'Detalle tecnico del cableado Vision360 con conectores circulares, recubrimiento y esquema de conexion.',
    },
  ];
  
  const [openVideoModal, setOpenVideoModal] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [selectedArchitectureIndex, setSelectedArchitectureIndex] = useState<number | null>(null);
  const selectedArchitectureItem = selectedArchitectureIndex !== null ? architectureItems[selectedArchitectureIndex] : null;
  
  const openVideo = useCallback((vimeoId: string) => {
    if (!vimeoId) return;
    setOpenVideoModal(vimeoId);
    setLoadingVideo(true);
    
    setTimeout(() => {
      setLoadingVideo(false);
    }, 3000);
    
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeVideo = useCallback(() => {
    setOpenVideoModal(null);
    setLoadingVideo(false);
    document.body.style.overflow = '';
  }, []);

  const openArchitectureDetail = useCallback((index: number) => {
    setSelectedArchitectureIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeArchitectureDetail = useCallback(() => {
    setSelectedArchitectureIndex(null);
    document.body.style.overflow = '';
  }, []);

  
  // Datos de los videos con IDs reales de Vimeo
  const videoCards = [
    {
      vimeoId: (Array.isArray(products) ? products[0]?.vimeoId : undefined) || '1133755711',
      thumbnail: (Array.isArray(products) ? products[0]?.videoPoster : undefined) || '/images/winfin_vision360ia_1.jpg',
      productName: (Array.isArray(products) ? products[0]?.name : undefined) || 'Calculo de distancias en tiempo real',
      tag: (Array.isArray(products) ? products[0]?.demoTag : undefined) || 'Visión 360°',
      summary: (Array.isArray(products) ? products[0]?.demoSummary : undefined) || 'Detección de vehículos y cálculo de distancia con ADAS 360°. Vista frontal y cenital del vehículo con análisis en tiempo real.',
      metric: 'Caso 01',
    },
    {
      vimeoId: (Array.isArray(products) ? products[1]?.vimeoId : undefined) || '1133755727',
      thumbnail: (Array.isArray(products) ? products[1]?.videoPoster : undefined) || '/images/winfin_vision360ia_2.jpg',
      productName: (Array.isArray(products) ? products[1]?.name : undefined) || 'ADAS anti-atropellos con detección de peatones y ciclistas',
      tag: (Array.isArray(products) ? products[1]?.demoTag : undefined) || 'Protección VRU',
      summary: (Array.isArray(products) ? products[1]?.demoSummary : undefined) || 'Alertas anticipadas con IA para prevenir atropellos y reducir exposición al siniestro en ciudad.',
      metric: 'Caso 02',
    },
    {
      vimeoId: (Array.isArray(products) ? products[2]?.vimeoId : undefined) || '1133755748',
      thumbnail: (Array.isArray(products) ? products[2]?.videoPoster : undefined) || '/images/winfin_vision360ia_3.jpg',
      productName: (Array.isArray(products) ? products[2]?.name : undefined) || 'Analítica de flota para reducir riesgo y mejorar operación',
      tag: (Array.isArray(products) ? products[2]?.demoTag : undefined) || 'Analítica',
      summary: (Array.isArray(products) ? products[2]?.demoSummary : undefined) || 'Eventos, vídeo y patrones de conducción convertidos en decisiones para seguridad, mantenimiento y eficiencia.',
      metric: 'Caso 03',
    },
  ];
  
  return (
    <>
      <SectionWrapper id="productos" className="overflow-hidden bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow={t?.eyebrow || 'Nuestras Soluciones'}
            title={t?.title || 'Productos'}
            description={t?.description || 'Descubre nuestra gama de soluciones de seguridad'}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto mt-16">
            
            <AnimatedSection animation="slide-up" className="space-y-8">
              <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
                <div className="mb-6 inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2">
                  <span className="text-sm font-semibold text-primary">{t?.demoEvidenceBadge || 'Prueba real en calle'}</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t?.demoEvidenceTitle || 'Funcionamiento real en vehículo industrial en Madrid'}
                </h2>

                <div className="mb-8 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 p-4 md:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Grabado en operacion real
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    {t?.demoEvidenceDescription || 'Vídeos reales de funcionamiento en vehículo industrial, grabados en calle en Madrid. No son renders, simulaciones ni piezas de fabricante: muestran uso real en operación.'}
                  </p>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {(t?.features || []).map((item, idx) => (
                    <li key={idx} className="interactive-tile flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-8 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">360°</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Cobertura</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">IA</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Predicción</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">24/7</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">Operación</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Videos en columna simple */}
            <AnimatedSection animation="slide-up" delay={0.2}>
              <div className="mx-auto grid max-w-2xl gap-6">
                {videoCards.map((card, index) => (
                  <AnimatedSection key={index} animation="slide-up" delay={0.28 + index * 0.08}>
                    <VideoCard
                      vimeoId={card.vimeoId}
                      thumbnail={card.thumbnail}
                      productName={card.productName}
                      tag={card.tag}
                      summary={card.summary}
                      metric={card.metric}
                      onVideoClick={openVideo}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection animation="slide-up" delay={0.24} className="mx-auto mt-16 max-w-7xl">
            <div className="overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.92))] p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8 lg:p-10">
              <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary md:text-xs">
                  Arquitectura del sistema
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl lg:text-[2.8rem] lg:leading-[1.02]">
                  Hardware embarcado y arquitectura real para operaciones de flota exigentes.
                </h3>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                  Camaras, procesamiento, visualizacion y cableado forman un sistema integrado para autobuses, camiones, maquinaria y vehiculos especiales que requieren vision perimetral, conectividad estable y resistencia en servicio.
                </p>

                <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-center shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                    <div className="text-2xl font-bold tracking-[-0.04em] text-slate-950">4</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">Piezas clave</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-center shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                    <div className="text-2xl font-bold tracking-[-0.04em] text-slate-950">IR + IA</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">Deteccion embarcada</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {architectureItems.map((item, index) => (
                  <AnimatedSection
                    key={item.title}
                    animation="slide-up"
                    delay={0.3 + index * 0.06}
                    as="article"
                    className="h-full"
                  >
                    <div className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]">
                      <button
                        type="button"
                        onClick={() => openArchitectureDetail(index)}
                        className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,rgba(248,250,252,0.92),rgba(255,255,255,0.98))] text-left"
                        aria-label={`Ampliar detalle tecnico de ${item.title}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/88 text-slate-600 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                          <Maximize2 className="h-4 w-4" />
                        </div>
                      </button>

                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                          {item.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => openArchitectureDetail(index)}
                          className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
                        >
                          <span>Ver detalle tecnico</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </SectionWrapper>
      
      {/* Modal de Video */}
      <Dialog open={!!openVideoModal} onOpenChange={(open) => !open && closeVideo()}>
        <DialogContent className="max-w-5xl w-[90vw] p-0 bg-transparent border-0 shadow-none">
          <DialogTitle className="sr-only">Demo Vision360IA - Sistema ADAS</DialogTitle>
          
          <div className="relative bg-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl">
            <button
              onClick={closeVideo}
              aria-label="Cerrar video"
              className="absolute -top-2 -right-2 md:top-4 md:right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-slate-900" />
            </button>
            
            <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
              {openVideoModal && (
                <>
                  <iframe
                    src={`https://player.vimeo.com/video/${openVideoModal}?autoplay=1&loop=0&byline=0&title=0&portrait=0`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Demo Vision360IA"
                    onLoad={() => {
                      setTimeout(() => setLoadingVideo(false), 2000);
                    }}
                  />
                  
                  {loadingVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                        <p className="text-white text-sm font-medium">Cargando video...</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedArchitectureItem} onOpenChange={(open) => !open && closeArchitectureDetail()}>
        <DialogContent className="w-[96vw] max-w-7xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {selectedArchitectureItem ? `Detalle tecnico de ${selectedArchitectureItem.title}` : 'Detalle tecnico del producto'}
          </DialogTitle>

          {selectedArchitectureItem && (
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
              <button
                type="button"
                onClick={closeArchitectureDetail}
                aria-label="Cerrar detalle tecnico"
                className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/16"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.38fr]">
                <div className="relative flex min-h-[60vh] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.16),rgba(15,23,42,0.96)_58%)] p-4 md:p-6 lg:min-h-[82vh] lg:p-8">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]">
                    <div className="relative h-[60vh] w-full lg:h-[82vh]">
                      <Image
                        src={selectedArchitectureItem.image}
                        alt={selectedArchitectureItem.alt}
                        fill
                        sizes="96vw"
                        className="object-contain object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t border-white/10 bg-slate-950/96 p-5 text-white lg:border-l lg:border-t-0 lg:p-7">
                  <div>
                    <div className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-200/84">
                      {selectedArchitectureItem.eyebrow}
                    </div>
                    <h4 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white lg:text-[2rem]">
                      {selectedArchitectureItem.title}
                    </h4>
                    <p className="mt-4 text-sm leading-7 text-white/74 md:text-base">
                      {selectedArchitectureItem.modalDescription}
                    </p>
                    <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        Microdatos tecnicos
                      </div>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/72 md:text-[13px]">
                        {selectedArchitectureItem.modalSpecs}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-6 text-white/42">
                    Imagen tecnica orientativa. La configuracion, componentes y acabados pueden variar segun version del sistema, integracion y tipologia de vehiculo.
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={closeArchitectureDetail}
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/16"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
