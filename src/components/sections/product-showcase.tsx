'use client';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { useRef, useEffect, useState, useCallback } from 'react';

export function ProductShowcase({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.productsSection || initialTranslations.productsSection;
  const products = translations.products || initialTranslations.products;
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detectar preferencias
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
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

  return (
    <section 
      id="products" 
      className="py-16 md:py-24 bg-background"
      aria-roledescription="carousel"
      aria-label="Carrusel de productos"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Carrusel */}
        <div 
          ref={carouselRef}
          className="relative max-w-7xl mx-auto"
        >
          {/* Contenedor de slides */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Imagen */}
                        <div className="relative min-h-[300px] lg:min-h-full order-1 lg:order-1">
                          {shouldLoad ? (
                            <Image
                              src={product.image.imageUrl}
                              alt={product.image.description}
                              fill
                              className="object-cover"
                              data-ai-hint={product.image.imageHint}
                              priority={index === 0}
                              loading={index === 0 ? 'eager' : 'lazy'}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted" />
                          )}
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex flex-col justify-center p-8 md:p-12 bg-card order-2 lg:order-2">
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
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                aria-label="Siguiente slide"
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
      </div>

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
    </section>
  );
}
