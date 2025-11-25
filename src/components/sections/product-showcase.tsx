'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { PlayCircle, Check, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

interface VideoCardProps {
  vimeoId: string;
  thumbnail: string;
  onVideoClick: (vimeoId: string) => void;
}

function VideoCard({ vimeoId, thumbnail, onVideoClick }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group
                 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30
                 ring-2 ring-transparent hover:ring-cyan-400/40
                 hover:-translate-y-2
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
      aria-label="Ver demo del producto"
    >
      <Image
        src={thumbnail}
        alt="Demo del producto"
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 500px"
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
        isHovered ? 'opacity-90' : 'opacity-60'
      }`} />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`transition-all duration-300 ease-out ${
          isHovered ? 'scale-125' : 'scale-100'
        }`}>
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/15 to-white/10 border border-white/40 shadow-[0_8px_32px_rgba(6,182,212,0.15)] group-hover:shadow-[0_12px_48px_rgba(6,182,212,0.45)] group-hover:border-cyan-300/60 transition-all duration-300">
            <PlayCircle className="w-8 h-8 text-white drop-shadow-lg group-hover:text-cyan-300 transition-colors duration-300" />
            <span className="text-white text-sm font-semibold tracking-wide drop-shadow-lg group-hover:text-cyan-50 transition-colors duration-300">
              Ver Demo
            </span>
          </div>
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
  
  // Datos de los videos con IDs reales de Vimeo
  const videoCards = [
    {
      vimeoId: (Array.isArray(products) ? products[0]?.vimeoId : undefined) || '1133755711',
      thumbnail: (Array.isArray(products) ? products[0]?.videoPoster : undefined) || '/images/winfin_vision360ia_1.jpg',
    },
    {
      vimeoId: (Array.isArray(products) ? products[1]?.vimeoId : undefined) || '1133755727',
      thumbnail: (Array.isArray(products) ? products[1]?.videoPoster : undefined) || '/images/winfin_vision360ia_2.jpg',
    },
    {
      vimeoId: (Array.isArray(products) ? products[2]?.vimeoId : undefined) || '1133755748',
      thumbnail: (Array.isArray(products) ? products[2]?.videoPoster : undefined) || '/images/winfin_vision360ia_3.jpg',
    },
  ];
  
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
                  <span className="text-sm font-semibold text-primary">{t?.badge}</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {t?.mainTitle}
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {t?.mainDescription}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {(t?.features || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" size="lg" className="group">
                  {t?.viewAllCases}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </AnimatedSection>
            
            {/* Videos en columna simple */}
            <AnimatedSection animation="slide-up" delay={0.2}>
              <div className="space-y-6 max-w-lg mx-auto">
                {videoCards.map((card, index) => (
                  <VideoCard
                    key={index}
                    vimeoId={card.vimeoId}
                    thumbnail={card.thumbnail}
                    onVideoClick={openVideo}
                  />
                ))}
              </div>
            </AnimatedSection>
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
