import { CheckCircle2, PlayCircle } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { ContactFormButton } from '@/components/shared/contact-form-button';

/**
 * Bloque de credibilidad "Validado en vehículo demo real".
 *
 * Prueba E-E-A-T de primera mano: WINFIN tiene un vehículo demostrador con
 * meses de pruebas reales y vídeos. Esto respalda las cifras de la web (que
 * se presentan como potencial/orientativas) y diferencia frente a propuestas
 * teóricas. Reutilizable en home y en todas las landings.
 */
export function DemoValidation() {
  const points = [
    'Vehículo demo equipado con cámaras, unidad de procesamiento, detección por IA y sistema de alertas',
    'Meses de pruebas en escenarios de aproximación, maniobra, puntos ciegos y presencia de peatones, ciclistas y vehículos',
    'Vídeos reales de funcionamiento disponibles',
    'Demostración presencial o por vídeo bajo solicitud',
  ];

  return (
    <SectionWrapper className="max-w-5xl bg-transparent px-6 py-8 md:px-6 md:py-12">
      <div className="overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,253,245,0.92))] p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              <PlayCircle className="h-4 w-4" />
              Prueba real
            </p>
            <h2 className="font-headline text-2xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
              Validado en vehículo demo real
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Vision360IA no es una propuesta teórica. WINFIN dispone de un vehículo demo equipado con cámaras, unidad de procesamiento, detección por IA y sistema de alertas, utilizado durante meses para probar escenarios reales de aproximación, maniobra, puntos ciegos y detección de peatones, ciclistas y vehículos. Disponemos de vídeos reales de funcionamiento y demostraciones para operadores, fabricantes e integradores.
            </p>
            <div className="mt-6">
              <ContactFormButton
                size="lg"
                className="min-h-[52px] rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.24)] hover:bg-accent/90"
              >
                Solicitar una demostración
              </ContactFormButton>
            </div>
          </div>

          <ul className="grid gap-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-emerald-200/60 bg-white/80 px-4 py-3 text-sm leading-relaxed text-slate-700 md:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
