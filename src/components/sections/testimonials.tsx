'use client';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { Card, CardContent } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '../shared/animated-section';

const deploymentItems = [
  {
    id: 'deployment-bus',
    category: 'Transporte público',
    title: 'Despliegues en autobuses urbanos con operación intensiva',
    summary:
      'Implantaciones pensadas para giros urbanos, paradas frecuentes y convivencia continua con peatones y ciclistas, sin tratar el vehículo como una plataforma genérica.',
    highlight: '+2.000 vehículos equipados',
    href: '/adas-autobuses',
    cta: 'Ver solución para autobuses',
  },
  {
    id: 'deployment-truck',
    category: 'Transporte pesado',
    title: 'Configuraciones para rígidos, tractoras y articulados',
    summary:
      'La arquitectura cambia según geometría, remolque, maniobra y accesos logísticos. El valor está en diseñar bien la instalación antes de desplegarla en flota.',
    highlight: 'Compatibilidad 12V / 24V',
    href: '/adas-camiones',
    cta: 'Ver solución para camiones',
  },
  {
    id: 'deployment-rsu',
    category: 'Operación municipal',
    title: 'Recogida urbana y vehículos con operarios en zona crítica',
    summary:
      'En RSU la solución debe adaptarse a maniobras lentas, operarios junto al vehículo y condiciones severas de trabajo, lavado y suciedad.',
    highlight: 'Validación en operación real',
    href: '/adas-vehiculos-recogida-residuos',
    cta: 'Ver solución para RSU',
  },
  {
    id: 'deployment-industrial',
    category: 'Industrial y obra',
    title: 'Maquinaria pesada, industria y entornos severos',
    summary:
      'La fiabilidad depende de cableado, fijaciones, cámaras y calibración preparados para vibración, agua a presión, polvo y geometrías irregulares.',
    highlight: 'IP69K y robustez industrial',
    href: '/vision-360-vehiculos-industriales',
    cta: 'Ver solución industrial',
  },
];

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials" className="bg-transparent">
      <SectionHeading
        eyebrow="DESPLIEGUES REALES"
        title="Experiencia de implantación en flotas y vehículos de operación real"
        description="La ventaja de WINFIN no está solo en vender tecnología ADAS, sino en implantarla con criterio técnico, adaptarla a cada vehículo y validarla en servicio antes de escalar el despliegue."
      />
      <AnimatedSection animation="slide-up" delay={0.2}>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {deploymentItems.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <AnimatedSection animation="slide-up" delay={0.08 + index * 0.08} className="h-full p-1">
                  <Card className="elevated-card flex h-full flex-col rounded-[1.75rem] border border-white/70 bg-card/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-strong)]">
                    <CardContent className="flex flex-1 flex-col justify-between p-8">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                        {item.summary}
                      </p>
                      <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Señal de confianza
                        </div>
                        <div className="mt-2 text-sm font-medium text-slate-700">
                          {item.highlight}
                        </div>
                      </div>
                      <div className="mt-8">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3"
                        >
                          <span>{item.cta}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="mt-4 text-xs font-medium text-slate-400">
                        Implantación, integración y validación sobre operación real
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 h-10 w-10 -translate-y-1/2 border-white/70 bg-white/90 md:-left-12 md:h-12 md:w-12" />
          <CarouselNext className="absolute -right-4 top-1/2 h-10 w-10 -translate-y-1/2 border-white/70 bg-white/90 md:-right-12 md:h-12 md:w-12" />
        </Carousel>
      </AnimatedSection>
    </SectionWrapper>
  );
}
