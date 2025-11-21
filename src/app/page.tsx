
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Geofencing } from '@/components/sections/geofencing';
import { Hero } from '@/components/sections/hero';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { SolutionsOverview } from '@/components/sections/solutions-overview';
import { ThreatAnalysis } from '@/components/sections/threat-analysis';
import { WhyUs } from '@/components/sections/why-us';
import { translations } from '@/lib/translations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision360ia | Sistema ADAS IA para Reducir Accidentes y Optimizar Flotas',
  description: 'Descubre Vision360ia, el sistema ADAS con IA que ofrece seguridad 360° para tu flota. Previene colisiones, reduce costes y protege a tus conductores. Solicita una demo.',
}

export default async function Home() {
  // Obtenemos las traducciones por defecto en el servidor (español)
  const defaultTranslations = translations.es;
  
  // Schema.org JSON-LD para SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Vision360IA",
    "alternateName": "WINFIN Vision360IA",
    "url": "https://vision360ia.com",
    "logo": "https://vision360ia.com/logo.png",
    "description": "Sistemas de seguridad ADAS y monitoreo de flotas con IA. Tecnología avanzada para prevenir accidentes y optimizar la gestión de flotas de transporte.",
    "foundingDate": "2003",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@vision360ia.com",
      "contactType": "sales",
      "availableLanguage": ["Spanish", "Catalan", "Basque"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/vision360ia"
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Vision360IA - Sistema ADAS con IA",
    "description": "Sistema avanzado de asistencia al conductor (ADAS) con inteligencia artificial para flotas comerciales. Incluye visión 360°, alertas de colisión, detección de peatones y análisis predictivo.",
    "brand": {
      "@type": "Brand",
      "name": "Vision360IA"
    },
    "category": "ADAS Sistema de Seguridad Vehicular",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "url": "https://vision360ia.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
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
        <Geofencing translations={defaultTranslations} />
        <SolutionsOverview translations={defaultTranslations} />
        <ThreatAnalysis translations={defaultTranslations} />
        <Faq translations={defaultTranslations} />
        <Contact translations={defaultTranslations} />
      </div>
    </>
  );
}
