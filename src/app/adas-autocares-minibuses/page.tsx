import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'ADAS para autocares y minibuses con visión 360° | Vision360IA',
  description: 'Solución ADAS con visión 360°, detección de peatones y protección VRU para autocares, minibuses, lanzaderas y transporte de viajeros con maniobras críticas.',
  keywords: ['ADAS autocares', 'ADAS minibuses', 'visión 360 autocares', 'detección peatones minibuses', 'seguridad lanzaderas aeropuerto', 'sistema ADAS transporte viajeros'],
  alternates: {
    canonical: 'https://www.vision360ia.com/adas-autocares-minibuses',
  },
  openGraph: {
    title: 'ADAS para autocares y minibuses | Vision360IA',
    description: 'Cobertura específica para autocares, minibuses y lanzaderas con visión 360° y protección VRU.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ADAS para autocares y minibuses',
    description: 'Guía explicativa sobre cómo aplicar visión 360° y protección VRU a autocares, minibuses y lanzaderas.',
    about: ['autocares', 'minibuses', 'lanzaderas', 'visión 360', 'ADAS'],
  },
];

export default function AdasAutocaresMinibusesPage() {
  return (
    <SupportPage
      title="ADAS para autocares y minibuses: visión 360° y protección VRU para servicios de viajeros"
      description="Autocares, minibuses y lanzaderas comparten parte del riesgo de un autobús, pero no siempre la misma geometría ni el mismo contexto operativo. Esta cobertura ayuda a responder a búsquedas más específicas sin competir con la landing principal de autobuses."
      eyebrow="COBERTURA DE VEHÍCULO"
      breadcrumbLabel="ADAS para Autocares y Minibuses"
      schemas={schemas}
      primarySolution={{
        href: '/adas-autobuses',
        label: 'Ver solución base para autobuses',
        helperText: 'Si buscas la solución principal para operación de autobús y transporte de viajeros, esta es la landing base que concentra la propuesta más fuerte del sitio.',
      }}
      intro={{
        badge: 'Autocares y minibuses',
        highlights: ['Servicios discrecionales', 'Lanzaderas y aeropuerto', 'Transporte escolar', 'Protección VRU'],
      }}
      sections={[
        {
          eyebrow: 'Qué cambia',
          title: 'Por qué autocares y minibuses necesitan un enfoque específico',
          paragraphs: [
            'Aunque comparten parte de la lógica de seguridad de un autobús urbano, autocares y minibuses operan con geometrías, rutas y maniobras distintas. Los riesgos cambian según longitud del vehículo, entorno de parada, accesos a terminales, colegios, hoteles o aeropuertos.',
            'Por eso tiene sentido hablar de una configuración adaptada: visión 360°, detección de peatones y ciclistas y cobertura de maniobras que responda al servicio real del vehículo.',
          ],
        },
        {
          eyebrow: 'Escenarios típicos',
          title: 'Dónde se concentra más riesgo en estas tipologías',
          items: [
            'Lanzaderas hoteleras o aeroportuarias con maniobras en espacios estrechos.',
            'Minibuses escolares con pasajeros alrededor del vehículo en parada.',
            'Autocares discrecionales con accesos complejos a estaciones o terminales.',
            'Servicios regionales donde se alterna circulación abierta y entorno urbano.',
          ],
        },
        {
          eyebrow: 'Encaje con Vision360IA',
          title: 'Cómo se conecta con la arquitectura ya existente de autobuses',
          paragraphs: [
            'Vision360IA ya trabaja bien el entorno autobús. Esta página no abre una solución distinta, sino una capa de precisión para autocares, minibuses, lanzaderas y operaciones de viajeros donde la intención de búsqueda es más específica.',
            'El valor está en adaptar geometría, zonas de cobertura y contexto de maniobra, manteniendo la base de visión 360°, detección VRU y despliegue retrofit sobre flota existente.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ por tipología',
        title: 'Preguntas frecuentes sobre autocares y minibuses',
        items: [
          {
            question: '¿Un autocar necesita la misma configuración que un autobús urbano?',
            answer: 'No siempre. El riesgo operativo y la geometría cambian. La arquitectura base puede ser similar, pero la distribución de cámaras y prioridades de maniobra deben ajustarse al servicio real.',
          },
          {
            question: '¿Los minibuses escolares o lanzaderas también se benefician de visión 360°?',
            answer: 'Sí. En vehículos compactos el riesgo no desaparece. De hecho, las paradas, el entorno escolar y los accesos con peatones convierten la visibilidad perimetral en una ayuda muy útil.',
          },
          {
            question: '¿Esta cobertura compite con la solución para autobuses?',
            answer: 'No. La refuerza. Sirve para responder a búsquedas más específicas de autocares, minibuses y lanzaderas, y redirigir después a la solución base cuando tiene más sentido comercial.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Define la mejor configuración para autocares, minibuses o lanzaderas',
        description: 'Revisamos maniobras, longitud, contexto de servicio y zonas de riesgo para plantear una arquitectura coherente.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
          { href: '/anti-atropellos-peatones-ciclistas', label: 'Protección VRU' },
          { href: '/bsis-camiones-autobuses', label: 'Sistema BSIS' },
        ],
      }}
    />
  );
}