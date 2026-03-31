'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { heroData } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { TypewriterRotator } from '@/components/shared/typewriter-text';

export function Hero({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.hero || initialTranslations.hero;
  const heroImage = heroData.image;
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    // Optimización de rendimiento: throttling con requestAnimationFrame
    // Reduce llamadas a setState de ~60/s a ~16-30/s, sincronizado con el navegador
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const fadeThreshold = heroHeight * 0.9;
  const opacity = scrollY < fadeThreshold ? 1 : Math.max(0, 1 - (scrollY - fadeThreshold) / 400);
  const blur = scrollY < fadeThreshold ? 0 : Math.min(10, (scrollY - fadeThreshold) / 50);
  const parallaxY = scrollY < fadeThreshold ? scrollY * 0.5 : fadeThreshold * 0.5;
  const heroLines = [
    'Vision 360° con IA',
    'ADAS para vehiculos industriales',
    'Deteccion de peatones con IA',
    'Eliminacion de puntos ciegos',
    'Menos incidentes, mas control',
  ];

  return (
    <section 
      className="relative w-full flex flex-col justify-center items-center overflow-hidden"
      style={{ 
        minHeight: '100vh',
        paddingTop: 'calc(6.5rem + env(safe-area-inset-top))',
        paddingBottom: 'max(3.25rem, calc(2.5rem + env(safe-area-inset-bottom)))'
      }}
    >
      <div className="absolute inset-0 overflow-hidden hero-grid" style={{ transform: `translateY(${parallaxY}px)` }}>
        <Image
          src={heroImage.imageUrl}
          alt="Autobus urbano con sistema ADAS, deteccion de peatones y ciclistas y vision perimetral 360 de Vision360IA"
          fill
          className="object-cover object-[52%_50%] scale-[1.24] sm:object-[52%_50%] sm:scale-[1.14] md:object-center md:scale-[1.06] lg:scale-[1.02] xl:scale-100"
          data-ai-hint={heroImage.imageHint}
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgICAgMBAAAAAAAAAAAAAQIDBAARBQYhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwDPendbhqVhZLM9hwJI4yCqxIRv9z+Y2+cxjCdqrJi4A5P/2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/84 via-slate-950/34 to-slate-950/48" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/42 to-slate-950/26" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(56,189,248,0.12),rgba(15,23,42,0.12)_28%,rgba(15,23,42,0.56)_100%)]" />
        <div className="absolute left-0 top-0 h-[44%] w-[86%] bg-[radial-gradient(circle_at_top_left,rgba(2,6,23,0.88),rgba(2,6,23,0.76)_32%,rgba(2,6,23,0.34)_62%,rgba(2,6,23,0)_100%)] md:h-[34%] md:w-[48%]" />
        <div className="hero-mesh absolute inset-0 opacity-55" />
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-[14%] right-[12%] h-48 w-48 rounded-full bg-sky-300/10 blur-3xl" />
      </div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        <div 
          className="container max-w-7xl px-6 w-full" 
          style={{
            opacity: opacity > 0.95 ? 1 : opacity,
            filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
          }}
        >
          {/* H1 semántico oculto para SEO — visible para crawlers y screen readers */}
          <h1 className="sr-only">{t.title}</h1>

          <div className="mx-auto max-w-6xl">
            <div className="max-w-[20rem] px-4 py-6 text-left sm:max-w-[28rem] sm:px-6 sm:py-8 md:max-w-[36rem] lg:max-w-[54rem] lg:px-0 lg:py-0">
              <div className="max-w-[18rem] sm:max-w-[26rem] md:max-w-[34rem] lg:max-w-[38rem]">
                <TypewriterRotator
                  lines={heroLines}
                  typingSpeed={34}
                  deletingSpeed={18}
                  pauseAfterType={1800}
                  pauseAfterDelete={220}
                  loop={true}
                  className="font-headline font-bold tracking-[-0.05em] text-white drop-shadow-[0_18px_48px_rgba(2,6,23,0.72)]"
                  contentClassName="justify-start"
                  style={{
                    fontSize: 'clamp(1.7rem, 7.4vw, 5rem)',
                    lineHeight: '1.02',
                  }}
                />
              </div>


            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
