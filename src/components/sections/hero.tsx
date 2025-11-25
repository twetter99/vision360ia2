'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle, ShieldCheck, Cpu, GitMerge, X } from 'lucide-react';
import { heroData } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';
import { useContactSlideOver } from '@/context/contact-slideover-provider';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function Hero({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.hero || initialTranslations.hero;
  const heroImage = heroData.image;
  const [scrollY, setScrollY] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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

  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  const { openContactSlideOver } = useContactSlideOver();

  return (
    <section 
      className="relative w-full flex flex-col justify-center items-center overflow-visible"
      style={{ 
        minHeight: 'calc(100vh - 72px)',
        paddingTop: '4rem',
        paddingBottom: 'max(4rem, calc(3rem + env(safe-area-inset-bottom)))'
      }}
    >
      <div className="absolute inset-0 overflow-hidden" style={{ transform: `translateY(${parallaxY}px)` }}>
        <Image
          src={heroImage.imageUrl}
          alt="Sistema ADAS Vision360IA instalado en flota de transporte - Vista 360 grados con detección inteligente"
          fill
          className="object-cover scale-105"
          data-ai-hint={heroImage.imageHint}
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgICAgMBAAAAAAAAAAAAAQIDBAARBQYhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAaEQACAgMAAAAAAAAAAAAAAAABAgADBBEh/9oADAMBAAIRAxEAPwDPendbhqVhZLM9hwJI4yCqxIRv9z+Y2+cxjCdqrJi4A5P/2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center w-full">
        <div 
          className="container max-w-7xl px-6 w-full" 
          style={{
            opacity: opacity > 0.95 ? 1 : opacity,
            filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
          }}
        >
          <AnimatedSection 
            as="h1" 
            className="font-headline font-bold tracking-tight text-white
                       bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent
                       drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]
                       animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{
              fontSize: 'clamp(1.875rem, 5.5vw, 4.5rem)',
              lineHeight: 'clamp(1.1, 1.15, 1.2)'
            }}
            animation="slide-up"
          >
            {t.title}
          </AnimatedSection>
          <AnimatedSection 
            as="p" 
            className="mt-8 font-headline text-xl font-bold text-accent md:text-2xl lg:text-3xl
                       drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]
                       tracking-wide
                       animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-150"
            animation="slide-up"
            delay={0.15}
          >
            {t.subtitle}
          </AnimatedSection>
          <AnimatedSection 
            as="div" 
            className="mx-auto mt-10 max-w-[1200px] px-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300"
            style={{ marginBottom: 'clamp(3.5rem, 5vw, 5rem)' }}
            animation="slide-up"
            delay={0.3}
          >
            <div className="space-y-6 text-center">
              <p className="text-lg font-normal text-white/90 md:text-xl lg:text-2xl">
                {t.dailyChallenge}
              </p>
              <div className="space-y-4 mt-10">
                <p className="text-base font-medium text-white md:text-lg lg:text-xl">
                  {t.withVision360ia || 'Con'} <strong className="font-semibold text-white">Vision360IA</strong>, {t.vision360iaIntro}
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mt-4 max-w-4xl mx-auto">
                  <span className="hero-badge inline-flex items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-emerald-600/20 to-teal-600/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-300/60 hover:from-emerald-500/35 hover:via-emerald-600/30 hover:to-teal-600/35 hover:scale-105 md:px-4 md:py-2 md:text-sm animate-in fade-in zoom-in duration-500 delay-500">
                    <span className="relative">{t.badges.detectRisks}</span>
                  </span>
                  <span className="hero-badge inline-flex items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-emerald-600/20 to-teal-600/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-300/60 hover:from-emerald-500/35 hover:via-emerald-600/30 hover:to-teal-600/35 hover:scale-105 md:px-4 md:py-2 md:text-sm animate-in fade-in zoom-in duration-500 delay-600">
                    <span className="relative">{t.badges.anticipateCollisions}</span>
                  </span>
                  <span className="hero-badge inline-flex items-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500/25 via-emerald-600/20 to-teal-600/25 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/30 hover:border-emerald-300/60 hover:from-emerald-500/35 hover:via-emerald-600/30 hover:to-teal-600/35 hover:scale-105 md:px-4 md:py-2 md:text-sm animate-in fade-in zoom-in duration-500 delay-700">
                    <span className="relative">{t.badges.convertData}</span>
                  </span>
                </div>
              </div>
              <p className="text-sm font-normal text-white/90 md:text-base lg:text-lg pt-6">
                {t.adasTechPrefix || 'Tecnología'} <strong className="font-semibold text-white">{t.adasPoweredByAI || 'ADAS potenciada por IA'}</strong>, {t.adasTech} <strong className="font-semibold text-white">{t.teamAssets}</strong>.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection
            as="div"
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 w-full max-w-md sm:max-w-none mx-auto"
            animation="slide-up"
            delay={0.45}
          >
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 min-h-[48px] w-full sm:w-auto"
              onClick={openContactSlideOver}
            >
              {t.mainCta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm shadow-lg transition-transform hover:scale-105 hover:bg-white/20 min-h-[48px] w-full sm:w-auto"
              onClick={handleVideoClick}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              {t.secondaryCta}
            </Button>
          </AnimatedSection>
          {/* Trust Bar - Franja de confianza */}
          <AnimatedSection
            as="div"
            className="mt-8 w-full max-w-4xl mx-auto"
            animation="slide-up"
            delay={0.55}
          >
            <div className="rounded-full bg-black/20 backdrop-blur-md border border-white/10 px-6 py-4 md:px-8 md:py-5">
              <p className="text-xs text-white/70 mb-3 md:text-sm">{t.trustedBy}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10">
                {['CRTM Madrid', 'ATM Barcelona', 'Lurraldebus'].map((name, i) => (
                  <div key={i} className="h-10 px-4 bg-white/10 rounded flex items-center justify-center backdrop-blur-sm border border-white/5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <span className="text-white/90 font-bold text-sm uppercase tracking-wider">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection
            as="div"
            className="mt-8 flex flex-col items-center gap-6"
            style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
            animation="slide-up"
            delay={0.6}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>IP69K</span>
              </Badge>
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span>IA ADAS</span>
              </Badge>
              <Badge variant="secondary" className="gap-2 border-transparent bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                <GitMerge className="h-4 w-4 text-purple-400" />
                <span>Integración CAN/FMS</span>
              </Badge>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black border-0">
          <VisuallyHidden>
            <DialogTitle>Video de Vision360IA</DialogTitle>
          </VisuallyHidden>
          <DialogClose className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://player.vimeo.com/video/1131769025?autoplay=1&title=0&byline=0&portrait=0"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
