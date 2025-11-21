'use client';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Check, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { useRef, useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

export function ProductShowcase({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.productsSection || initialTranslations.productsSection;
  const products = translations.products || initialTranslations.products;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [vimeoReady, setVimeoReady] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
  const modalPlayerRef = useRef<any>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const vimeoPlayers = useRef<any[]>([]);

  useEffect(() => {
    // Detectar preferencias
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Detectar conexión lenta
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      const isSlow = conn?.saveData || 
                     conn?.effectiveType === 'slow-2g' || 
                     conn?.effectiveType === '2g';
      setIsSlowConnection(isSlow);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    
    const newIndex = ((index % products.length) + products.length) % products.length;
    
    setCurrentSlide(newIndex);
    
    if (!prefersReducedMotion) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 340);
    }
    
    // Anunciar cambio para lectores de pantalla
    if (carouselRef.current) {
      const announcement = `Slide ${newIndex + 1} de ${products.length}: ${products[newIndex].name}`;
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'sr-only';
      liveRegion.textContent = announcement;
      document.body.appendChild(liveRegion);
      setTimeout(() => document.body.removeChild(liveRegion), 1000);
    }
  }, [isAnimating, products.length, products, prefersReducedMotion]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Soporte para swipe
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const deltaX = touchStartX.current - touchEndX.current;
      const threshold = 50;
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const transitionDuration = prefersReducedMotion ? '0ms' : (isMobile ? '300ms' : '320ms');
  const transitionTiming = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

  // Abrir modal de video
  const openVideo = (vimeoId: string) => {
    setOpenVideoModal(vimeoId);
    setLoadingVideo(true);
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal de video
  const closeVideo = useCallback(() => {
    if (modalPlayerRef.current) {
      modalPlayerRef.current.pause().catch(() => {});
      modalPlayerRef.current = null;
    }
    setOpenVideoModal(null);
    setLoadingVideo(false);
    // Restaurar scroll del body
    document.body.style.overflow = '';
  }, []);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openVideoModal) {
        closeVideo();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [openVideoModal, closeVideo]);

  return (
    <>
      {/* Cargar Vimeo Player API */}
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="lazyOnload"
        onLoad={() => setVimeoReady(true)}
      />
      
      <section 
        id="products" 
        className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white"
        aria-roledescription="carousel"
        aria-label="Carrusel de productos"
      >
        <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection animation="fade-in" delay={0.1}>
        {/* Carrusel */}
        <div 
          ref={carouselRef}
          className="relative max-w-7xl mx-auto"
        >
          {/* Contenedor de slides */}
          <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]">
            <div 
              className="flex transition-transform"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transitionDuration,
                transitionTimingFunction: transitionTiming,
              }}
            >
              {products.map((product, index) => {
                const isActive = index === currentSlide;
                const shouldLoad = Math.abs(index - currentSlide) <= 1;

                return (
                  <div
                    key={product.id}
                    className="min-w-full"
                    aria-hidden={!isActive}
                  >
                    <Card className="border-0 rounded-none shadow-none">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 min-h-[600px]">
                        {/* Video/Imagen */}
                        <div className="relative min-h-[300px] lg:min-h-full order-1 lg:order-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden border border-white/20">
                          {shouldLoad ? (
                            <>
                              {product.vimeoId && !isSlowConnection ? (
                                /* Thumbnail con botón play que abre modal */
                                <div 
                                  className="relative w-full h-full cursor-pointer group"
                                  onClick={() => product.vimeoId && openVideo(product.vimeoId)}
                                >
                                  {/* Thumbnail de fondo */}
                                  <Image
                                    src={product.videoPoster || product.image.imageUrl}
                                    alt={`${product.name} - Haz click para ver el video`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                  />
                                  
                                  {/* Overlay gradiente mejorado para legibilidad */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 group-hover:via-black/15 transition-all duration-500" />
                                  
                                  {/* Botón Play Premium 2025 - Glassmorphism */}
                                  <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <button
                                      aria-label={`Reproducir video: ${product.name}`}
                                      className="group/button relative"
                                    >
                                      {/* Halo animado sutil (no agresivo) */}
                                      <div className="absolute inset-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl animate-pulse-subtle pointer-events-none" />
                                      
                                      {/* Contenedor principal glassmorphism */}
                                      <div className="relative flex items-center gap-3 px-5 py-4 md:px-6 md:py-5 rounded-2xl backdrop-blur-2xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 shadow-[0_8px_32px_rgba(6,182,212,0.15)] transition-all duration-300 group-hover/button:scale-105 group-hover/button:bg-white/20 group-hover/button:shadow-[0_12px_48px_rgba(6,182,212,0.3)] group-hover/button:border-white/40">
                                        
                                        {/* Gradiente interno sutil */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                                        
                                        {/* Icono Play - Lucide style */}
                                        <svg 
                                          className="relative w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover/button:scale-110"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path d="M8 5.14v14l11-7-11-7z" />
                                        </svg>
                                        
                                        {/* Etiqueta "Demo" - Desktop */}
                                        <span className="hidden md:block relative text-white text-sm font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover/button:text-cyan-50">
                                          Demo
                                        </span>
                                      </div>
                                    </button>
                                  </div>
                                  
                                  {/* Texto descriptivo inferior */}
                                  <div className="absolute bottom-6 md:bottom-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-10">
                                    <p className="text-white text-xs md:text-sm font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4">
                                      Ver sistema ADAS en acción
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                /* Fallback a imagen si no hay video o conexión lenta */
                                <Image
                                  src={product.image.imageUrl}
                                  alt={product.image.description}
                                  fill
                                  className="object-cover"
                                  data-ai-hint={product.image.imageHint}
                                  priority={index === 0}
                                  loading={index === 0 ? 'eager' : 'lazy'}
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex flex-col justify-center p-8 md:p-12 lg:pl-0 bg-card order-2 lg:order-2">
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                              {t.eyebrow}
                            </span>
                          </div>
                          
                          <h3 className="mb-4 font-headline text-3xl lg:text-4xl font-bold text-primary">
                            {product.name}
                          </h3>
                          
                          <p className="mb-6 text-muted-foreground text-justify lg:text-lg">
                            {product.description}
                          </p>
                          
                          <ul className="mb-8 space-y-3">
                            {product.specs.slice(0, 5).map((spec) => (
                              <li key={spec} className="flex items-start gap-3">
                                <Check className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                                <span className="font-medium text-foreground text-sm">{spec}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <Button size="lg" className="w-full sm:w-fit group">
                            {t.addToCart}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flechas de navegación - Desktop */}
          {products.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                aria-label="Slide anterior"
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                aria-label="Siguiente slide"
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </>
          )}

          {/* Flechas de navegación - Mobile */}
          {products.length > 1 && (
            <div className="flex md:hidden justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                aria-label="Slide anterior"
                className="flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                aria-label="Siguiente slide"
                className="flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          )}

          {/* Indicadores de puntos */}
          {products.length > 1 && (
            <div 
              className="flex justify-center gap-2 mt-8"
              role="tablist"
              aria-label="Navegación de slides"
            >
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  role="tab"
                  aria-label={`Ir a slide ${index + 1}: ${product.name}`}
                  aria-selected={index === currentSlide}
                  aria-controls={`slide-${index}`}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed ${
                    index === currentSlide 
                      ? 'w-8 bg-primary shadow-lg' 
                      : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-125'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        </AnimatedSection>
        
        {/* Clase para lectores de pantalla */}
        <style jsx>{`
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `}</style>
      </div>
    </section>
      
      {/* Modal de Video */}
      <Dialog open={!!openVideoModal} onOpenChange={(open) => !open && closeVideo()}>
        <DialogContent className="max-w-5xl w-[90vw] p-0 bg-transparent border-0 shadow-none">
          {/* Título oculto para accesibilidad */}
          <DialogTitle className="sr-only">Demo Vision360IA - Sistema ADAS</DialogTitle>
          
          {/* Frame elegante con padding alrededor del video */}
          <div className="relative bg-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl">
            {/* Botón cerrar dentro del frame */}
            <button
              onClick={closeVideo}
              aria-label="Cerrar video"
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <X className="w-5 h-5 text-white drop-shadow-lg" />
            </button>
            
            {/* Contenedor del video con aspect ratio 16:9 */}
            <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
              {openVideoModal && (
                <>
                  <iframe
                    ref={(el) => {
                      if (el && vimeoReady && !modalPlayerRef.current) {
                        if (typeof window !== 'undefined' && (window as any).Vimeo) {
                          const player = new (window as any).Vimeo.Player(el);
                          modalPlayerRef.current = player;
                          player.setVolume(1);
                          player.on('loaded', () => setLoadingVideo(false));
                        }
                      }
                    }}
                    src={`https://player.vimeo.com/video/${openVideoModal}?autoplay=1&loop=0&byline=0&title=0&portrait=0`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Demo Vision360IA"
                  />
                  
                  {/* Loading spinner */}
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
