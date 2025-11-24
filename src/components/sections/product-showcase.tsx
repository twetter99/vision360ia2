'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { PlayCircle, Check, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  vimeoId: string;
  thumbnail: string;
  tag: string;
  position: number; // 0 = front, 1 = middle, 2 = back
  onVideoClick: (vimeoId: string) => void;
}

function VideoCard({ id, title, description, vimeoId, thumbnail, tag, position, onVideoClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Configuración de posiciones para las cartas
  const positionConfig = [
    { scale: 1, opacity: 1, zIndex: 30, translateY: 0, translateX: 0 }, // Frontal
    { scale: 0.94, opacity: 0.95, zIndex: 20, translateY: 25, translateX: 40 }, // Media
    { scale: 0.88, opacity: 0.9, zIndex: 10, translateY: 50, translateX: 80 }, // Trasera
  ];
  
  const config = positionConfig[position] || positionConfig[2];
  
  return (
    <div
      className="absolute top-0 left-0 transition-all duration-500 ease-out cursor-pointer"
      style={{
        width: 'calc(100% - 80px)',
        height: 'calc(100% - 60px)',
        transform: `scale(${config.scale}) translateY(${config.translateY}px) translateX(${config.translateX}px)`,
        opacity: config.opacity,
        zIndex: isHovered ? 40 : config.zIndex,
      }}
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
      aria-label={`Ver demo: ${title}`}
    >
      <div 
        className={`relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 bg-white transition-all duration-500 ${
          isHovered 
            ? 'shadow-2xl shadow-primary/20 scale-[1.02] -translate-y-1 -translate-x-1' 
            : 'shadow-xl'
        }`}
      >
        <div className="relative h-[70%]">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={position === 0}
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-80' : 'opacity-60'
          }`} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transition-all duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}>
              <div className="relative flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 shadow-[0_8px_32px_rgba(6,182,212,0.15)]">
                <PlayCircle className="w-8 h-8 text-white drop-shadow-lg" />
                <span className="text-white text-sm font-semibold tracking-wide drop-shadow-lg">
                  Ver Demo
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-white p-6 flex flex-col justify-center">
          <span className="inline-block w-fit px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
            {tag}
          </span>
          
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-slate-600 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations?.productsSection || initialTranslations?.productsSection || {};
  const products = translations?.products || initialTranslations?.products || {};
  
  const [openVideoModal, setOpenVideoModal] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Auto-rotar las cartas cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const openVideo = useCallback((vimeoId: string) => {
    if (!vimeoId) return; // No abrir si no hay ID de video
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
  
  const rotateCards = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentCardIndex((prev) => (prev + 1) % 3);
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + 3) % 3);
    }
  }, []);
  
  const goToCard = useCallback((index: number) => {
    setCurrentCardIndex(index);
  }, []);
  
  // Datos de los videos con IDs reales de Vimeo
  const videoCards = [
    {
      id: 'prod1',
      title: (Array.isArray(products) ? products[0]?.name : undefined) || 'Sistema de Visión 360°',
      description: ((Array.isArray(products) ? products[0]?.description : undefined)?.slice(0, 150) || 'Sistema de cámaras con visión completa del vehículo') + '...',
      vimeoId: (Array.isArray(products) ? products[0]?.vimeoId : undefined) || '1133755711',
      thumbnail: (Array.isArray(products) ? products[0]?.videoPoster : undefined) || '/images/winfin_Vision360ia_1.jpg',
      tag: 'Sistema 360',
    },
    {
      id: 'prod2',
      title: (Array.isArray(products) ? products[1]?.name : undefined) || 'Sistema de Alertas ADAS',
      description: ((Array.isArray(products) ? products[1]?.description : undefined)?.slice(0, 150) || 'Alertas inteligentes de seguridad para prevención de accidentes') + '...',
      vimeoId: (Array.isArray(products) ? products[1]?.vimeoId : undefined) || '1133755727',
      thumbnail: (Array.isArray(products) ? products[1]?.videoPoster : undefined) || '/images/winfin_Vision360ia_2.jpg',
      tag: 'Alertas ADAS',
    },
    {
      id: 'prod3',
      title: (Array.isArray(products) ? products[2]?.name : undefined) || 'Análisis con IA',
      description: ((Array.isArray(products) ? products[2]?.description : undefined)?.slice(0, 150) || 'Análisis predictivo y detección inteligente de riesgos') + '...',
      vimeoId: (Array.isArray(products) ? products[2]?.vimeoId : undefined) || '1133755748',
      thumbnail: (Array.isArray(products) ? products[2]?.videoPoster : undefined) || '/images/winfin_Vision360ia_3.jpg',
      tag: 'Análisis IA',
    },
  ];
  
  // Calcular la posición de cada carta basado en el índice actual
  const getCardPosition = (cardIndex: number) => {
    return (cardIndex - currentCardIndex + 3) % 3;
  };
  
  return (
    <>
      <SectionWrapper id="productos" className="bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            eyebrow={t?.eyebrow || 'Nuestras Soluciones'}
            title={t?.title || 'Productos'}
            description={t?.description || 'Descubre nuestra gama de soluciones de seguridad'}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-7xl mx-auto mt-16">
            
            <AnimatedSection animation="slide-up" className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <span className="text-sm font-semibold text-primary">Análisis IA en acción</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Tecnología que protege tu flota
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Tres pilares de seguridad integrados en un solo ecosistema: visión completa, alertas inteligentes y análisis predictivo.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    'Cámaras 360 con eliminación de puntos ciegos',
                    'IA que detecta riesgos antes de que ocurran',
                    'Análisis de conducción para reducir costes',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="lg" className="group">
                  Ver todos los casos de uso
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </AnimatedSection>
            
            {/* Desktop: Cartas apiladas con navegación */}
            <AnimatedSection animation="slide-up" delay={0.2} className="hidden lg:block">
              <div className="relative">
                {/* Contenedor de cartas con padding para visibilidad */}
                <div className="relative w-full aspect-[3/4] max-w-lg mx-auto pr-20 pb-16">
                  {/* Botones de navegación */}
                  <button
                    onClick={() => rotateCards('prev')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Carta anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => rotateCards('next')}
                    className="absolute right-16 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Siguiente carta"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                  
                  {/* Cartas apiladas */}
                  {videoCards.map((card, index) => (
                    <VideoCard
                      key={card.id}
                      {...card}
                      position={getCardPosition(index)}
                      onVideoClick={openVideo}
                    />
                  ))}
                </div>
                
                {/* Indicadores de puntos */}
                <div className="flex justify-center gap-2 mt-4">
                  {videoCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`transition-all duration-300 ${
                        index === currentCardIndex
                          ? 'w-8 h-2 bg-primary rounded-full'
                          : 'w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400'
                      }`}
                      aria-label={`Ir a carta ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            {/* Mobile: Vista en lista vertical */}
            <div className="lg:hidden space-y-6">
              {videoCards.map((card) => (
                <AnimatedSection key={card.id} animation="slide-up">
                  <div
                    className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                    onClick={() => openVideo(card.vimeoId)}
                  >
                    <div className="relative h-[65%]">
                      <Image
                        src={card.thumbnail}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-5 py-3 rounded-2xl backdrop-blur-2xl bg-white/15 border border-white/30">
                          <PlayCircle className="w-7 h-7 text-white" />
                          <span className="text-white text-sm font-semibold">Ver Demo</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-5">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-2">
                        {card.tag}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
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
    </>
  );
}
