import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';

export const metadata: Metadata = {
  title: 'ADAS para construcción y obra con visión 360° | Vision360IA',
  description: 'Visión 360°, maniobra crítica y protección persona-máquina para excavadoras, dumpers, palas cargadoras y vehículos de obra en entorno severo.',
  keywords: ['ADAS construcción', 'visión 360 obra', 'seguridad maquinaria obra', 'cámaras excavadoras', 'ADAS dumpers y palas cargadoras'],
  alternates: {
    canonical: 'https://www.vision360ia.com/adas-construccion-obra',
  },
  openGraph: {
    title: 'ADAS para construcción y obra | Vision360IA',
    description: 'Cobertura específica para maquinaria de obra, excavadoras, dumpers y maniobras críticas en construcción.',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'ADAS para construcción y obra',
    description: 'Guía sobre visión 360° y seguridad de maniobra en excavadoras, dumpers, palas cargadoras y vehículos de obra.',
    about: ['construcción', 'obra', 'excavadoras', 'dumpers', 'visión 360', 'seguridad maquinaria'],
  },
];

export default function AdasConstruccionObraPage() {
  return (
    <SupportPage
      title="ADAS para construcción y obra: visión 360° para maquinaria pesada y maniobra crítica"
      description="La obra combina geometrías variables, personas alrededor de maquinaria pesada, visibilidad irregular y maniobras en entornos severos. Esta página aterriza cómo Vision360IA encaja en construcción sin duplicar la landing industrial principal."
      eyebrow="COBERTURA SECTORIAL"
      breadcrumbLabel="ADAS para Construcción y Obra"
      schemas={schemas}
      primarySolution={{
        href: '/vision-360-vehiculos-industriales',
        label: 'Ver solución base para vehículos industriales',
        helperText: 'Si buscas la solución principal para maquinaria pesada, visión 360° industrial y protección persona-máquina, esta es la landing base recomendada.',
      }}
      intro={{
        badge: 'Construcción y obra',
        highlights: ['Excavadoras', 'Dumpers y palas', 'Entorno severo', 'Persona-máquina'],
      }}
      sections={[
        {
          eyebrow: 'Entorno de riesgo',
          title: 'Por qué construcción y obra necesitan una capa específica de visibilidad',
          paragraphs: [
            'En obra la maniobra se realiza con espacio cambiante, visibilidad parcial, personal a pie y maquinaria de tamaños muy distintos. El riesgo no depende solo de la habilidad del operador, sino de cuánto entorno útil puede ver en cada movimiento.',
            'La visión 360° y la detección de personas ayudan a reducir golpes, incidentes persona-máquina y maniobras inseguras en excavadoras, dumpers, palas cargadoras y otros vehículos de obra.',
          ],
        },
        {
          eyebrow: 'Aplicaciones típicas',
          title: 'Dónde aporta más valor en obra y construcción',
          items: [
            'Excavadoras y retroexcavadoras con operarios en proximidad.',
            'Dumpers y palas cargadoras en circulación sobre zonas compartidas.',
            'Accesos a obra con espacio estrecho y maniobra condicionada.',
            'Vehículos de apoyo y maquinaria móvil en patios o frentes de trabajo con visibilidad cambiante.',
          ],
        },
        {
          eyebrow: 'Relación con la web actual',
          title: 'Cómo se apoya esta cobertura en industrial y logística pesada',
          paragraphs: [
            'La página industrial ya cubre bien la maquinaria pesada. Esta nueva pieza añade una lectura sectorial clara para búsquedas relacionadas con obra, construcción y seguridad de maquinaria en proyecto o explotación.',
            'Así se refuerza la conexión entre visión 360°, control de maniobra, protección colectiva y despliegue sobre parque real de maquinaria.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ construcción',
        title: 'Preguntas frecuentes sobre obra y maquinaria',
        items: [
          {
            question: '¿Esta cobertura aplica a excavadoras, dumpers y palas cargadoras?',
            answer: 'Sí. Está pensada para maquinaria pesada y vehículos de obra donde la visibilidad de maniobra y la interacción persona-máquina son críticas.',
          },
          {
            question: '¿Es distinta de la página de vehículos industriales?',
            answer: 'No la sustituye. La complementa con una intención sectorial concreta para búsquedas de construcción, obra y seguridad en maquinaria de proyecto.',
          },
          {
            question: '¿Aporta valor también en retrofit?',
            answer: 'Sí. Uno de los valores más claros de Vision360IA es poder desplegar visión 360° y cobertura útil sobre maquinaria ya operativa, no solo en equipos nuevos.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Revisa la cobertura de maniobra y visibilidad de tu maquinaria de obra',
        description: 'Analizamos tipología de máquina, entorno de trabajo y zonas de riesgo para definir una arquitectura útil en construcción y obra.',
        buttonLabel: 'Ver si encaja en mi flota',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/vision-360-vehiculos-industriales', label: 'Vehículos Industriales' },
          { href: '/adas-camiones', label: 'ADAS para Camiones' },
          { href: '/adas-logistica-portuaria', label: 'Logística Portuaria' },
        ],
      }}
    />
  );
}