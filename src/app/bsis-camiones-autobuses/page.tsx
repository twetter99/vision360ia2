import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'Sistema BSIS para camiones y autobuses | Vision360IA',
  description: 'Qué es un sistema BSIS, cuándo aplica en camiones y autobuses y cómo se integra con visión 360°, protección VRU y cumplimiento GSR en flotas profesionales.',
  keywords: ['sistema BSIS', 'BSIS camiones', 'BSIS autobuses', 'R151 BSIS', 'protección VRU camiones', 'GSR camiones autobuses'],
  alternates: {
    canonical: 'https://www.vision360ia.com/bsis-camiones-autobuses',
  },
  openGraph: {
    title: 'BSIS para camiones y autobuses | Vision360IA',
    description: 'Explicación clara de BSIS, su papel en GSR y cómo reforzarlo con visión 360° y detección VRU en flotas reales.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sistema BSIS para camiones y autobuses',
    description: 'Guía explicativa sobre BSIS, normativa R151 y su aplicación en operaciones con camiones y autobuses.',
    about: ['BSIS', 'R151', 'GSR', 'VRU', 'camiones', 'autobuses'],
  },
];

export default function BsisCamionesAutobusesPage() {
  return (
    <SupportPage
      title="Sistema BSIS para camiones y autobuses: qué es y cuándo lo necesita una flota"
      description="BSIS es una de las funciones clave dentro del marco GSR para reducir el riesgo con usuarios vulnerables de la vía. En Vision360IA lo conectamos con visión 360°, detección VRU y despliegue real sobre flotas de autobuses y camiones."
      eyebrow="RECURSO TÉCNICO"
      breadcrumbLabel="Sistema BSIS"
      schemas={schemas}
      primarySolution={{
        href: '/anti-atropellos-peatones-ciclistas',
        label: 'Ver solución base de protección VRU',
        helperText: 'Si buscas la solución principal orientada a detección de peatones, ciclistas y protección VRU, esta es la página principal que concentra esa propuesta.',
      }}
      intro={{
        badge: 'BSIS y GSR',
        highlights: ['R151 y GSR', 'Protección VRU', 'Camiones y autobuses', 'Implantación en flota'],
      }}
      sections={[
        {
          eyebrow: 'Definición operativa',
          title: 'Qué es exactamente un sistema BSIS',
          paragraphs: [
            'BSIS responde a Blind Spot Information System. En la práctica, es una función pensada para reducir el riesgo que se genera cuando un conductor no detecta a tiempo peatones, ciclistas u otros usuarios vulnerables en las zonas ciegas del vehículo.',
            'En flotas de autobuses y camiones, el valor de BSIS no está solo en cumplir una exigencia técnica. Está en aportar una capa de prevención útil en giros urbanos, maniobras de baja velocidad y entornos mixtos donde la exposición al atropello es alta.',
          ],
        },
        {
          eyebrow: 'Aplicación real',
          title: 'Dónde aporta más valor en autobuses y camiones',
          items: [
            'Giro urbano a la derecha con ángulo muerto lateral.',
            'Arranque desde parada o semáforo con presencia de ciclistas.',
            'Convivencia con peatones y scooters en ciudad.',
            'Accesos logísticos y maniobras lentas donde el conductor gestiona múltiples focos de riesgo.',
          ],
        },
        {
          eyebrow: 'Encaje con Vision360IA',
          title: 'Cómo reforzamos BSIS con visión 360° y detección VRU',
          paragraphs: [
            'BSIS gana valor cuando se conecta con una arquitectura que no depende de una única señal o de una única cámara. Vision360IA combina visión cenital 360°, detección de peatones y ciclistas y lógica de operación pensada para flotas reales.',
            'Eso permite no limitarse a una referencia normativa, sino cubrir mejor el contexto completo de riesgo: geometría del vehículo, tipo de maniobra, usuarios vulnerables y necesidad de despliegue retrofit sobre flota existente.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ BSIS',
        title: 'Preguntas frecuentes sobre BSIS en flotas',
        items: [
          {
            question: '¿BSIS es lo mismo que una visión 360°?',
            answer: 'No. BSIS es una función orientada a la detección de riesgo en ángulo muerto. La visión 360° aporta una percepción más amplia del entorno. En una estrategia sólida de seguridad ambas capas se complementan.',
          },
          {
            question: '¿BSIS aplica solo a camiones?',
            answer: 'No. Su relevancia es muy alta en camiones, pero el mismo problema operativo de ángulo muerto y protección VRU también afecta a autobuses y otros vehículos de gran volumen en entorno urbano.',
          },
          {
            question: '¿Con cumplir R151 ya es suficiente para reducir el riesgo real?',
            answer: 'No siempre. La normativa marca una base. La reducción real de riesgo depende de cómo se combine esa función con visión útil, detección VRU, geometría del vehículo y despliegue adecuado a la operación de la flota.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Revisa si tu estrategia BSIS cubre el riesgo real de tu flota',
        description: 'Analizamos geometría, maniobras y contexto operativo para definir una solución coherente en camiones y autobuses.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/adas-camiones', label: 'ADAS para Camiones' },
          { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
          { href: '/anti-atropellos-peatones-ciclistas', label: 'Protección VRU' },
        ],
      }}
    />
  );
}