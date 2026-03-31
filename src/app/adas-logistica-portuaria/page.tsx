import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'ADAS para logística portuaria y patios con visión 360° | Vision360IA',
  description: 'Visión 360°, cámaras inteligentes y prevención de maniobra para logística portuaria, patios, muelles, portacontenedores y tráfico mixto en entorno portuario.',
  keywords: ['ADAS logística portuaria', 'visión 360 puerto', 'seguridad portacontenedores', 'cámaras patio portuario', 'ADAS muelles y patios'],
  alternates: {
    canonical: 'https://www.vision360ia.com/adas-logistica-portuaria',
  },
  openGraph: {
    title: 'ADAS para logística portuaria | Vision360IA',
    description: 'Cobertura específica para muelles, patios, portacontenedores y operación portuaria con tráfico mixto.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ADAS para logística portuaria',
    description: 'Guía sobre visión 360° y prevención de maniobra en portacontenedores, patios, muelles y entorno portuario.',
    about: ['logística portuaria', 'portacontenedores', 'muelles', 'patios', 'visión 360'],
  },
];

export default function AdasLogisticaPortuariaPage() {
  return (
    <SupportPage
      title="ADAS para logística portuaria: visión 360° para muelles, patios y tráfico mixto"
      description="La logística portuaria comparte rasgos del transporte pesado y de la operación industrial: maniobras complejas, geometrías variables, tráfico mixto y necesidad de máxima visibilidad en patios y muelles. Esta página refuerza ese encaje sectorial dentro de Vision360IA."
      eyebrow="COBERTURA SECTORIAL"
      breadcrumbLabel="ADAS para Logística Portuaria"
      schemas={schemas}
      primarySolution={{
        href: '/adas-camiones',
        label: 'Ver solución base para camiones y transporte pesado',
        helperText: 'Si buscas la solución principal para transporte pesado, puntos ciegos y maniobra crítica en flota, esta es la landing base que concentra esa propuesta.',
      }}
      intro={{
        badge: 'Puertos y patios logísticos',
        highlights: ['Muelles y patios', 'Portacontenedores', 'Tráfico mixto', 'Maniobra crítica'],
      }}
      sections={[
        {
          eyebrow: 'Entorno operativo',
          title: 'Por qué la logística portuaria necesita una capa específica de visibilidad y control',
          paragraphs: [
            'En puertos y patios logísticos conviven tractoras, rígidos, portacontenedores, carretillas, grúas móviles, personal en plataforma y maniobras con visibilidad cambiante. El riesgo se concentra en giros, aproximaciones, marcha atrás y cruces entre vehículos y personas.',
            'En ese contexto, la visión 360° y la detección inteligente ayudan a reducir puntos ciegos, golpes en maniobra y exposición a incidentes en accesos, muelles y áreas de transferencia.',
          ],
        },
        {
          eyebrow: 'Casos de uso',
          title: 'Dónde se concentra más riesgo en puerto y patio',
          items: [
            'Accesos a muelle con maniobra lenta y geometría compleja.',
            'Patios con tráfico mixto entre tractoras, personal y maquinaria.',
            'Portacontenedores en entornos con visibilidad lateral limitada.',
            'Operación de carga y descarga donde unos metros cambian la criticidad de la maniobra.',
          ],
        },
        {
          eyebrow: 'Encaje con Vision360IA',
          title: 'Cómo se conecta esta cobertura con camiones e industrial',
          paragraphs: [
            'La lógica de esta página nace de dos pilares que la web ya tiene fuertes: transporte pesado e industrial. No abre una solución aislada, sino un acceso sectorial que une ambas realidades en un mismo entorno operativo.',
            'Por eso refuerza la conexión entre camiones, vehículos industriales, visión 360° y control de maniobra en patios, muelles y logística portuaria.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ portuaria',
        title: 'Preguntas frecuentes sobre logística portuaria',
        items: [
          {
            question: '¿Esta cobertura aplica a portacontenedores y tractoras?',
            answer: 'Sí. Está pensada para operaciones donde intervienen tractoras, rígidos, portacontenedores y vehículos auxiliares con maniobras críticas en puerto o patio.',
          },
          {
            question: '¿Es una solución de camiones o una solución industrial?',
            answer: 'Puede ser ambas cosas. Precisamente por eso esta página existe: la logística portuaria se sitúa entre transporte pesado e industrial y necesita una lectura combinada del riesgo.',
          },
          {
            question: '¿Compite con las páginas de camiones o vehículos industriales?',
            answer: 'No. Las complementa con una intención sectorial concreta y dirige después a la solución base más adecuada según el tipo de vehículo y operación.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Revisa la visibilidad y seguridad de tu operación en puerto o patio',
        description: 'Analizamos maniobras, tipología de vehículo y tráfico mixto para definir una arquitectura útil en logística portuaria.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/adas-camiones', label: 'ADAS para Camiones' },
          { href: '/vision-360-vehiculos-industriales', label: 'Vehículos Industriales' },
          { href: '/fcw-flotas', label: 'Sistema FCW' },
        ],
      }}
    />
  );
}