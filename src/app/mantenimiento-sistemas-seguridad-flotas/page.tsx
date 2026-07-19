import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Mantenimiento de sistemas de seguridad para flotas',
  description:
    'Mantenimiento preventivo y correctivo de cámaras 360°, sistemas de detección y equipos de seguridad embarcados en flotas. Recalibración, soporte técnico y garantía operativa por WINFIN.',
  keywords: [
    'mantenimiento sistemas seguridad flotas',
    'mantenimiento cámaras 360 flota',
    'recalibración cámaras vehículo',
    'soporte técnico equipos embarcados',
    'mantenimiento ADAS flota',
    'SAT sistemas seguridad vehículos',
    'mantenimiento preventivo flota',
  ],
  alternates: {
    canonical: '/mantenimiento-sistemas-seguridad-flotas',
  },
  openGraph: {
    images: [{ url: 'https://www.vision360ia.com/images/og-image.jpg', width: 1200, height: 630, alt: 'Vision360IA — visión 360° con inteligencia artificial para flotas' }],
    title: 'Mantenimiento de sistemas de seguridad para flotas | Vision360IA',
    description:
      'Mantenemos operativos tus sistemas de visión 360° y detección: recalibración, soporte y revisión preventiva para que la seguridad no falle cuando más importa.',
    url: `${SITE_URL}/mantenimiento-sistemas-seguridad-flotas`,
    type: 'website',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mantenimiento de sistemas de seguridad para flotas',
    serviceType: 'Mantenimiento preventivo y correctivo de sistemas embarcados de seguridad',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'España' },
    description:
      'Servicio de mantenimiento preventivo y correctivo de cámaras 360°, sistemas de detección de peatones y ciclistas y equipos de seguridad embarcados: revisión, recalibración, sustitución de componentes y soporte técnico para flotas profesionales.',
    audience: {
      '@type': 'BusinessAudience',
      name: 'Flotas profesionales y operadores de transporte',
    },
  },
];

export default function MantenimientoSistemasSeguridadPage() {
  return (
    <SupportPage
      title="Mantenimiento de sistemas de seguridad para flotas: que la protección no falle cuando más importa"
      description="Un sistema de seguridad solo cumple su función si está operativo el día que ocurre el incidente. WINFIN mantiene cámaras 360°, detección por IA y equipos embarcados con revisión preventiva, recalibración y soporte técnico, para que tu flota no quede expuesta por un equipo desajustado o averiado."
      eyebrow="SERVICIO"
      breadcrumbLabel="Mantenimiento de sistemas de seguridad"
      breadcrumbCategory="Servicios"
      schemas={schemas}
      primarySolution={{
        href: '/instalacion-equipos-embarcados-flotas',
        label: 'Ver el servicio de instalación',
        helperText:
          'Si todavía no has instalado el sistema, esta es la página del servicio de instalación e integración embarcada.',
      }}
      intro={{
        badge: 'Mantenimiento y soporte',
        highlights: [
          'Revisión preventiva',
          'Recalibración',
          'Soporte técnico',
          'Garantía operativa',
        ],
      }}
      sections={[
        {
          eyebrow: 'Por qué importa',
          title: 'Un sistema de seguridad desajustado es un riesgo silencioso',
          paragraphs: [
            'Las cámaras se ensucian, se desajustan con las vibraciones, sufren golpes en la operación diaria y los lavados a presión. Un sistema de visión 360° o de detección que ha perdido calibración puede seguir encendido pero dejar zonas ciegas sin cubrir, justo cuando más se necesita.',
            'El mantenimiento no es un extra: en sistemas de seguridad es lo que garantiza que la inversión siga protegiendo. Por eso acompañamos cada instalación con un plan de mantenimiento adaptado a la intensidad de uso de cada flota.',
          ],
        },
        {
          eyebrow: 'Qué incluye',
          title: 'Qué cubre el mantenimiento',
          items: [
            'Revisión preventiva: estado de cámaras, cableado, unidad de control y monitor de cabina.',
            'Recalibración: reajuste de la fusión 360° y de la detección por IA cuando se desvía.',
            'Mantenimiento correctivo: diagnóstico y sustitución de componentes dañados.',
            'Soporte técnico: ayuda ante incidencias y dudas de operación de la flota.',
            'Actualizaciones: puesta al día del sistema cuando aplica a tu configuración.',
          ],
        },
        {
          eyebrow: 'Para qué flotas',
          title: 'Adaptado a la intensidad de cada operación',
          paragraphs: [
            'No requiere el mismo mantenimiento un autobús urbano que opera 18 horas al día que una furgoneta de reparto o una máquina de obra expuesta a polvo y golpes. El plan se dimensiona según el tipo de vehículo, las condiciones de trabajo y la criticidad de la operación.',
            'Trabajamos sobre flotas de autobuses, camiones, furgonetas de reparto, vehículos de recogida de residuos, maquinaria agrícola, maquinaria de obras públicas y vehículos industriales, en entornos urbanos, logísticos, aeroportuarios o de baja visibilidad.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Mantenimiento',
        title: 'Preguntas frecuentes sobre el mantenimiento de sistemas de seguridad',
        items: [
          {
            question: '¿Cada cuánto hay que revisar el sistema?',
            answer:
              'Depende de la intensidad de uso y de las condiciones de la flota. Un vehículo urbano con muchas horas y lavados frecuentes necesita revisiones más seguidas que uno de uso moderado. Lo definimos según tu operación real.',
          },
          {
            question: '¿Por qué se descalibra una cámara 360°?',
            answer:
              'Por vibraciones, golpes, lavados a presión, cambios de temperatura o pequeños desplazamientos en los soportes. Una desviación mínima en el ángulo de una cámara puede abrir una zona ciega en la vista cenital, por eso la recalibración periódica es importante.',
          },
          {
            question: '¿Mantenéis sistemas que no instalasteis vosotros?',
            answer:
              'Lo valoramos caso por caso. La viabilidad depende del tipo de equipo, su estado y la información técnica disponible. Lo revisamos antes de comprometernos a un plan de mantenimiento.',
          },
          {
            question: '¿Qué pasa si falla un componente en plena operación?',
            answer:
              'Para eso está el mantenimiento correctivo y el soporte técnico: diagnóstico del problema y sustitución del componente afectado, con el objetivo de devolver el vehículo a operación con la protección completa lo antes posible.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Mantén tu flota protegida durante toda la vida del sistema',
        description:
          'Definimos un plan de mantenimiento adaptado a tu flota y a su intensidad de uso para que la seguridad siga funcionando años después de la instalación.',
        buttonLabel: 'Solicitar información de mantenimiento',
        buttonHref: '/#contacto',
        relatedLinks: [
          {
            href: '/instalacion-equipos-embarcados-flotas',
            label: 'Instalación de equipos embarcados',
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
