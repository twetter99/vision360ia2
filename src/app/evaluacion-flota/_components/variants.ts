import type { Interest } from './interest';

/** Closed allowlist: URL parameters are never rendered as copy or HTML. */
const VARIANTS: Record<string, { title: string; lead: string; interest: Interest }> = {
  demo: {
    title: 'Comprueba Vision360IA antes de decidir',
    lead: 'Solicita una demostración de visión 360° con detección de peatones y alertas al conductor para tu flota.',
    interest: 'demo',
  },
  peatones: {
    title: 'Detección de peatones y alertas en puntos ciegos',
    lead: 'Visión 360° e inteligencia artificial para apoyar al conductor en giros y maniobras de vehículos profesionales.',
    interest: 'demo',
  },
  flotas: {
    title: 'ADAS y visión 360° para vehículos en servicio',
    lead: 'Evalúa cómo integrar detección de peatones y visión perimetral en tu flota actual, sin sustituir los vehículos.',
    interest: 'implantacion',
  },
  instalacion: {
    title: 'Visión 360° a medida de cada vehículo',
    lead: 'Ingeniería, instalación y calibración adaptadas a la geometría, las maniobras y el entorno operativo de tu flota.',
    interest: 'implantacion',
  },
  autobuses: {
    title: 'Más visibilidad en giros y maniobras de autobuses',
    lead: 'Sistema de visión 360° con IA y alertas al conductor para paradas, giros y escenarios de tráfico urbano.',
    interest: 'implantacion',
  },
};

const DEFAULT = {
  title: 'Visión 360° con IA para maniobras más seguras',
  lead: 'Detecta peatones, ciclistas y obstáculos en zonas de riesgo y avisa al conductor. Ingeniería, instalación y calibración adaptadas a tus vehículos.',
  interest: 'demo' as const,
};

export function getLandingVariant(value?: string | null) {
  return value && Object.prototype.hasOwnProperty.call(VARIANTS, value) ? VARIANTS[value] : DEFAULT;
}
