
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { WhyUs } from '@/components/sections/why-us';
import { translations } from '@/lib/translations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visión Perimetral 360° para Autobuses y Camiones | Sistema Vision360IA',
  description: 'Sistema de visión perimetral 360º con IA para autobuses urbanos, camiones y flotas industriales. Elimina puntos ciegos, cumple GSR R151/R158/R159. Instalación 12/24V. +2.000 vehículos: EMT Madrid, ATM Barcelona. Solicita demo.',
  keywords: ['vision perimetral bus', 'vision 360 autobus', 'vision 360 perimetral autobuses urbanos', 'sistema vision 360 bus industrial', 'camaras 360 autobus', 'vision perimetral camion', 'ADAS autobus', 'sistema vision perimetral flotas'],
  openGraph: {
    title: 'Visión Perimetral 360° para Autobuses y Camiones | Vision360IA',
    description: 'Sistema de visión 360º con IA para autobuses y camiones. Elimina puntos ciegos, homologado GSR. +2.000 vehículos en EMT Madrid, ATM Barcelona.',
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
    "@id": "https://www.vision360ia.com/#product",
    "name": "Sistema de Visión Perimetral 360° para Autobuses y Camiones",
    "alternateName": ["Vision 360 Autobus", "Vision Perimetral Bus", "Kit Vision 360 Industrial"],
    "description": "Sistema de visión perimetral 360º con IA para autobuses urbanos, interurbanos, camiones y flotas industriales. Elimina puntos ciegos con cámaras HD ultra gran angular (>180°). Incluye alertas de colisión frontal (FCW), detección de peatones y ciclistas (VRU), aviso de salida de carril (LDW). Compatible 12V y 24V. Homologado GSR R151 (BSIS), R158 (Marcha atrás), R159 (MOIS). Certificación IP69K.",
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
