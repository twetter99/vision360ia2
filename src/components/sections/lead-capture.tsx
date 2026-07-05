import { BadgeCheck, History, Truck, Warehouse, Wrench } from 'lucide-react';

import { SectionWrapper } from '@/components/shared/section-wrapper';
import { QuickLeadForm } from '@/components/shared/quick-lead-form';

/**
 * Sección de captación para landings de campaña (CRO):
 * diferenciador de "instalación experta" + formulario corto + CTA de llamada.
 *
 * Móvil primero: titular corto + 3 bullets (los 2 últimos solo en md+) y el
 * formulario inmediatamente después. No se fuerza que todo quepa sin scroll.
 */

const PUNTOS = [
  {
    icon: Wrench,
    text: 'Técnicos e ingenieros propios — sin subcontratas',
  },
  {
    icon: Warehouse,
    text: '2 talleres propios: Madrid–Ciempozuelos y Donostia / San Sebastián',
  },
  {
    icon: BadgeCheck,
    text: 'Calibración y validación en vehículo real, no en renders',
  },
  // En móvil se priorizan los 3 primeros; estos dos aparecen desde md.
  {
    icon: History,
    text: '+20 años de experiencia en instalaciones embarcadas',
    desktopOnly: true,
  },
  {
    icon: Truck,
    text: '+2.000 vehículos equipados en flotas profesionales',
    desktopOnly: true,
  },
];

export function LeadCapture({ whatsappTopic }: { whatsappTopic?: string }) {
  return (
    <SectionWrapper className="max-w-7xl bg-transparent px-6 py-10 md:px-6 md:py-14">
      {/* Tarjeta blanca: el fondo del artículo puede ser oscuro (contraste). */}
      <div className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/95 p-5 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700/90">
            Instalación experta
          </p>
          <h2 className="font-headline text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-950 md:text-4xl">
            No vendemos un kit. Lo instalamos y calibramos nosotros.
          </h2>
          <ul className="mt-6 space-y-3.5">
            {PUNTOS.map(({ icon: Icon, text, desktopOnly }) => (
              <li
                key={text}
                className={`${desktopOnly ? 'hidden md:flex' : 'flex'} items-start gap-3 text-base leading-relaxed text-slate-700`}
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium italic text-slate-500">
            Hablas con ingenieros de instalación, no con comerciales.
          </p>
        </div>

        <QuickLeadForm whatsappTopic={whatsappTopic} />
      </div>
    </SectionWrapper>
  );
}
