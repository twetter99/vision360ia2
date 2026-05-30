import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Detección de ángulos muertos en camiones y autobuses',
  description:
    'Qué son los ángulos muertos en vehículos pesados, por qué provocan atropellos y cómo eliminarlos con visión 360° y detección de peatones y ciclistas por IA en camiones, autobuses y flotas.',
  keywords: [
    'detección ángulos muertos',
    'ángulos muertos camión',
    'punto ciego camión',
    'punto ciego autobús',
    'eliminar ángulos muertos vehículo',
    'detección punto ciego flota',
    'sistema ángulo muerto camión',
    'BSD vehículos pesados',
  ],
  alternates: {
    canonical: '/deteccion-angulos-muertos',
  },
  openGraph: {
    title: 'Detección de ángulos muertos en camiones y autobuses | Vision360IA',
    description:
      'Por qué los puntos ciegos provocan atropellos y cómo eliminarlos con visión 360° y detección por IA en flotas profesionales.',
    url: `${SITE_URL}/deteccion-angulos-muertos`,
    type: 'article',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    image: ['https://www.vision360ia.com/images/og-image.jpg'],
    headline: 'Detección de ángulos muertos en camiones y autobuses',
    description:
      'Guía sobre los ángulos muertos en vehículos pesados, su relación con los atropellos y cómo eliminarlos con visión 360° y detección por IA.',
    about: ['ángulos muertos', 'punto ciego', 'BSD', 'seguridad vial', 'camiones', 'autobuses'],
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: '2026-05-29',
    dateModified: '2026-05-29',
    inLanguage: 'es-ES',
  },
];

export default function DeteccionAngulosMuertosPage() {
  return (
    <SupportPage
      title="Detección de ángulos muertos: por qué son el origen de muchos atropellos y cómo eliminarlos"
      description="Los ángulos muertos —las zonas alrededor del vehículo que el conductor no puede ver— son una de las principales causas de atropellos a peatones y ciclistas en entorno urbano, especialmente con camiones y autobuses. Esta guía explica por qué se producen y cómo eliminarlos con visión 360° y detección por IA."
      eyebrow="SEGURIDAD"
      breadcrumbLabel="Detección de ángulos muertos"
      breadcrumbCategory="Seguridad"
      schemas={schemas}
      primarySolution={{
        href: '/anti-atropellos-peatones-ciclistas',
        label: 'Ver la solución anti-atropellos',
        helperText:
          'Si buscas directamente la solución para proteger a peatones y ciclistas, esta es la página principal.',
      }}
      intro={{
        badge: 'Puntos ciegos y prevención',
        highlights: ['Por qué ocurren', 'Maniobras de riesgo', 'Visión 360° + IA', 'Camiones y autobuses'],
      }}
      sections={[
        {
          eyebrow: 'Qué son',
          title: 'Qué es un ángulo muerto y por qué es peligroso',
          paragraphs: [
            'Un ángulo muerto (o punto ciego) es cada una de las zonas alrededor del vehículo que el conductor no puede ver directamente ni a través de los espejos. En vehículos pesados como camiones y autobuses estas zonas son grandes: el frontal alto, los laterales y especialmente el lado del copiloto en los giros son áreas donde un peatón o un ciclista puede desaparecer por completo de la vista del conductor.',
            'El problema es más grave precisamente donde hay más usuarios vulnerables: en ciudad, a baja velocidad, en cruces y maniobras. Por eso una parte importante de los atropellos graves con vehículos pesados se concentra en estas situaciones.',
          ],
        },
        {
          eyebrow: 'Dónde ocurren',
          title: 'Las maniobras donde el ángulo muerto mata',
          items: [
            'Giro a la derecha: el ciclista que circula por el lateral derecho desaparece del campo de visión justo cuando el vehículo gira hacia él.',
            'Arranque desde parada o semáforo: un peatón cruzando por delante puede quedar oculto bajo la línea de visión frontal.',
            'Marcha atrás: la zona trasera es un punto ciego total sin ayudas visuales.',
            'Maniobras en obra, muelles o recogida de residuos: operarios a pie alrededor del vehículo en movimiento.',
          ],
        },
        {
          eyebrow: 'La solución',
          title: 'Cómo se eliminan los ángulos muertos con visión 360° e IA',
          paragraphs: [
            'La forma más eficaz de eliminar los ángulos muertos no es añadir más espejos, sino dar al conductor una visión completa del entorno. La visión 360° fusiona varias cámaras en una vista cenital del vehículo que no deja zonas sin cubrir, y la detección por IA identifica automáticamente a peatones y ciclistas en esas zonas críticas y avisa al conductor a tiempo.',
            'Así se pasa de "ver mejor" a "ser advertido del riesgo": el sistema no depende solo de que el conductor mire el monitor en el momento exacto, sino que genera una alerta activa cuando detecta a una persona en una zona de peligro. Es la diferencia entre una cámara pasiva y un sistema de prevención.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Ángulos muertos',
        title: 'Preguntas frecuentes sobre la detección de ángulos muertos',
        items: [
          {
            question: '¿No basta con poner más espejos o una cámara de marcha atrás?',
            answer:
              'Los espejos siguen dejando zonas ciegas y exigen que el conductor mire al sitio correcto en el momento justo. Una cámara de marcha atrás solo cubre la parte trasera. La visión 360° con detección por IA cubre todo el perímetro y avisa activamente, que es lo que reduce de verdad el riesgo.',
          },
          {
            question: '¿Cómo distingue la IA a un peatón de un objeto fijo?',
            answer:
              'El software de detección está entrenado para reconocer patrones de personas y ciclistas y diferenciarlos del mobiliario urbano u otros objetos, priorizando las alertas en las zonas y situaciones de mayor riesgo. La precisión real depende de la calidad del sistema y de su correcta instalación y calibración.',
          },
          {
            question: '¿Funciona en cualquier tipo de vehículo?',
            answer:
              'Sí, adaptando la configuración. No es lo mismo cubrir los ángulos muertos de un autobús articulado que los de un camión de basura con operarios a pie o una máquina de obra. El número y posición de cámaras se define según la geometría de cada vehículo.',
          },
          {
            question: '¿Se puede instalar en mi flota actual?',
            answer:
              'Sí. La detección de ángulos muertos con visión 360° se instala habitualmente como retrofit sobre flota en operación, sin necesidad de renovar los vehículos.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Elimina los ángulos muertos de tu flota antes de que sea un problema',
        description:
          'Analizamos los puntos ciegos reales de tus vehículos y sus maniobras críticas para definir la cobertura de visión 360° y detección que necesita tu flota.',
        buttonLabel: 'Solicitar evaluación técnica',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/anti-atropellos-peatones-ciclistas', label: 'Protección de peatones y ciclistas' },
          { href: '/que-es-vision-360-vehiculos', label: 'Qué es la visión 360°' },
          { href: '/bsis-camiones-autobuses', label: 'Sistema BSIS (R151)' },
        ],
      }}
    />
  );
}
