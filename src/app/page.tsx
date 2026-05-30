
import { AeoContext } from '@/components/sections/aeo-context';
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
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

  // VideoObject schemas para los 3 vídeos Vimeo de demo del producto.
  const videoSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Visión Perimetral 360° para Autobuses y Camiones - Demo',
      description:
        'Demostración del sistema de visión perimetral 360° de Vision360IA: cámaras HD con visión artificial que eliminan puntos ciegos en autobuses y camiones.',
      thumbnailUrl: `${SITE_URL}/images/winfin_vision360ia_1.jpg`,
      uploadDate: '2024-01-15',
      contentUrl: 'https://vimeo.com/1133755711',
      embedUrl: 'https://player.vimeo.com/video/1133755711',
      duration: 'PT2M',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'ADAS Anti-Atropellos: Detección de Peatones y Ciclistas con IA',
      description:
        'Sistema ADAS con alertas inteligentes para detección de peatones y ciclistas (VRU), colisión frontal (FCW) y salida de carril (LDW) mediante cámaras con visión artificial.',
      thumbnailUrl: `${SITE_URL}/images/winfin_vision360ia_2.jpg`,
      uploadDate: '2024-01-15',
      contentUrl: 'https://vimeo.com/1133755727',
      embedUrl: 'https://player.vimeo.com/video/1133755727',
      duration: 'PT2M',
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Gestión de Flotas con Análisis IA y Reportes',
      description:
        'Plataforma de análisis de flota con IA: evaluación de conductores, reconstrucción de eventos críticos y KPIs en tiempo real para flotas de autobuses, camiones y vehículos industriales.',
      thumbnailUrl: `${SITE_URL}/images/winfin_vision360ia_3.jpg`,
      uploadDate: '2024-01-15',
      contentUrl: 'https://vimeo.com/1133755748',
      embedUrl: 'https://player.vimeo.com/video/1133755748',
      duration: 'PT2M',
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
        <Faq translations={defaultTranslations} />
        <Contact />
      </div>
    </>
  );
}
