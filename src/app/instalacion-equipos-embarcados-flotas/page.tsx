import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Instalación de equipos embarcados para flotas',
  description:
    'Instalación profesional de cámaras 360°, sistemas de seguridad y equipos embarcados en autobuses, camiones, maquinaria y flotas industriales. Análisis, diseño, montaje y calibración por ingenieros de WINFIN.',
  keywords: [
    'instalación equipos embarcados',
    'instalación cámaras flota',
    'montaje cámaras 360 camión',
    'instalación sistemas seguridad vehículos',
    'integración embarcada flotas',
    'retrofit cámaras flota existente',
    'instalación ADAS profesional',
    'calibración cámaras vehículo industrial',
  ],
  alternates: {
    canonical: '/instalacion-equipos-embarcados-flotas',
  },
  openGraph: {
    title: 'Instalación de equipos embarcados para flotas | Vision360IA',
    description:
      'Instalamos y calibramos cámaras 360°, sistemas de detección y equipos de seguridad sobre tu flota existente. Talleres propios e ingeniería de integración.',
    url: `${SITE_URL}/instalacion-equipos-embarcados-flotas`,
    type: 'website',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Instalación de equipos embarcados para flotas',
    serviceType: 'Instalación e integración de sistemas embarcados de seguridad',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'España' },
    description:
      'Servicio profesional de instalación, integración y calibración de cámaras 360°, sistemas de detección de peatones y ciclistas y equipos de seguridad embarcados en autobuses, camiones, maquinaria y vehículos industriales.',
    audience: {
      '@type': 'BusinessAudience',
      name: 'Flotas profesionales y operadores de transporte',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo se instala un sistema de seguridad embarcado en un vehículo de flota',
    description:
      'Proceso de instalación profesional de equipos embarcados (cámaras 360°, detección VRU, ADAS) sobre flota existente.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Análisis del vehículo',
        text: 'Estudio de la geometría del vehículo, puntos ciegos, maniobras habituales y condiciones reales de operación de la flota.',
      },
      {
        '@type': 'HowToStep',
        name: 'Diseño de la instalación',
        text: 'Definición del número y posición de cámaras y sensores, recorrido de cableado y arquitectura de la unidad de control para esa geometría concreta.',
      },
      {
        '@type': 'HowToStep',
        name: 'Montaje en taller',
        text: 'Instalación física de cámaras, unidad central, monitor de cabina y cableado por técnicos certificados, respetando estanqueidad (IP69K) y la integridad del vehículo.',
      },
      {
        '@type': 'HowToStep',
        name: 'Calibración',
        text: 'Ajuste y calibración de la fusión de imágenes 360° y de la detección por IA para que la cobertura sea real y sin zonas muertas.',
      },
      {
        '@type': 'HowToStep',
        name: 'Validación en operación',
        text: 'Comprobación del sistema en condiciones reales de la flota antes de dar por cerrada la instalación.',
      },
    ],
  },
];

export default function InstalacionEquiposEmbarcadosPage() {
  return (
    <SupportPage
      title="Instalación de equipos embarcados para flotas: por qué el montaje importa tanto como el equipo"
      description="En sistemas de seguridad para flotas, una buena instalación es la diferencia entre cubrir el riesgo real o dejar zonas ciegas sin proteger. WINFIN diseña, instala, calibra y valida cada equipo embarcado sobre la geometría concreta de cada vehículo, con talleres propios e ingeniería de integración."
      eyebrow="SERVICIO"
      breadcrumbLabel="Instalación de equipos embarcados"
      schemas={schemas}
      primarySolution={{
        href: '/vision-360-vehiculos-industriales',
        label: 'Ver la solución de visión 360°',
        helperText:
          'Si buscas la solución de cámaras 360° y detección que instalamos, esta es la página principal del sistema.',
      }}
      intro={{
        badge: 'Instalación e integración',
        highlights: [
          'Talleres propios',
          'Ingeniería de integración',
          'Retrofit sobre flota existente',
          'Calibración y validación',
        ],
      }}
      sections={[
        {
          eyebrow: 'El punto clave',
          title: 'La instalación es tan importante como el equipo',
          paragraphs: [
            'En un sistema de seguridad embarcado, el hardware es solo la mitad del resultado. La otra mitad es cómo se instala: dónde se colocan las cámaras, cómo se calibra la fusión de imágenes y cómo se ajusta la detección a la geometría real de cada vehículo. Un equipo excelente mal instalado deja puntos ciegos sin cubrir.',
            'Por eso WINFIN no vende un kit estándar para que lo monte cualquiera. Cada instalación se diseña y ejecuta para las maniobras, dimensiones y operación reales de tu flota, en talleres propios y con ingenieros de instalación, no comerciales.',
          ],
        },
        {
          eyebrow: 'Cómo trabajamos',
          title: 'El proceso de instalación, paso a paso',
          items: [
            'Análisis del vehículo: geometría, puntos ciegos, maniobras críticas y condiciones de operación.',
            'Diseño de la instalación: número y posición de cámaras y sensores, cableado y unidad de control.',
            'Montaje en taller: instalación física respetando estanqueidad (IP69K) e integridad del vehículo.',
            'Calibración: ajuste de la visión 360° y la detección por IA para cobertura real sin zonas muertas.',
            'Validación en operación: comprobación en condiciones reales antes de cerrar el proyecto.',
          ],
        },
        {
          eyebrow: 'Sobre qué vehículos',
          title: 'Vehículos y flotas donde instalamos',
          paragraphs: [
            'Trabajamos sobre flota existente (retrofit) y sobre vehículos nuevos: autobuses urbanos e interurbanos, camiones de distribución y transporte pesado, furgonetas de reparto, vehículos de recogida de residuos y limpieza viaria, maquinaria agrícola, maquinaria de obras públicas y vehículos industriales que operan en entornos urbanos, logísticos, aeroportuarios o de baja visibilidad.',
            'La instalación se adapta a cada tipología: no es lo mismo cubrir los ángulos muertos de un autobús articulado que los de una máquina de obra o un camión de basura con operarios a pie. Esa adaptación es justamente lo que define una instalación bien hecha.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Instalación',
        title: 'Preguntas frecuentes sobre la instalación de equipos embarcados',
        items: [
          {
            question: '¿Se puede instalar sobre vehículos que ya están en servicio?',
            answer:
              'Sí. La mayoría de instalaciones son retrofit sobre flota en operación. Se planifica para minimizar el tiempo de inmovilización del vehículo y, según el caso, puede hacerse de forma escalonada por lotes de vehículos.',
          },
          {
            question: '¿Cuánto tiempo está inmovilizado el vehículo?',
            answer:
              'Depende del tipo de vehículo, del número de cámaras y de la complejidad de la integración. Lo definimos en el análisis previo para que sepas con antelación el tiempo de taller de cada unidad y puedas planificar la operación de tu flota.',
          },
          {
            question: '¿La instalación afecta a la garantía del vehículo?',
            answer:
              'La instalación se realiza respetando la integridad del vehículo y siguiendo buenas prácticas de integración embarcada. Cada caso se valora para que la instalación sea compatible con las condiciones de tu flota.',
          },
          {
            question: '¿Por qué no comprar el equipo y montarlo por mi cuenta?',
            answer:
              'Puedes, pero el rendimiento real de estos sistemas depende de la posición de las cámaras, la calibración y el ajuste de la detección a cada geometría. Una instalación incorrecta puede dejar zonas críticas sin cubrir, que es justo el riesgo que se quería eliminar.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Cuéntanos cómo es tu flota y te decimos cómo instalarlo',
        description:
          'Analizamos geometría, maniobras y operación real para definir la instalación correcta de tus equipos embarcados. Sin compromiso.',
        buttonLabel: 'Solicitar evaluación técnica',
        buttonHref: '/#contacto',
        relatedLinks: [
          {
            href: '/mantenimiento-sistemas-seguridad-flotas',
            label: 'Mantenimiento de sistemas de seguridad',
          },
          {
            href: '/vision-360-vehiculos-industriales',
            label: 'Visión 360° para vehículos industriales',
          },
          { href: '/quienes-somos', label: 'Quiénes somos' },
        ],
      }}
    />
  );
}
