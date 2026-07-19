import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Visión 360° para maquinaria de obras públicas y construcción',
  description:
    'Sistemas de visión 360° y detección de operarios para maquinaria de obras públicas: excavadoras, dumpers, palas cargadoras y compactadoras. Elimina ángulos muertos y protege al personal a pie en obra.',
  keywords: [
    'visión 360 maquinaria obras públicas',
    'cámaras 360 excavadora',
    'cámaras dumper',
    'detección operarios obra',
    'seguridad maquinaria construcción',
    'ángulos muertos pala cargadora',
    'cámaras seguridad obra',
  ],
  alternates: {
    canonical: '/vision-360-maquinaria-obras-publicas',
  },
  openGraph: {
    images: [{ url: 'https://www.vision360ia.com/images/og-image.jpg', width: 1200, height: 630, alt: 'Vision360IA — visión 360° con inteligencia artificial para flotas' }],
    title: 'Visión 360° para maquinaria de obras públicas | Vision360IA',
    description:
      'Protege a los operarios a pie en obra con visión 360° y detección de personas en excavadoras, dumpers, palas y compactadoras.',
    url: `${SITE_URL}/vision-360-maquinaria-obras-publicas`,
    type: 'website',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Visión 360° y detección para maquinaria de obras públicas',
    serviceType: 'Sistema de visión perimetral y detección para maquinaria de construcción',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'España' },
    description:
      'Sistema de visión 360° con detección de operarios y obstáculos para excavadoras, dumpers, palas cargadoras, compactadoras y maquinaria de obras públicas, orientado a proteger al personal a pie y reducir incidentes en obra.',
    audience: {
      '@type': 'BusinessAudience',
      name: 'Constructoras, empresas de obra civil y alquiler de maquinaria',
    },
  },
];

export default function Vision360MaquinariaObrasPublicasPage() {
  return (
    <SupportPage
      title="Visión 360° para maquinaria de obras públicas: protege al operario a pie"
      description="En una obra conviven máquinas pesadas y operarios a pie en un espacio reducido. Excavadoras, dumpers y palas tienen ángulos muertos donde una persona desaparece justo en las maniobras de giro y marcha atrás. Vision360IA aporta visión 360° y detección de personas para reducir el riesgo de atropello y golpe en obra."
      eyebrow="SOLUCIÓN SECTORIAL"
      breadcrumbLabel="Visión 360° para maquinaria de obras públicas"
      breadcrumbCategory="Soluciones"
      schemas={schemas}
      primarySolution={{
        href: '/adas-construccion-obra',
        label: 'Ver la solución para construcción y obra',
        helperText:
          'Si buscas la solución general para vehículos y maquinaria en construcción y obra, esta es la página principal.',
      }}
      intro={{
        badge: 'Maquinaria de obras públicas',
        highlights: ['Excavadoras y palas', 'Dumpers y compactadoras', 'Detección de operarios', 'Giro y marcha atrás'],
      }}
      sections={[
        {
          eyebrow: 'El problema',
          title: 'La obra es un entorno de alto riesgo de atropello',
          paragraphs: [
            'En una obra civil, las máquinas pesadas y los operarios a pie comparten un espacio reducido y en constante cambio. Las excavadoras giran sobre su eje, los dumpers maniobran marcha atrás cargados y las palas se desplazan con la visibilidad tapada por el material. En esas maniobras, un operario puede quedar en un ángulo muerto del maquinista.',
            'Los golpes y atropellos con maquinaria son una de las causas de accidente grave más frecuentes en obra. La señalización y el chaleco no bastan cuando el maquinista simplemente no puede ver lo que tiene detrás o al costado.',
          ],
        },
        {
          eyebrow: 'Dónde aporta valor',
          title: 'Maniobras críticas en obra',
          items: [
            'Giro de excavadora sobre su eje, con personal trabajando alrededor.',
            'Marcha atrás de dumper cargado, con visibilidad trasera muy limitada.',
            'Desplazamiento de pala cargadora con el material tapando el frontal.',
            'Trabajo en zanja o tajo con varios operarios cerca de la máquina.',
            'Maniobras en obra urbana, con peatones y tráfico próximos al recinto.',
          ],
        },
        {
          eyebrow: 'La solución',
          title: 'Visión 360° y detección de operarios en obra',
          paragraphs: [
            'Vision360IA combina cámaras 360° de alta definición y detección de personas por IA, instaladas y calibradas para la geometría de cada máquina de obra. El maquinista dispone de una vista cenital del entorno y recibe alertas cuando un operario entra en una zona de riesgo durante la maniobra.',
            'El sistema está preparado para las condiciones de la obra —polvo, barro, golpes, vibraciones— y se instala como retrofit sobre la maquinaria existente o de alquiler, sin parar la actividad más de lo necesario.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Maquinaria de obra',
        title: 'Preguntas frecuentes sobre visión 360° en maquinaria de obras públicas',
        items: [
          {
            question: '¿Aguanta el polvo, el barro y los golpes de la obra?',
            answer:
              'Sí. Las cámaras y soportes se seleccionan e instalan para resistir las condiciones de obra (polvo, barro, agua, vibraciones e impactos). La estanqueidad y la protección se definen según el tipo de máquina.',
          },
          {
            question: '¿Sirve para maquinaria de alquiler?',
            answer:
              'Sí. El sistema puede instalarse como retrofit tanto en maquinaria propia como de alquiler. La configuración se adapta al tipo de máquina y a la duración prevista de uso.',
          },
          {
            question: '¿Ayuda a cumplir los requisitos de seguridad en obra?',
            answer:
              'Una solución de visión 360° con detección de personas refuerza las medidas de prevención frente al riesgo de atropello y golpe con maquinaria. La aplicabilidad concreta a tu plan de seguridad y salud conviene valorarla con tu responsable de prevención.',
          },
          {
            question: '¿Detecta a los operarios o solo muestra la cámara?',
            answer:
              'Según la configuración, el sistema detecta activamente personas en las zonas de riesgo y avisa al maquinista, no se limita a mostrar la imagen. Esa detección activa es lo que reduce de verdad el riesgo en maniobra.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Reduce el riesgo de atropello en tu obra',
        description:
          'Analizamos tu maquinaria, sus maniobras y la organización de la obra para definir la visión 360° y la detección de operarios que necesita cada máquina.',
        buttonLabel: 'Solicitar evaluación técnica',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/adas-construccion-obra', label: 'ADAS para construcción y obra' },
          { href: '/deteccion-angulos-muertos', label: 'Detección de ángulos muertos' },
          { href: '/vision-360-maquinaria-agricola', label: 'Maquinaria agrícola' },
        ],
      }}
    />
  );
}
