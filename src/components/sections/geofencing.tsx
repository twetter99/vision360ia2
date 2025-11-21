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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
              <img
                src="/images/vallas_electronicas.jpg"
                alt="Sistema de Vallas Electrónicas - Geocercas para control de flotas"
                className="w-full h-auto object-contain"
              />
            </div>
          </AnimatedSection>

          {/* Contenido - Derecha (3 features en vertical) */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Feature 1: Diseño de precisión flexible */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shapes className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {t.features[0].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.features[0].description}
                </p>
              </div>
            </div>

            {/* Feature 2: Asignación inteligente de activos */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {t.features[1].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t.features[1].description}
                </p>
              </div>
            </div>

            {/* Feature 3: Reglas de automatización críticas */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  {t.features[2].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t.features[2].description}
                </p>
                {/* Sub-features */}
                {t.features[2].subFeatures && (
                  <div className="space-y-3 pl-1">
                    {t.features[2].subFeatures.map((sub: any, idx: number) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <span className="text-primary text-base font-medium mt-0.5 flex-shrink-0">✓</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 mb-1">
                            {sub.title}
                          </p>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {sub.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
