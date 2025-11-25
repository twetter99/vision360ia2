
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { WhyUs } from '@/components/sections/why-us';
import { translations } from '@/lib/translations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema ADAS con IA para Flotas | Cámaras 360° Autobús y Camión - Vision360IA',
  description: 'Sistema ADAS homologado GSR con visión 360° e IA para flotas de autobuses y camiones. -40% accidentes comprobado. +2.000 vehículos en EMT Madrid, ATM Barcelona. Instalación y soporte en España. Demo gratuita.',
  keywords: ['sistema ADAS autobús', 'cámaras 360 camión', 'ADAS flotas España', 'GSR R151 R158 R159', 'seguridad flotas transporte'],
  openGraph: {
    title: 'Sistema ADAS con IA para Flotas | Vision360IA',
    description: '-40% accidentes en flotas. Sistema ADAS homologado con cámaras 360° e IA. +2.000 vehículos equipados en España.',
  },
}

export default async function Home() {
  // Obtenemos las traducciones por defecto en el servidor (español)
  const defaultTranslations = translations.es;
  
  // Schema.org JSON-LD para SEO - Optimizado para B2B
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://vision360ia.com/#organization",
    "name": "Vision360IA by WINFIN",
    "alternateName": ["Vision360IA", "WINFIN Instalaciones"],
    "url": "https://vision360ia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vision360ia.com/logo.png",
      "width": 512,
      "height": 512
    },
    "description": "Empresa española líder en sistemas ADAS con Inteligencia Artificial para flotas de transporte. Especialistas en cámaras 360°, alertas de colisión y monitorización de conductores. Más de 20 años de experiencia y +2.000 vehículos equipados.",
    "foundingDate": "2003",
    "founder": {
      "@type": "Organization",
      "name": "WINFIN Instalaciones S.L."
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressRegion": "Comunidad de Madrid",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.4168",
      "longitude": "-3.7038"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "info@vision360ia.com",
        "contactType": "sales",
        "areaServed": "ES",
        "availableLanguage": ["Spanish", "Catalan", "Basque"]
      },
      {
        "@type": "ContactPoint",
        "email": "soporte@vision360ia.com",
        "contactType": "technical support",
        "areaServed": "ES"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/winfin"
    ],
    "knowsAbout": [
      "Sistemas ADAS",
      "Cámaras 360 grados",
      "Inteligencia Artificial",
      "Seguridad en flotas",
      "Transporte público"
    ],
    "slogan": "Reduce un 40% los accidentes en tu flota",
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
    "@id": "https://vision360ia.com/#product",
    "name": "Vision360IA - Sistema ADAS con Visión 360° e IA",
    "description": "Sistema avanzado de asistencia al conductor (ADAS) con inteligencia artificial para flotas de autobuses, camiones y vehículos industriales. Incluye: cámaras 360° HD con eliminación de puntos ciegos, alertas de colisión frontal (FCW), detección de peatones y ciclistas (VRU), aviso de salida de carril (LDW) y plataforma de análisis con IA. Homologado según normativa GSR europea (R151, R158, R159).",
    "image": "https://vision360ia.com/images/og-image.jpg",
    "brand": {
      "@type": "Brand",
      "name": "Vision360IA",
      "logo": "https://vision360ia.com/logo.png"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "WINFIN Instalaciones S.L."
    },
    "category": "Sistemas ADAS para Flotas Comerciales",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Certificación",
        "value": "GSR R151, R158, R159"
      },
      {
        "@type": "PropertyValue",
        "name": "Protección IP",
        "value": "IP69K"
      },
      {
        "@type": "PropertyValue",
        "name": "Compatibilidad",
        "value": "12V y 24V"
      }
    ],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "url": "https://vision360ia.com",
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
      
      <div className="flex flex-col">
        <Hero translations={defaultTranslations} />
        <WhyUs translations={defaultTranslations} />
        <ProductShowcase translations={defaultTranslations} />
        <Faq translations={defaultTranslations} />
        <Contact />
      </div>
    </>
  );
}
