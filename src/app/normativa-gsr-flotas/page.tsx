import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Normativa GSR para flotas: qué es y cómo afecta (R151, R158, R159)',
  description:
    'Guía sobre la normativa GSR de la UE y los reglamentos R151 (BSIS), R158 (marcha atrás) y R159 (MOIS): qué exigen, a qué vehículos afectan y cómo ayuda Vision360IA a las flotas a prepararse.',
  keywords: [
    'normativa GSR flotas',
    'GSR reglamento UE',
    'R151 BSIS',
    'R158 marcha atrás',
    'R159 MOIS',
    'normativa seguridad vehículos pesados',
    'cumplimiento GSR autobús camión',
    'reglamento 2019/2144',
  ],
  alternates: {
    canonical: '/normativa-gsr-flotas',
  },
  openGraph: {
    images: [{ url: 'https://www.vision360ia.com/images/og-image.jpg', width: 1200, height: 630, alt: 'Vision360IA — visión 360° con inteligencia artificial para flotas' }],
    title: 'Normativa GSR para flotas (R151, R158, R159) | Vision360IA',
    description:
      'Qué exige la GSR de la UE, a qué vehículos afecta y cómo preparar tu flota con visión 360° y detección de peatones y ciclistas.',
    url: `${SITE_URL}/normativa-gsr-flotas`,
    type: 'article',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    image: ['https://www.vision360ia.com/images/og-image.jpg'],
    headline: 'Normativa GSR para flotas: qué es y cómo afecta (R151, R158, R159)',
    description:
      'Guía explicativa sobre la General Safety Regulation (GSR) de la UE y los reglamentos UNECE R151, R158 y R159 aplicados a flotas profesionales.',
    about: ['GSR', 'R151', 'R158', 'R159', 'BSIS', 'MOIS', 'seguridad vial', 'flotas'],
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: '2026-05-29',
    dateModified: '2026-05-29',
    inLanguage: 'es-ES',
  },
];

export default function NormativaGsrFlotasPage() {
  return (
    <SupportPage
      title="Normativa GSR para flotas: qué implica y cómo preparar tus vehículos"
      description="La GSR (General Safety Regulation) de la UE introduce sistemas de seguridad obligatorios en vehículos nuevos, con reglamentos como R151 (BSIS), R158 (marcha atrás) y R159 (MOIS). Esta guía explica de forma clara qué son, a quién afectan y cómo una solución de visión 360° y detección por IA ayuda a las flotas a prepararse."
      eyebrow="NORMATIVA"
      breadcrumbLabel="Normativa GSR para flotas"
      breadcrumbCategory="Normativa"
      schemas={schemas}
      primarySolution={{
        href: '/anti-atropellos-peatones-ciclistas',
        label: 'Ver la solución de protección VRU',
        helperText:
          'Si buscas la solución orientada a detección de peatones y ciclistas (el corazón de R151 y R159), esta es la página principal.',
      }}
      intro={{
        badge: 'GSR y reglamentos',
        highlights: ['R151 · BSIS', 'R158 · Marcha atrás', 'R159 · MOIS', 'Vehículos pesados y flotas'],
      }}
      sections={[
        {
          eyebrow: 'Qué es',
          title: 'Qué es la normativa GSR',
          paragraphs: [
            'La GSR (General Safety Regulation, Reglamento (UE) 2019/2144) es el marco europeo que introduce, de forma progresiva, una serie de sistemas avanzados de seguridad como equipamiento obligatorio en los vehículos nuevos que se comercializan en la Unión Europea. Su objetivo es reducir los accidentes y, en particular, proteger a los usuarios vulnerables de la vía (peatones y ciclistas).',
            'La GSR se apoya en reglamentos técnicos UNECE que definen cómo deben comportarse esos sistemas. Para flotas de vehículos pesados —autobuses y camiones, sobre todo— los más relevantes son R151, R158 y R159.',
          ],
        },
        {
          eyebrow: 'Los reglamentos clave',
          title: 'R151, R158 y R159 explicados',
          items: [
            'R151 (BSIS – Blind Spot Information System): sistema de información de ángulo muerto, orientado a detectar y advertir de ciclistas y peatones en el lateral del vehículo, sobre todo en giros a la derecha.',
            'R158 (asistencia a la marcha atrás): sistemas que ayudan al conductor a detectar personas y obstáculos detrás del vehículo durante la maniobra de marcha atrás.',
            'R159 (MOIS – Moving Off Information System): sistema de información de arranque, que advierte de la presencia de peatones o ciclistas justo delante del vehículo cuando este inicia la marcha desde parado.',
          ],
        },
        {
          eyebrow: 'A quién afecta',
          title: 'A qué vehículos y flotas afecta',
          paragraphs: [
            'La GSR aplica de forma escalonada a las distintas categorías de vehículos, empezando por los nuevos tipos homologados y extendiéndose después a los vehículos nuevos matriculados. Afecta de forma especialmente relevante a vehículos pesados como autobuses, autocares y camiones que operan en entorno urbano, donde la convivencia con peatones y ciclistas es mayor.',
            'Importante: la situación concreta de cada flota depende de la categoría de los vehículos, su antigüedad y su uso. Esta página es orientativa; para conocer las obligaciones exactas de tu flota conviene verificar la normativa vigente y, si es necesario, asesorarte con un especialista. Lo que sí podemos ayudarte a definir es la solución técnica de seguridad más adecuada para tu operación.',
          ],
        },
        {
          eyebrow: 'Cómo ayuda Vision360IA',
          title: 'Cómo preparar tu flota más allá del mínimo normativo',
          paragraphs: [
            'Vision360IA combina visión perimetral 360° y detección de peatones y ciclistas por IA en una sola arquitectura. Eso permite cubrir el espíritu de R151, R158 y R159 —ángulo muerto, marcha atrás y arranque— de forma integrada, y no como funciones aisladas.',
            'Además, al instalarse como retrofit sobre flota existente, es una vía para reforzar la seguridad de vehículos que ya están en operación, sin esperar a renovar la flota. Cumplir la norma es la base; reducir de verdad los incidentes en maniobra es el objetivo real.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Normativa GSR',
        title: 'Preguntas frecuentes sobre la GSR en flotas',
        items: [
          {
            question: '¿La GSR obliga a equipar mi flota actual?',
            answer:
              'La GSR aplica principalmente a vehículos nuevos, de forma escalonada por categoría. Tu flota actual puede no estar obligada a corto plazo, pero muchos operadores deciden equiparse igualmente por seguridad, requisitos de cliente o pliegos. Conviene verificar la situación concreta de cada vehículo con la normativa vigente.',
          },
          {
            question: '¿Qué diferencia hay entre R151, R158 y R159?',
            answer:
              'R151 cubre el ángulo muerto lateral (BSIS), especialmente en giros. R158 cubre la maniobra de marcha atrás. R159 cubre el arranque desde parado (MOIS), advirtiendo de peatones o ciclistas delante. Los tres apuntan a proteger a usuarios vulnerables en situaciones distintas.',
          },
          {
            question: '¿Cumplir la GSR garantiza que no habrá accidentes?',
            answer:
              'No. La normativa marca un mínimo. La reducción real del riesgo depende de cómo se implante la solución: cobertura efectiva de los puntos ciegos, calidad de la detección, ajuste a la geometría del vehículo y formación del conductor. Por eso conviene ir más allá del cumplimiento formal.',
          },
          {
            question: '¿Vision360IA es un sistema homologado GSR?',
            answer:
              'Vision360IA está diseñado para cubrir las funciones de seguridad que persiguen R151, R158 y R159 (ángulo muerto, marcha atrás y arranque) mediante visión 360° y detección por IA. La aplicabilidad concreta a cada vehículo y homologación se valora caso por caso según la flota.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Prepara tu flota para la seguridad que exige la normativa',
        description:
          'Analizamos tu flota, su uso y sus maniobras críticas para proponerte una solución de visión 360° y detección coherente con el marco GSR y con tu operación real.',
        buttonLabel: 'Solicitar evaluación técnica',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/anti-atropellos-peatones-ciclistas', label: 'Protección de peatones y ciclistas' },
          { href: '/bsis-camiones-autobuses', label: 'Sistema BSIS (R151)' },
          { href: '/deteccion-angulos-muertos', label: 'Detección de ángulos muertos' },
        ],
      }}
    />
  );
}
