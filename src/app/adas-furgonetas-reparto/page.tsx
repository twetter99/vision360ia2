import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'ADAS para furgonetas de reparto con visión 360° | Vision360IA',
  description: 'Mejora maniobras, reparto urbano y seguridad operativa con visión 360°, cámaras IA y ADAS para furgonetas de reparto y flotas ligeras.',
  keywords: ['ADAS furgonetas reparto', 'visión 360 furgonetas', 'cámaras IA furgonetas', 'seguridad reparto urbano', 'ADAS flotas ligeras'],
  alternates: {
    canonical: 'https://www.vision360ia.com/adas-furgonetas-reparto',
  },
  openGraph: {
    title: 'ADAS para furgonetas de reparto | Vision360IA',
    description: 'Cobertura específica para reparto urbano y última milla con visión 360° y cámaras inteligentes.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ADAS para furgonetas de reparto',
    description: 'Guía de apoyo para búsquedas relacionadas con reparto urbano, última milla y flotas ligeras con visión 360° y cámaras IA.',
    about: ['furgonetas de reparto', 'última milla', 'visión 360', 'cámaras IA', 'ADAS'],
  },
];

export default function AdasFurgonetasRepartoPage() {
  return (
    <SupportPage
      title="ADAS para furgonetas de reparto: visión 360° y cámaras IA para última milla"
      description="Las furgonetas no concentran el mismo ángulo muerto que un camión, pero sí un patrón de riesgo muy repetitivo: maniobras rápidas, carga y descarga, doble fila, reparto urbano y conducción intensiva. Esta página refuerza esa cobertura dentro del ecosistema Vision360IA."
      eyebrow="COBERTURA DE VEHÍCULO"
      breadcrumbLabel="ADAS para Furgonetas de Reparto"
      schemas={schemas}
      primarySolution={{
        href: '/camaras-vision-artificial-flotas',
        label: 'Ver solución base de cámaras con visión artificial',
        helperText: 'Si buscas la solución principal para cámaras inteligentes, analítica operativa y visión artificial aplicada a flotas, esta es la página base recomendada.',
      }}
      intro={{
        badge: 'Furgonetas y última milla',
        highlights: ['Reparto urbano', 'Carga y descarga', 'Flota ligera', 'Visión artificial'],
      }}
      sections={[
        {
          eyebrow: 'Riesgo real',
          title: 'Por qué una furgoneta de reparto también necesita cobertura ADAS útil',
          paragraphs: [
            'En reparto urbano la exposición al riesgo viene menos por el tamaño del vehículo y más por la repetición: paradas continuas, peatones alrededor, bicicletas, motos, carga y descarga y presión operativa por ruta y tiempo.',
            'Una arquitectura de visión 360° y cámaras inteligentes ayuda a reducir golpes, maniobras inseguras y puntos ciegos de proximidad en un entorno donde cada jornada concentra cientos de microdecisiones.',
          ],
        },
        {
          eyebrow: 'Casos de uso',
          title: 'Dónde aporta más valor en última milla y reparto profesional',
          items: [
            'Maniobras de estacionamiento y arrime en calle estrecha.',
            'Carga y descarga con peatones y bicis en proximidad.',
            'Supervisión de eventos y comportamiento de conducción en rutas intensivas.',
            'Control operativo y reducción de pequeños siniestros que erosionan la rentabilidad.',
          ],
        },
        {
          eyebrow: 'Encaje con Vision360IA',
          title: 'Cómo se conecta esta cobertura con visión artificial y analítica de flota',
          paragraphs: [
            'La oportunidad de Vision360IA en furgonetas está especialmente ligada a cámaras con visión artificial, registro de eventos, analítica operativa y visión 360° en maniobra. No es solo una conversación de seguridad, también de control operativo y eficiencia.',
            'Por eso esta página refuerza y aterriza mejor búsquedas de reparto urbano, flota ligera y última milla que hoy solo estaban insinuadas dentro de la solución de cámaras con visión artificial.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ reparto urbano',
        title: 'Preguntas frecuentes sobre furgonetas de reparto',
        items: [
          {
            question: '¿Una furgoneta necesita la misma arquitectura que un camión?',
            answer: 'No. La lógica de riesgo cambia. En furgonetas suele importar más la maniobra de proximidad, la repetición del reparto, la carga y descarga y el control operativo de la ruta.',
          },
          {
            question: '¿Aquí pesa más la visión 360° o la visión artificial?',
            answer: 'Ambas pueden aportar valor. La visión 360° mejora maniobras y visibilidad perimetral; la visión artificial permite detectar eventos y convertir vídeo en decisiones útiles para seguridad y operación.',
          },
          {
            question: '¿Esta cobertura refuerza la página de cámaras con visión artificial?',
            answer: 'Sí. Su objetivo es captar búsquedas más específicas de reparto y última milla, y conducirlas hacia la solución más completa sin abrir una línea desconectada del resto del sitio.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Define qué necesita tu flota ligera para repartir con menos riesgo',
        description: 'Analizamos maniobras, densidad urbana, carga y descarga y objetivos operativos para proponer una arquitectura ajustada.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
          { href: '/fcw-flotas', label: 'Sistema FCW' },
          { href: '/adas-camiones', label: 'ADAS para Camiones' },
        ],
      }}
    />
  );
}