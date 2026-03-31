
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { Solutions } from '@/components/sections/solutions';
import { WhyUs } from '@/components/sections/why-us';
import { translations } from '@/lib/translations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADAS para flotas con cámaras 360° y detección de peatones | Vision360IA',
  description: 'Sistema de cámaras 360° con detección de peatones y ciclistas para autobuses, camiones y vehículos municipales. Reduce puntos ciegos, mejora seguridad urbana y facilita cumplimiento GSR.',
  keywords: ['sistemas ADAS flotas', 'sistemas ADAS vehiculos industriales', 'sistemas ADAS camiones', 'ADAS autobuses', 'vision perimetral ADAS', 'proveedor ADAS España', 'instalacion ADAS flotas', 'ADAS transporte pesado'],
  openGraph: {
    title: 'Visión 360° inteligente para flotas urbanas | Vision360IA',
    description: 'Reduce accidentes en maniobras urbanas con cámaras 360°, detección de peatones y ciclistas y solución ADAS para autobuses, camiones y vehículos municipales.',
  },
}

export default async function Home() {
  // Obtenemos las traducciones por defecto en el servidor (español)
  const defaultTranslations = translations.es;
  
  // Schema.org JSON-LD para SEO - Optimizado para B2B
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.vision360ia.com/#organization",
    "name": "Vision360IA by WINFIN",
    "alternateName": ["Vision360IA", "WINFIN Instalaciones"],
    "url": "https://www.vision360ia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.vision360ia.com/logo.png",
      "width": 512,
      "height": 512
    },
    "description": "Empresa española especializada en sistemas ADAS y cámaras 360° para autobuses, camiones y vehículos municipales. Ayudamos a reducir puntos ciegos, mejorar seguridad urbana y desplegar soluciones sobre flotas profesionales con más de 20 años de experiencia y +2.000 vehículos instalados.",
    "foundingDate": "2003",
    "founder": {
      "@type": "Organization",
      "name": "WINFIN Instalaciones S.L."
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "WINFIN Instalaciones S.L.",
      "url": "https://www.winfin.es"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Moreras, 1, N 65 y 66",
      "postalCode": "28350",
      "addressLocality": "Ciempozuelos",
      "addressRegion": "Madrid",
      "addressCountry": "ES"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+34 914 520 406",
        "email": "info@vision360ia.com",
        "contactType": "sales",
        "areaServed": "ES",
        "availableLanguage": ["Spanish"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+34 943 284 721",
        "email": "info@vision360ia.com",
        "contactType": "technical support",
        "areaServed": "ES"
      }
    ],
    "location": [
      {
        "@type": "Place",
        "name": "Oficina y taller Madrid",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Moreras, 1, N 65 y 66",
          "postalCode": "28350",
          "addressLocality": "Ciempozuelos",
          "addressRegion": "Madrid",
          "addressCountry": "ES"
        }
      },
      {
        "@type": "Place",
        "name": "Oficina y taller Donostia / San Sebastián",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "P. Mikeletegui, 56, of 314",
          "postalCode": "20009",
          "addressLocality": "Donostia / San Sebastián",
          "addressRegion": "Guipúzcoa",
          "addressCountry": "ES"
        }
      }
    ],
    "sameAs": [
      "https://www.winfin.es",
      "https://www.linkedin.com/company/winfin"
    ],
    "knowsAbout": [
      "Sistemas ADAS",
      "Cámaras 360 grados",
      "Inteligencia Artificial",
      "Seguridad en flotas",
      "Transporte público"
    ],
    "slogan": "Elimina puntos ciegos y reduce accidentes en maniobras urbanas",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 10,
      "maxValue": 50
    },
    "areaServed": {
      "@type": "Country",
      "name": "España"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://www.vision360ia.com/#product",
    "name": "Sistema de Visión Perimetral 360° para Autobuses y Camiones",
    "alternateName": ["Vision 360 Autobus", "Vision Perimetral Bus", "Kit Vision 360 Industrial", "ADAS Anti Atropellos Peatones", "Cámaras Visión Artificial Flotas"],
    "description": "Sistema de cámaras 360° con detección de peatones y ciclistas para autobuses, camiones, vehículos municipales e industriales. Reduce puntos ciegos, mejora la seguridad en maniobras urbanas y facilita cumplimiento GSR con una solución profesional compatible con flotas de 12V y 24V.",
    "image": "https://www.vision360ia.com/images/og-image.jpg",
    "sku": "V360IA-PRO",
    "mpn": "VISION360-BUS-2024",
    "brand": {
      "@type": "Brand",
      "name": "Vision360IA",
      "logo": "https://www.vision360ia.com/logo.png"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "WINFIN Instalaciones S.L."
    },
    "category": "Sistemas de Visión Perimetral 360 para Autobuses y Camiones",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Certificación GSR",
        "value": "R151 (BSIS), R158 (Marcha atrás), R159 (MOIS)"
      },
      {
        "@type": "PropertyValue",
        "name": "Protección IP",
        "value": "IP69K"
      },
      {
        "@type": "PropertyValue",
        "name": "Voltaje",
        "value": "12V y 24V"
      },
      {
        "@type": "PropertyValue",
        "name": "Ángulo de cámara",
        "value": ">180° (ojo de pez HD)"
      },
      {
        "@type": "PropertyValue",
        "name": "Vehículos compatibles",
        "value": "Autobuses urbanos, interurbanos, camiones, flotas industriales"
      },
      {
        "@type": "PropertyValue",
        "name": "Funcionalidades ADAS",
        "value": "FCW, LDW, VRU, BSD"
      }
    ],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "url": "https://www.vision360ia.com",
      "seller": {
        "@type": "Organization",
        "name": "Vision360IA"
      },
      "itemCondition": "https://schema.org/NewCondition",
      "warranty": "2 años de garantía"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "EMT Madrid"
        },
        "reviewBody": "Sistema fiable que ha reducido significativamente los incidentes en nuestra flota de autobuses urbanos."
      }
    ]
  };
  
  const officeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.vision360ia.com/#madrid-office",
      "name": "WINFIN Madrid - Oficina y taller",
      "description": "Oficina y taller propio de WINFIN para implantación e integración de sistemas ADAS y visión perimetral sobre flota profesional.",
      "url": "https://www.vision360ia.com/quienes-somos",
      "telephone": "+34 914 520 406",
      "email": "info@vision360ia.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Moreras, 1, N 65 y 66",
        "postalCode": "28350",
        "addressLocality": "Ciempozuelos",
        "addressRegion": "Madrid",
        "addressCountry": "ES"
      },
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://www.vision360ia.com/#donostia-office",
      "name": "WINFIN Donostia / San Sebastián - Oficina y taller",
      "description": "Oficina y taller propio de WINFIN en Donostia / San Sebastián para soporte comercial, implantación técnica e integración embarcada en proyectos sobre flota profesional.",
      "url": "https://www.vision360ia.com/quienes-somos",
      "telephone": "+34 943 284 721",
      "email": "info@vision360ia.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "P. Mikeletegui, 56, of 314",
        "postalCode": "20009",
        "addressLocality": "Donostia / San Sebastián",
        "addressRegion": "Guipúzcoa",
        "addressCountry": "ES"
      },
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ];

  const videoSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Visión Perimetral 360° para Autobuses y Camiones - Demo",
      "description": "Demostración del sistema de visión perimetral 360° de Vision360IA: cámaras HD con visión artificial que eliminan puntos ciegos en autobuses y camiones.",
      "thumbnailUrl": "https://www.vision360ia.com/images/winfin_vision360ia_1.jpg",
      "uploadDate": "2024-01-15",
      "contentUrl": "https://vimeo.com/1133755711",
      "embedUrl": "https://player.vimeo.com/video/1133755711",
      "duration": "PT2M",
      "publisher": {
        "@type": "Organization",
        "name": "Vision360IA"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "ADAS Anti-Atropellos: Detección de Peatones y Ciclistas con IA",
      "description": "Sistema ADAS con alertas inteligentes para detección de peatones y ciclistas (VRU), colisión frontal (FCW) y salida de carril (LDW) mediante cámaras con visión artificial.",
      "thumbnailUrl": "https://www.vision360ia.com/images/winfin_vision360ia_2.jpg",
      "uploadDate": "2024-01-15",
      "contentUrl": "https://vimeo.com/1133755727",
      "embedUrl": "https://player.vimeo.com/video/1133755727",
      "duration": "PT2M",
      "publisher": {
        "@type": "Organization",
        "name": "Vision360IA"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "Gestión de Flotas con Análisis IA y Reportes",
      "description": "Plataforma de análisis de flota con IA: evaluación de conductores, reconstrucción de eventos críticos y KPIs en tiempo real para flotas de autobuses, camiones y vehículos industriales.",
      "thumbnailUrl": "https://www.vision360ia.com/images/winfin_vision360ia_3.jpg",
      "uploadDate": "2024-01-15",
      "contentUrl": "https://vimeo.com/1133755748",
      "embedUrl": "https://player.vimeo.com/video/1133755748",
      "duration": "PT2M",
      "publisher": {
        "@type": "Organization",
        "name": "Vision360IA"
      }
    }
  ];

  return (
    <>
      {/* JSON-LD Schema Markup para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
      {officeSchemas.map((schema, i) => (
        <script
          key={`office-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      {videoSchemas.map((schema, i) => (
        <script
          key={`video-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      
      <div className="flex flex-col">
        <Hero translations={defaultTranslations} />
        <Solutions />
        <WhyUs translations={defaultTranslations} />
        <ProductShowcase translations={defaultTranslations} />
        <Faq translations={defaultTranslations} />
        <Contact />
      </div>
    </>
  );
}
