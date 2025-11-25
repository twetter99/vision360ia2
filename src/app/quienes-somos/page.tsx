
import { Metadata } from 'next';
import { translations } from '@/lib/translations';
import Image from 'next/image';
import { findImage } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, CheckCircle, Cpu, HardHat, ShieldCheck, Wifi, Award, Briefcase, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { AnimatedSection } from '@/components/shared/animated-section';

export const metadata: Metadata = {
  title: 'Quiénes somos | Vision360ia',
  description: 'Conoce la experiencia de más de 20 años de WINFIN en sistemas tecnológicos para el transporte, nuestra misión, visión y compromiso con la innovación.',
};

export default function AboutUsPage() {
  const t = translations.es.aboutPage; // Fallback to Spanish

  const metrics = [
    { value: '+2.000', label: 'Vehículos Equipados', icon: HardHat },
    { value: '+20', label: 'Años de Experiencia', icon: Award },
    { value: '+10', label: 'Grandes Operadores', icon: Briefcase },
    { value: '24h', label: 'Soporte Nacional', icon: Clock },
  ];

  const whatWeDo = [
    { title: 'Instalación Embarcada', description: 'Despliegue de sistemas tecnológicos a medida en flotas de transporte.', icon: HardHat },
    { title: 'Mantenimiento GMAO', description: 'Gestión de mantenimiento asistido por ordenador para máxima disponibilidad.', icon: CheckCircle },
    { title: 'Vision360IA', description: 'Plataforma ADAS con IA para seguridad activa y reducción de siniestralidad.', icon: Cpu },
    { title: 'Afluencia360', description: 'Sistema de conteo de pasajeros con IA para optimización de rutas y recursos.', icon: BarChart },
    { title: 'Redes y Routers', description: 'Conectividad robusta y segura para vehículos y centros de control.', icon: Wifi },
    { title: 'Sistemas CCTV', description: 'Soluciones de videovigilancia embarcada para seguridad y control operativo.', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
        <div className="absolute inset-0">
          <Image
            src={findImage('hero').imageUrl}
            alt="Equipo de WINFIN trabajando en un proyecto"
            fill
            className="object-cover"
            data-ai-hint="team collaboration"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <AnimatedSection as="div" animation="slide-up" className="relative z-10 container">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90">
              <Link href="/contact">{t.hero.cta}</Link>
            </Button>
          </div>
        </AnimatedSection>
      </section>

      {/* Mission and Vision */}
      <SectionWrapper id="mision-vision" className="bg-card">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <AnimatedSection animation="fade-in">
            <h2 className="font-headline text-3xl font-bold">{t.sections.mission.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground text-justify">{t.sections.mission.text}</p>
          </AnimatedSection>
          <AnimatedSection animation="fade-in" delay={0.2}>
            <h2 className="font-headline text-3xl font-bold">{t.sections.vision.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground text-justify">{t.sections.vision.text}</p>
          </AnimatedSection>
        </div>
      </SectionWrapper>
      
      {/* Metrics Section */}
      <SectionWrapper id="experiencia">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {metrics.map((metric, index) => (
                  <AnimatedSection key={metric.label} animation="slide-up" delay={index * 0.1}>
                      <div className="text-center">
                          <metric.icon className="mx-auto h-12 w-12 text-primary" />
                          <p className="mt-4 text-4xl font-bold tracking-tighter">{metric.value}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                      </div>
                  </AnimatedSection>
              ))}
          </div>
      </SectionWrapper>

      {/* What We Do Section */}
      <SectionWrapper id="que-hacemos" className="bg-card">
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">{t.sections.whatWeDo.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.sections.whatWeDo.text}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((service, index) => (
            <AnimatedSection key={service.title} animation="fade-in" delay={index * 0.1}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-justify">{service.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </SectionWrapper>
      
      {/* Final CTA */}
      <SectionWrapper id="cta-final">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.cta.text}
          </p>
          <div className="mt-10">
             <Button asChild size="lg" className="bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
                <Link href="/contact">
                  {t.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
