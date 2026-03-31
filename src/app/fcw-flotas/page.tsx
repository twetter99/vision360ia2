import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'Sistema FCW para flotas y vehículos industriales | Vision360IA',
  description: 'Qué es FCW, cómo ayuda a reducir riesgo de colisión frontal y cómo se integra con visión artificial, ADAS y operación de flotas profesionales.',
  keywords: ['sistema FCW', 'FCW flotas', 'alerta colisión frontal', 'ADAS FCW camiones', 'FCW autobuses', 'cámaras IA colisión frontal'],
  alternates: {
    canonical: 'https://www.vision360ia.com/fcw-flotas',
  },
  openGraph: {
    title: 'Sistema FCW para flotas | Vision360IA',
    description: 'Explicación práctica de FCW, su valor operativo y cómo se combina con visión artificial y otras funciones ADAS en flotas profesionales.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sistema FCW para flotas y vehículos industriales',
    description: 'Guía explicativa sobre la alerta de colisión frontal, su aplicación en flotas y su integración con ADAS y visión artificial.',
    about: ['FCW', 'alerta de colisión frontal', 'ADAS', 'flotas', 'visión artificial'],
  },
];

export default function FcwFlotasPage() {
  return (
    <SupportPage
      title="Sistema FCW para flotas: cómo funciona y cuándo aporta valor real"
      description="FCW, o Forward Collision Warning, es una función ADAS orientada a alertar sobre riesgo de colisión frontal. En una flota profesional su valor depende de cómo se integra con visión artificial, operación real y formación de conductores."
      eyebrow="RECURSO TÉCNICO"
      breadcrumbLabel="Sistema FCW"
      schemas={schemas}
      primarySolution={{
        href: '/camaras-vision-artificial-flotas',
        label: 'Ver solución base de visión artificial',
        helperText: 'Si buscas la arquitectura principal que agrupa visión artificial, analítica y capas ADAS complementarias, esta es la página base que concentra esa propuesta.',
      }}
      intro={{
        badge: 'FCW y ADAS',
        highlights: ['Alerta frontal', 'ADAS embarcado', 'Flota profesional', 'Visión artificial'],
      }}
      sections={[
        {
          eyebrow: 'Qué hace',
          title: 'Qué resuelve un sistema FCW en una operación de flota',
          paragraphs: [
            'FCW está pensado para avisar al conductor cuando el sistema detecta un riesgo relevante de colisión frontal. Su papel no es sustituir la conducción, sino ganar tiempo de reacción y reducir la probabilidad de un incidente grave.',
            'En una flota profesional esto es especialmente útil cuando hay fatiga, tráfico denso, conducción repetitiva o necesidad de mantener continuidad de servicio con el menor número posible de incidentes e inmovilizaciones.',
          ],
        },
        {
          eyebrow: 'Dónde encaja mejor',
          title: 'Escenarios donde FCW tiene más sentido',
          items: [
            'Camiones de largo recorrido y distribución con exposición a tráfico denso.',
            'Autobuses interurbanos y de servicio continuo con alta repetición operativa.',
            'Vehículos industriales que alternan entorno abierto y circulación en accesos logísticos.',
            'Flotas que quieren reducir siniestros, reclamaciones y costes de inmovilización.',
          ],
        },
        {
          eyebrow: 'Cómo reforzarlo',
          title: 'Por qué FCW funciona mejor cuando no va aislado',
          paragraphs: [
            'FCW gana valor cuando se integra con visión artificial, registro de eventos, analítica de conducción y otras funciones ADAS. En ese contexto deja de ser una alerta aislada y pasa a formar parte de una estrategia de prevención y mejora operativa.',
            'En Vision360IA lo entendemos como una capa más dentro de una arquitectura más amplia: visión 360°, detección VRU, analítica embarcada y soporte de implantación ajustado a la geometría y al riesgo de cada flota.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ FCW',
        title: 'Preguntas frecuentes sobre FCW en flotas',
        items: [
          {
            question: '¿FCW sirve igual en cualquier tipo de vehículo?',
            answer: 'No exactamente. La utilidad y la configuración dependen del tipo de vehículo, de la velocidad de operación, de la geometría frontal y del entorno en el que trabaja la flota.',
          },
          {
            question: '¿FCW sustituye a otras funciones como visión 360° o protección VRU?',
            answer: 'No. FCW cubre el riesgo de colisión frontal. La visión 360° y la protección VRU cubren otros escenarios críticos como ángulos muertos, giros urbanos o maniobras a baja velocidad.',
          },
          {
            question: '¿Tiene sentido implantar FCW en retrofit?',
            answer: 'Sí, siempre que la arquitectura del vehículo y la operación lo justifiquen. El criterio correcto no es instalar por instalar, sino revisar riesgo, exposición y retorno operativo.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Define si FCW debe formar parte de tu arquitectura ADAS',
        description: 'Evaluamos tu tipo de flota, el entorno de operación y cómo encajar FCW con visión 360°, visión artificial y prevención de riesgo.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/adas-camiones', label: 'ADAS para Camiones' },
          { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
          { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
        ],
      }}
    />
  );
}