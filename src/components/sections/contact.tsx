"use client";

import { SectionWrapper } from "../shared/section-wrapper";

/**
 * Sección de contacto simplificada.
 * El formulario ahora se encuentra en el slide-over global (ContactSlideOver).
 * Esta sección mantiene el ID "contacto" como ancla para compatibilidad con enlaces existentes.
 */
export function Contact() {
  return (
    <SectionWrapper id="contacto" className="py-0">
      {/* Ancla invisible para compatibilidad con #contacto */}
      <div className="h-0" aria-hidden="true" />
    </SectionWrapper>
  );
}
