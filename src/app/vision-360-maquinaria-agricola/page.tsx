import type { Metadata } from 'next';

import { SupportPage } from '@/components/sections/support-page';
import { SITE_URL, ORGANIZATION_ID } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Visión 360° para maquinaria agrícola: tractores y cosechadoras',
  description:
    'Sistemas de visión 360° y detección de personas y obstáculos para maquinaria agrícola: tractores, cosechadoras y remolques. Elimina ángulos muertos en parcela, maniobras y transporte por carretera.',
  keywords: [
    'visión 360 maquinaria agrícola',
    'cámaras 360 tractor',
    'cámaras cosechadora',
    'ángulos muertos maquinaria agrícola',
    'seguridad maquinaria agrícola',
    'detección personas tractor',
    'cámaras seguridad agro',
  ],
  alternates: {
    canonical: '/vision-360-maquinaria-agricola',
  },
  openGraph: {
    title: 'Visión 360° para maquinaria agrícola | Vision360IA',
    description:
      'Elimina ángulos muertos en tractores, cosechadoras y remolques con visión 360° y detección de personas y obstáculos.',
    url: `${SITE_URL}/vision-360-maquinaria-agricola`,
    type: 'website',
  },
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Visión 360° y detección para maquinaria agrícola',
    serviceType: 'Sistema de visión perimetral y detección para maquinaria agrícola',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'España' },
    description:
      'Sistema de visión 360° con detección de personas y obstáculos para tractores, cosechadoras, remolques y maquinaria agrícola, orientado a eliminar ángulos muertos en parcela, maniobras y transporte por carretera.',
    audience: {
      '@type': 'BusinessAudience',
      name: 'Explotaciones agrícolas, cooperativas y empresas de servicios agrarios',
    },
  },
];

export default function Vision360MaquinariaAgricolaPage() {
  return (
    <SupportPage
      title="Visión 360° para maquinaria agrícola: ve lo que el tamaño de la máquina te oculta"
      description="Los tractores, cosechadoras y remolques tienen ángulos muertos enormes: trabajadores en el campo, personas en la parcela u obstáculos quedan fuera de la vista del operador, sobre todo en maniobras y transporte por carretera. Vision360IA aporta visión 360° y detección de personas para reducir ese riesgo en la operación agrícola real."
      eyebrow="SOLUCIÓN SECTORIAL"
      breadcrumbLabel="Visión 360° para maquinaria agrícola"
      breadcrumbCategory="Soluciones"
      schemas={schemas}
      primarySolution={{
        href: '/vision-360-vehiculos-industriales',
        label: 'Ver la solución de visión 360° industrial',
        helperText:
          'Si buscas la solución de visión 360° general para vehículos y maquinaria, esta es la página principal.',
      }}
      intro={{
        badge: 'Maquinaria agrícola',
        highlights: ['Tractores y cosechadoras', 'Remolques', 'Detección de personas', 'Parcela y carretera'],
      }}
      sections={[
        {
          eyebrow: 'El problema',
          title: 'Por qué la maquinaria agrícola es especialmente peligrosa',
          paragraphs: [
            'La maquinaria agrícola combina gran tamaño, baja visibilidad trasera y lateral, y trabajo en entornos donde conviven personas, otros vehículos y obstáculos. Una cosechadora o un tractor con remolque tienen zonas ciegas en las que un trabajador a pie puede desaparecer por completo de la vista del operador.',
            'El riesgo no está solo en la parcela: el transporte por carretera entre fincas, las maniobras en accesos estrechos y la marcha atrás con apero o remolque son momentos críticos donde un sistema de visión completa marca la diferencia.',
          ],
        },
        {
          eyebrow: 'Dónde aporta valor',
          title: 'Situaciones donde la visión 360° protege',
          items: [
            'Maniobras en parcela con trabajadores a pie alrededor de la máquina.',
            'Marcha atrás con remolque, apero o cosechadora.',
            'Transporte por carretera entre fincas, con visibilidad reducida hacia atrás.',
            'Accesos estrechos, caminos rurales y entradas a explotaciones.',
            'Trabajo en cuadrilla, donde varias personas se mueven cerca de la máquina.',
          ],
        },
        {
          eyebrow: 'La solución',
          title: 'Visión 360° y detección adaptadas al campo',
          paragraphs: [
            'Vision360IA combina cámaras 360° de alta definición y detección de personas y obstáculos por IA, montadas y calibradas para la geometría concreta de cada máquina agrícola. El operador ve una vista cenital del entorno y recibe alertas cuando hay una persona en una zona de riesgo.',
            'El sistema está pensado para condiciones reales del campo: polvo, vibraciones, golpes y largas jornadas. Se instala como retrofit sobre la maquinaria existente, sin necesidad de renovar el parque.',
          ],
        },
      ]}
      faq={{
        eyebrow: 'FAQ Maquinaria agrícola',
        title: 'Preguntas frecuentes sobre visión 360° en maquinaria agrícola',
        items: [
          {
            question: '¿Resiste el polvo, las vibraciones y el trabajo intensivo del campo?',
            answer:
              'Las cámaras y los equipos se seleccionan e instalan para soportar condiciones exigentes (polvo, humedad, vibraciones, golpes). La estanqueidad y la fijación se definen según el tipo de máquina y su uso.',
          },
          {
            question: '¿Se puede instalar en una cosechadora o tractor que ya tengo?',
            answer:
              'Sí. La instalación es retrofit sobre maquinaria en uso. La configuración (número y posición de cámaras) se adapta a la geometría de cada máquina para no dejar zonas sin cubrir.',
          },
          {
            question: '¿Sirve también para el transporte por carretera entre fincas?',
            answer:
              'Sí. La visión 360° es útil tanto en el trabajo en parcela como en los desplazamientos por carretera, donde los remolques y aperos generan ángulos muertos importantes hacia atrás y los laterales.',
          },
          {
            question: '¿Detecta personas o solo muestra la imagen?',
            answer:
              'Según la configuración, el sistema puede ir más allá de mostrar la imagen y detectar activamente personas y obstáculos en las zonas de riesgo, avisando al operador. Esa capa de detección es lo que convierte la cámara en prevención real.',
          },
        ],
      }}
      cta={{
        eyebrow: 'Siguiente paso',
        title: 'Protege a tu equipo en la operación agrícola',
        description:
          'Analizamos tu maquinaria, sus maniobras y su entorno de trabajo para definir la visión 360° y la detección que necesita cada máquina.',
        buttonLabel: 'Solicitar evaluación técnica',
        buttonHref: '/#contacto',
        relatedLinks: [
          { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° para vehículos industriales' },
          { href: '/deteccion-angulos-muertos', label: 'Detección de ángulos muertos' },
          { href: '/vision-360-maquinaria-obras-publicas', label: 'Maquinaria de obras públicas' },
        ],
      }}
    />
  );
}
