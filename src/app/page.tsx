
import { AeoContext } from '@/components/sections/aeo-context';
import { Contact } from '@/components/sections/contact';
import { DemoValidation } from '@/components/shared/demo-validation';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { LatestNews } from '@/components/sections/latest-news';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { Solutions } from '@/components/sections/solutions';
import { WhyUs } from '@/components/sections/why-us';
import { translations } from '@/lib/translations';
import { JsonLd } from '@/components/seo/json-ld';
import {
  faqPageSchema,
  ORGANIZATION_ID,
  SITE_URL,
} from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Nota: este title NO pasa por el template del layout (mismo segmento de
  // ruta), por eso añadimos el sufijo manualmente. Las páginas descendientes
  // (/adas-camiones, /aviso-legal, etc.) SÍ heredan el template '%s | Vision360IA'.
  title:
    'ADAS para flotas con cámaras 360° y detección de peatones | Vision360IA',
  description:
    'Sistema de cámaras 360° con detección de peatones y ciclistas para autobuses, camiones y vehículos municipales. Reduce puntos ciegos, mejora seguridad urbana y facilita cumplimiento GSR.',
  keywords: [
    'sistemas ADAS flotas',
    'sistemas ADAS vehiculos industriales',
    'sistemas ADAS camiones',
    'ADAS autobuses',
    'vision perimetral ADAS',
    'proveedor ADAS España',
    'instalacion ADAS flotas',
    'ADAS transporte pesado',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Visión 360° inteligente para flotas urbanas | Vision360IA',
    description:
      'Reduce accidentes en maniobras urbanas con cámaras 360°, detección de peatones y ciclistas y solución ADAS para autobuses, camiones y vehículos municipales.',
    url: SITE_URL,
    type: 'website',
  },
};

export default async function Home() {
  // Traducciones por defecto en el servidor (español)
  const defaultTranslations = translations.es;

  // Schema Product (específico de la home — describe el sistema Vision360IA
  // como producto B2B con sus propiedades técnicas, GSR, garantía, etc.).
  const productSchema = {
    '@context': 'https://schema.org',
    // Usamos Service (no Product): Vision360IA es una solución/servicio B2B
    // que se cotiza por proyecto, sin precio público ni reviews verificables.
    // Google exige a un Product al menos offers/review/aggregateRating; un
    // Service no, y describe mejor lo que se ofrece (sistema + instalación).
    '@type': 'Service',
    '@id': `${SITE_URL}/#product`,
    name: 'Sistema de Visión Perimetral 360° para Autobuses y Camiones',
    serviceType: 'Sistema ADAS y visión perimetral 360° para flotas',
    alternateName: [
      'Vision 360 Autobús',
      'Visión Perimetral Bus',
      'Kit Visión 360 Industrial',
      'ADAS Anti-Atropellos Peatones',
      'Cámaras Visión Artificial Flotas',
    ],
    description:
      'Sistema de cámaras 360° con detección de peatones y ciclistas para autobuses, camiones, vehículos municipales e industriales. Reduce puntos ciegos, mejora la seguridad en maniobras urbanas y facilita cumplimiento GSR con una solución profesional compatible con flotas de 12V y 24V.',
    image: `${SITE_URL}/images/og-image.jpg`,
    brand: {
      '@type': 'Brand',
      name: 'Vision360IA',
      logo: `${SITE_URL}/logo.png`,
    },
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'España' },
    category:
      'Sistemas de Visión Perimetral 360 para Autobuses y Camiones',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Certificación GSR',
        value: 'R151 (BSIS), R158 (Marcha atrás), R159 (MOIS)',
      },
      { '@type': 'PropertyValue', name: 'Protección IP', value: 'IP69K' },
      { '@type': 'PropertyValue', name: 'Voltaje', value: '12V y 24V' },
      {
        '@type': 'PropertyValue',
        name: 'Ángulo de cámara',
        value: '>180° (ojo de pez HD)',
      },
      {
        '@type': 'PropertyValue',
        name: 'Vehículos compatibles',
        value:
          'Autobuses urbanos, interurbanos, camiones, flotas industriales',
      },
      {
        '@type': 'PropertyValue',
        name: 'Funcionalidades ADAS',
        value: 'FCW, LDW, VRU, BSD',
      },
    ],
    // Nota: NO incluimos `offers` con precio. Vision360IA es un sistema B2B
    // que se cotiza por proyecto (depende de flota, vehículo, instalación),
    // no tiene precio público fijo. Un `offers` sin `price` genera el error
    // crítico "Falta el campo price" en Google Merchant listings, y poner un
    // precio falso engañaría a Google y al usuario. Un Product sin offers
    // sigue siendo válido en Schema.org y mantiene marca, fabricante y specs.
  };

  // VideoObject schemas de los 5 vídeos de demostración reales (Vimeo).
  const videoSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vision360IA: visión 360° con IA para flotas',
      description:
        'Presentación de Vision360IA: visión perimetral 360° con inteligencia artificial para autobuses, camiones y vehículos industriales. Elimina puntos ciegos y detecta peatones, ciclistas y vehículos en tiempo real.',
      thumbnailUrl: `${SITE_URL}/images/demo-vision360-1.jpg`,
      uploadDate: '2026-05-31',
      contentUrl: 'https://vimeo.com/1197096755',
      embedUrl: 'https://player.vimeo.com/video/1197096755',
      duration: 'PT59S',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vision360IA: inteligencia y seguridad en tiempo real',
      description:
        'El sistema procesa el entorno del vehículo en tiempo real con IA embarcada y genera alertas de seguridad al conductor en maniobras y zonas de riesgo.',
      thumbnailUrl: `${SITE_URL}/images/demo-vision360-2.jpg`,
      uploadDate: '2026-05-31',
      contentUrl: 'https://vimeo.com/1197096750',
      embedUrl: 'https://player.vimeo.com/video/1197096750',
      duration: 'PT32S',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vision360IA en conducción real',
      description:
        'Funcionamiento de Vision360IA durante la conducción real: visión 360° y detección del entorno en circulación. No es render ni simulación.',
      thumbnailUrl: `${SITE_URL}/images/demo-vision360-3.jpg`,
      uploadDate: '2026-05-31',
      contentUrl: 'https://vimeo.com/1197096752',
      embedUrl: 'https://player.vimeo.com/video/1197096752',
      duration: 'PT30S',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vision360IA analiza el entorno del vehículo en tiempo real',
      description:
        'Cómo el sistema detecta y clasifica peatones, ciclistas, vehículos y obstáculos alrededor del vehículo en tiempo real para anticipar el riesgo en maniobra.',
      thumbnailUrl: `${SITE_URL}/images/demo-vision360-4.jpg`,
      uploadDate: '2026-05-31',
      contentUrl: 'https://vimeo.com/1197096749',
      embedUrl: 'https://player.vimeo.com/video/1197096749',
      duration: 'PT22S',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vision360IA: visión perimetral 360° con 4 cámaras simultáneas',
      description:
        'Demostración de Vision360IA con las cuatro cámaras perimetrales activas simultáneamente (frontal, trasera, lateral derecha e izquierda), cubriendo el entorno completo del vehículo con detección IA en tiempo real en todos los ángulos.',
      thumbnailUrl: `${SITE_URL}/images/demo-vision360-5.jpg`,
      uploadDate: '2026-05-31',
      contentUrl: 'https://vimeo.com/1197096751',
      embedUrl: 'https://player.vimeo.com/video/1197096751',
      duration: 'PT20S',
      publisher: { '@id': ORGANIZATION_ID },
    },
  ];

  // FAQPage schema generado server-side desde las traducciones (antes
  // estaba en el componente client `<Faq />`, lo que impedía que Google
  // lo viera al hacer crawl sin ejecutar JS).
  const faqSchema = faqPageSchema(defaultTranslations.faqs);

  return (
    <>
      <JsonLd data={[productSchema, ...videoSchemas, faqSchema]} />

      <div className="flex flex-col">
        <Hero translations={defaultTranslations} />
        {/*
         * Bloque AEO (Answer Engine Optimization): contenido server-side
         * estructurado en 5 sub-secciones (definición, audiencia, problema,
         * diferencia, por qué WINFIN). Inyectado después del Hero para que
         * Google, Bing y los LLMs lo encuentren temprano en el HTML.
         */}
        <AeoContext />
        <Solutions />
        <WhyUs translations={defaultTranslations} />
        <ProductShowcase translations={defaultTranslations} />
        <DemoValidation />
        <Faq translations={defaultTranslations} />
        <LatestNews />
        <Contact />
      </div>
    </>
  );
}
