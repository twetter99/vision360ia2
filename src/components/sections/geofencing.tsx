"use client";

import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import { Shapes, Users, ShieldAlert, MapPinned } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import type { Translation } from "@/lib/translations";
import { AnimatedSection } from "../shared/animated-section";

export function Geofencing({
  translations: initialTranslations,
}: {
  translations: Translation["es"];
}) {
  const { translations } = useLanguage();
  const t =
    translations.geofencingSection || initialTranslations.geofencingSection;

  return (
    <SectionWrapper id="geocercas" className="bg-gradient-to-b from-white to-slate-50">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Imagen/Mockup - Izquierda */}
          <AnimatedSection animation="slide-up" className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] lg:sticky lg:top-24 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-slate-200">
              {/* Placeholder - Reemplazar con imagen real de mapa con geocercas */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPinned className="w-24 h-24 mx-auto mb-4 text-primary/30" />
                  <p className="text-sm text-slate-500">
                    Mockup de mapa con geocercas
                    <br />
                    <span className="text-xs">(Reemplazar con imagen real)</span>
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contenido - Derecha */}
          <AnimatedSection animation="slide-up" className="order-1 lg:order-2" delay={100}>
            <div className="space-y-5">
              {/* Feature 1: Diseño de precisión flexible */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shapes className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 text-slate-900">
                    {t.features[0].title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.features[0].description}
                  </p>
                </div>
              </div>

              {/* Feature 2: Asignación inteligente de activos */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 text-slate-900">
                    {t.features[1].title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t.features[1].description}
                  </p>
                </div>
              </div>

              {/* Feature 3: Reglas de automatización críticas */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 text-slate-900">
                    {t.features[2].title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                    {t.features[2].description}
                  </p>
                  {/* Sub-features con checkmarks */}
                  <div className="space-y-1.5">
                    {t.features[2].subFeatures?.map((sub: any, idx: number) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-primary text-xs mt-0.5 flex-shrink-0">✓</span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-slate-700">{sub.title}:</span>
                          <span className="text-xs text-slate-600"> {sub.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </SectionWrapper>
  );
}
