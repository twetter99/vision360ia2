/**
 * Vision360IA - Datos estructurados Schema.org (JSON-LD).
 *
 * Helpers que devuelven los objetos JSON-LD listos para inyectar en
 * <script type="application/ld+json">. Centralizamos aquí los datos de
 * WINFIN (direcciones, teléfonos, descripción) para que cualquier página
 * los pueda referenciar de forma consistente.
 *
 * Las páginas individuales construyen sus propios schemas (Service,
 * BreadcrumbList, FAQPage) usando los `@id` que aquí publicamos como
 * referencia, evitando duplicar la información de la empresa.
 */

export const SITE_URL = 'https://www.vision360ia.com';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Organization global de WINFIN / Vision360IA.
 * Se inyecta en el layout raíz, así aparece en TODAS las páginas (no solo
 * home). El @id permite que otros schemas la referencien sin duplicar.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Vision360IA',
    alternateName: ['Vision360IA by WINFIN', 'WINFIN Instalaciones'],
    legalName: 'WINFIN INSTALACIONES, S.L.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      'Empresa española especializada en sistemas ADAS, visión perimetral 360° e inteligencia artificial para autobuses, camiones, vehículos municipales e industriales. Más de 20 años de experiencia y más de 2.000 vehículos equipados en operación real.',
    foundingDate: '2003',
    taxID: 'B05393632',
    vatID: 'ESB05393632',
    email: 'info@vision360ia.com',
    parentOrganization: {
      '@type': 'Organization',
      name: 'WINFIN INSTALACIONES, S.L.',
      url: 'https://www.winfin.es',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ Moreras, 1 N 66',
      postalCode: '28350',
      addressLocality: 'Ciempozuelos',
      addressRegion: 'Madrid',
      addressCountry: 'ES',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+34-914-520-406',
        email: 'info@vision360ia.com',
        contactType: 'sales',
        areaServed: 'ES',
        availableLanguage: ['Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+34-943-284-721',
        email: 'info@vision360ia.com',
        contactType: 'technical support',
        areaServed: 'ES',
        availableLanguage: ['Spanish'],
      },
    ],
    sameAs: [
      'https://www.winfin.es',
      'https://www.linkedin.com/company/winfin',
    ],
    knowsAbout: [
      'Sistemas ADAS',
      'Visión perimetral 360°',
      'Detección de peatones y ciclistas',
      'Inteligencia artificial embarcada',
      'Seguridad en flotas profesionales',
      'Normativa GSR (R151, R158, R159)',
      'Retrofit ADAS para flotas',
      'Instalación y calibración embarcada',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    slogan: 'Elimina puntos ciegos y reduce accidentes en maniobras urbanas',
  } as const;
}

/**
 * LocalBusiness para la oficina y taller de Madrid (Ciempozuelos).
 */
export function localBusinessMadridSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#madrid-office`,
    name: 'WINFIN Madrid · Oficina y taller',
    parentOrganization: { '@id': ORGANIZATION_ID },
    description:
      'Oficina y taller propio de WINFIN en Madrid para implantación, calibración e integración de sistemas ADAS y visión 360° en flotas profesionales.',
    url: `${SITE_URL}/quienes-somos`,
    image: `${SITE_URL}/images/og-image.jpg`,
    telephone: '+34-914-520-406',
    email: 'info@vision360ia.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Moreras, 1, N 65 y 66',
      postalCode: '28350',
      addressLocality: 'Ciempozuelos',
      addressRegion: 'Madrid',
      addressCountry: 'ES',
    },
    areaServed: { '@type': 'Country', name: 'España' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  } as const;
}

/**
 * LocalBusiness para la oficina y taller de Donostia / San Sebastián.
 */
export function localBusinessDonostiaSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#donostia-office`,
    name: 'WINFIN Donostia / San Sebastián · Oficina y taller',
    parentOrganization: { '@id': ORGANIZATION_ID },
    description:
      'Oficina y taller de WINFIN en Donostia / San Sebastián (Parque Tecnológico de Euskadi) para soporte comercial, implantación técnica e integración embarcada en flotas profesionales del norte.',
    url: `${SITE_URL}/quienes-somos`,
    image: `${SITE_URL}/images/og-image.jpg`,
    telephone: '+34-943-284-721',
    email: 'info@vision360ia.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'P. Mikeletegui, 56, of 314',
      postalCode: '20009',
      addressLocality: 'Donostia / San Sebastián',
      addressRegion: 'Guipúzcoa',
      addressCountry: 'ES',
    },
    areaServed: { '@type': 'Country', name: 'España' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  } as const;
}

/**
 * WebSite global con SearchAction (sitelinks searchbox en Google).
 * Aunque no tenemos una URL `?q=` real, declararla ayuda a que Google
 * reconozca la marca como un sitio único con identidad propia.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Vision360IA',
    description:
      'Sistemas ADAS con visión perimetral 360° e inteligencia artificial para autobuses, camiones y flotas profesionales.',
    inLanguage: 'es-ES',
    publisher: { '@id': ORGANIZATION_ID },
  } as const;
}

/**
 * BreadcrumbList genérico para una página interna.
 * Pasar { name, url } por cada nivel (excluyendo "Home" — se añade
 * automáticamente al principio).
 */
export function breadcrumbSchema(
  trail: ReadonlyArray<{ name: string; url: string }>,
) {
  const items = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Inicio',
      item: SITE_URL,
    },
    ...trail.map((step, i) => ({
      '@type': 'ListItem' as const,
      position: i + 2,
      name: step.name,
      item: step.url.startsWith('http') ? step.url : `${SITE_URL}${step.url}`,
    })),
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * FAQPage a partir de una lista de Q/A.
 */
export function faqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
