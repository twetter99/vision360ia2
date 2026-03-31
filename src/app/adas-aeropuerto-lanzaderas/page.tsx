import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'ADAS para aeropuerto y lanzaderas con visión 360° | Vision360IA',
  description: 'Solución ADAS con visión 360°, detección VRU y cámaras inteligentes para shuttle buses, lanzaderas, minibuses y operación en terminales aeroportuarias.',
  keywords: ['ADAS aeropuerto', 'lanzaderas aeropuerto', 'visión 360 shuttle bus', 'ADAS minibuses aeropuerto', 'seguridad terminales aeropuerto'],
  alternates: {
    canonical: 'https://www.vision360ia.com/adas-aeropuerto-lanzaderas',
  },
  openGraph: {
    title: 'ADAS para aeropuerto y lanzaderas | Vision360IA',
    description: 'Cobertura específica para shuttle buses, lanzaderas y vehículos de apoyo en entorno aeroportuario.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ADAS para aeropuerto y lanzaderas',
    description: 'Guía sobre visión 360° y protección VRU en shuttle buses, lanzaderas y operación aeroportuaria.',
    about: ['aeropuerto', 'lanzaderas', 'shuttle bus', 'visión 360', 'ADAS'],
  },
];

export default function AdasAeropuertoLanzaderasPage() {
  return (
    <SupportPage
      title="ADAS para aeropuerto y lanzaderas: visión 360° para terminales, shuttle buses y maniobras de acceso"
      description="El entorno aeroportuario combina tráfico mixto, paradas frecuentes, maniobras de aproximación, equipaje, peatones y vehículos de apoyo. Esta página aterriza cómo Vision360IA encaja en lanzaderas, minibuses y operaciones de viajeros en terminales."
      eyebrow="COBERTURA SECTORIAL"
      breadcrumbLabel="ADAS para Aeropuerto y Lanzaderas"
      schemas={schemas}
      primarySolution={{
        href: '/adas-autocares-minibuses',
        label: 'Ver solución base para autocares y minibuses',
        helperText: 'Si buscas la cobertura principal para vehículos de viajeros sobre la que se apoya este sector, esta es la página base recomendada.',
      }}
      intro={{
        badge: 'Aeropuerto y terminales',
        highlights: ['Shuttle buses', 'Lanzaderas', 'Terminales', 'Protección VRU'],
      }}
      sections={[
        {
          eyebrow: 'Contexto operativo',
          title: 'Por qué el entorno aeropuerto exige una cobertura específica',
          paragraphs: [
            'En aeropuertos conviven lanzaderas, minibuses, autocares, vehículos de servicio, equipaje, peatones y zonas de acceso con alta rotación. El riesgo no es solo urbano ni solo industrial: es mixto y muy sensible a maniobras de aproximación y parada.',
            'Eso hace útil una arquitectura de visión 360° y detección de usuarios vulnerables que ayude a mantener visibilidad y control en terminales, aparcamientos, carriles de espera y zonas de carga de pasajeros.',
          ],
        },
        {
          eyebrow: 'Escenarios frecuentes',
          title: 'Dónde se concentra más riesgo en aeropuerto y lanzaderas',
          items: [
            'Aproximación a terminal con tráfico peatonal y equipajes en movimiento.',
            'Lanzaderas hoteleras o de parking con maniobras repetidas de parada.',
            'Minibuses con accesos estrechos y giros en zona de recogida.',
            'Convivencia con vehículos de apoyo y señalización cambiante en entorno aeroportuario.',
          ],
        },
        {
          eyebrow: 'Conexión con la web actual',
          title: 'Cómo se apoya esta cobertura en autobuses, autocares y VRU',
          paragraphs: [
            'Esta página no reemplaza a la solución principal de autobuses ni a la cobertura de autocares y minibuses. La refuerza desde una intención sectorial clara: aeropuerto, lanzaderas y terminales.',
            'Su función es captar búsquedas más específicas y conducirlas hacia la arquitectura más adecuada de visión 360°, protección VRU y configuración por geometría de vehículo.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ aeropuerto',
        title: 'Preguntas frecuentes sobre lanzaderas y entorno aeroportuario',
        items: [
          {
            question: '¿Una lanzadera de aeropuerto necesita la misma solución que un autobús urbano?',
            answer: 'No necesariamente. Comparte parte de la lógica de seguridad, pero el entorno de terminal, los accesos y la operativa de parada exigen ajustar la configuración al servicio real.',
          },
          {
            question: '¿Esta cobertura aplica también a minibuses y shuttle buses?',
            answer: 'Sí. Está pensada precisamente para shuttle buses, minibuses, lanzaderas hoteleras o de parking y otras operaciones de viajeros en entorno aeroportuario.',
          },
          {
            question: '¿Compite con la página de autocares y minibuses?',
            answer: 'No. La complementa desde una intención sectorial. Una cubre tipología de vehículo y la otra cubre un entorno operativo concreto.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Revisa la cobertura adecuada para tu operación en terminales y lanzaderas',
        description: 'Analizamos maniobras, flujos de pasajeros, geometría del vehículo y zonas de riesgo para plantear una solución coherente.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/adas-autocares-minibuses', label: 'Autocares y Minibuses' },
          { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
          { href: '/anti-atropellos-peatones-ciclistas', label: 'Protección VRU' },
        ],
      }}
    />
  );
}