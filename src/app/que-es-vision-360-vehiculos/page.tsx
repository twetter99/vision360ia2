import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Qué es la visión 360° en vehículos y cómo elimina los puntos ciegos',
  description:
    'Qué es la visión 360° en vehículos, cómo funciona la fusión de cámaras en una vista cenital y por qué elimina los puntos ciegos en autobuses, camiones y flotas. Guía clara con ejemplos.',
  keywords: [
    'qué es visión 360 vehículos',
    'visión perimetral vehículo',
    'cómo funciona cámara 360 camión',
    'vista cenital vehículo',
    'visión 360 autobús',
    'sistema cámaras 360 flota',
    'visión envolvente camión',
  ],
  alternates: {
    canonical: '/que-es-vision-360-vehiculos',
  },
  openGraph: {
    title: 'Qué es la visión 360° en vehículos | Vision360IA',
    description:
      'Definición, funcionamiento y usos de la visión perimetral 360° en autobuses, camiones y vehículos industriales.',
    url: `${SITE_URL}/que-es-vision-360-vehiculos`,
    type: 'article',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    image: ['https://www.vision360ia.com/images/og-image.jpg'],
    headline: 'Qué es la visión 360° en vehículos: definición, funcionamiento y usos',
    description:
      'Guía educativa sobre la visión perimetral 360° en vehículos industriales: qué es, cómo funciona, componentes, ventajas y diferencias con una cámara convencional.',
    about: ['visión 360', 'visión perimetral', 'cámaras vehículo', 'vista cenital', 'seguridad vial'],
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: '2026-05-29',
    dateModified: '2026-05-29',
    inLanguage: 'es-ES',
  },
];

export default function QueEsVision360VehiculosPage() {
  return (
    <SupportPage
      title="Qué es la visión 360° en vehículos y cómo funciona"
      description="La visión 360° en vehículos industriales es una tecnología de seguridad que combina varias cámaras alrededor del vehículo para generar una vista aérea unificada de su entorno, eliminando los puntos ciegos del conductor. Esta guía explica qué es, cómo funciona, qué componentes la forman y en qué se diferencia de una cámara convencional."
      eyebrow="GUÍA"
      breadcrumbLabel="Qué es la visión 360° en vehículos"
      breadcrumbCategory="Recursos"
      schemas={schemas}
      primarySolution={{
        href: '/vision-360-vehiculos-industriales',
        label: 'Ver la solución de visión 360°',
        helperText:
          'Si ya sabes qué es y buscas la solución de visión 360° para tu flota, esta es la página principal del sistema.',
      }}
      intro={{
        badge: 'Guía técnica',
        highlights: ['Definición clara', 'Cómo funciona', 'Componentes', 'Vs. cámara convencional'],
      }}
      sections={[
        {
          eyebrow: 'Definición',
          title: 'Definición de visión 360° en vehículos',
          paragraphs: [
            'La visión 360° en vehículos industriales es una tecnología de seguridad que utiliza habitualmente cuatro cámaras de alta definición —ampliables hasta ocho en vehículos grandes o articulados— montadas alrededor del vehículo (frontal, laterales y trasera) para generar una vista cenital unificada del entorno inmediato. Esa vista aérea elimina los puntos ciegos del conductor y le permite ver personas, objetos y obstáculos que serían invisibles con los espejos retrovisores convencionales.',
            'Se utiliza principalmente en autobuses urbanos, camiones de distribución, vehículos de recogida de residuos, maquinaria y vehículos industriales, y es especialmente útil en maniobras de baja velocidad: giros, marcha atrás, salidas de parada y operaciones de carga y descarga.',
          ],
        },
        {
          eyebrow: 'Cómo funciona',
          title: 'Cómo funciona un sistema de visión 360°',
          paragraphs: [
            'Cada cámara capta una porción del entorno con un ángulo muy amplio (objetivos de gran angular u ojo de pez). Una unidad de control electrónico (ECU) recibe todas esas imágenes, corrige la distorsión óptica y las fusiona en tiempo real, generando una única vista cenital —como si una cámara mirara el vehículo desde arriba— que se muestra al conductor en un monitor de cabina.',
            'En los sistemas más avanzados, como Vision360IA, a esa visión se le añade una capa de inteligencia artificial que detecta automáticamente peatones, ciclistas y obstáculos y genera alertas, pasando de una ayuda pasiva (ver mejor) a una prevención activa (avisar del riesgo).',
          ],
        },
        {
          eyebrow: 'Componentes',
          title: 'Componentes de un sistema de visión 360°',
          items: [
            'Cámaras HD de gran angular: normalmente 4 (frontal, trasera y laterales), ampliables hasta 8 en vehículos articulados o de gran tamaño.',
            'Unidad de control (ECU): procesa, corrige y fusiona las imágenes en la vista cenital en tiempo real.',
            'Monitor de cabina: muestra la vista 360° al conductor.',
            'Software de IA (en sistemas avanzados): detecta peatones, ciclistas y obstáculos y emite alertas.',
            'Cableado e integración: conexión con la alimentación del vehículo (12V/24V) y, opcionalmente, con telemetría y grabación.',
          ],
        },
        {
          eyebrow: 'Diferencia clave',
          title: 'Visión 360° vs. cámara de marcha atrás convencional',
          paragraphs: [
            'Una cámara de marcha atrás convencional ofrece únicamente la vista posterior y de forma pasiva. La visión 360° combina simultáneamente las imágenes de varias cámaras para dar una visión integral de todo el perímetro del vehículo, eliminando puntos ciegos en todas las direcciones, no solo detrás.',
            'Y cuando incorpora IA, la diferencia es aún mayor: deja de ser solo una imagen para revisar y pasa a detectar activamente a los usuarios vulnerables y avisar al conductor antes de que ocurra el incidente.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Visión 360°',
        title: 'Preguntas frecuentes sobre la visión 360° en vehículos',
        items: [
          {
            question: '¿Cuántas cámaras necesita un sistema de visión 360°?',
            answer:
              'Lo habitual son 4 cámaras (frontal, trasera y dos laterales) para cubrir el perímetro completo. En vehículos articulados, camiones largos o maquinaria de gran tamaño pueden necesitarse hasta 8 para no dejar zonas sin cubrir.',
          },
          {
            question: '¿Funciona de noche y con mala visibilidad?',
            answer:
              'Las cámaras de estos sistemas están preparadas para trabajar en condiciones de poca luz. El rendimiento real depende del modelo de cámara y de la instalación; en entornos de muy baja visibilidad se diseña la configuración específica para mantener la cobertura.',
          },
          {
            question: '¿La visión 360° es lo mismo que un sistema ADAS?',
            answer:
              'No exactamente. La visión 360° aporta la percepción del entorno (ver). Un sistema ADAS añade funciones de asistencia y seguridad (detectar, avisar, ayudar en la maniobra). En soluciones como Vision360IA, ambas capas se combinan: visión 360° más detección por IA.',
          },
          {
            question: '¿Se puede instalar en un vehículo que ya está en uso?',
            answer:
              'Sí. La visión 360° se instala habitualmente como retrofit sobre vehículos en operación. La viabilidad y la configuración dependen del tipo de vehículo y de su geometría.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Descubre cómo aplicar la visión 360° a tu flota',
        description:
          'Te ayudamos a definir cuántas cámaras necesita cada vehículo y cómo configurar la visión 360° y la detección por IA para tu operación concreta.',
        buttonLabel: 'Solicitar evaluación técnica',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° para vehículos industriales' },
          { href: '/camaras-vision-artificial-flotas', label: 'Cámaras de visión artificial' },
          { href: '/deteccion-angulos-muertos', label: 'Detección de ángulos muertos' },
        ],
      }}
    />
  );
}
