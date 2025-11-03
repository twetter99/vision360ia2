"use client";

import { SectionWrapper } from "../shared/section-wrapper";
import { Button } from "../ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import type { Translation } from "@/lib/translations";

export function ThreatAnalysis({
  translations: initialTranslations,
}: {
  translations: Translation["es"];
}) {
  const { translations } = useLanguage();
  const t =
    translations.aiAnalysisSection || initialTranslations.aiAnalysisSection;

  const scrollToContact = () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SectionWrapper
      id="ai-analysis"
      className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-12 md:p-16 shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center space-y-8">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-10 h-10 text-accent" />
            </div>

            <div className="space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                ¿Listo para Proteger tu Flota?
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Agenda una consultoría gratuita con nuestros expertos y descubre cómo Vision360IA puede reducir accidentes y costes en tu operación.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Zap className="w-8 h-8 text-accent" />
                <p className="text-white font-semibold">Respuesta en &lt; 24h</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Users className="w-8 h-8 text-accent" />
                <p className="text-white font-semibold">Consultoría 100% gratuita</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Shield className="w-8 h-8 text-accent" />
                <p className="text-white font-semibold">Sin compromiso</p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 h-auto"
              >
                Solicitar Consultoría Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-white/70">
                 Tus datos están protegidos. Sin spam.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <p className="text-sm text-muted-foreground">Reducción de accidentes reportada</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <p className="text-sm text-muted-foreground">Vehículos protegidos</p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Monitoreo continuo</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
