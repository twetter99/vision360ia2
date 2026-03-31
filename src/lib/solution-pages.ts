import {
  BarChart3,
  Brain,
  Bus,
  Camera,
  CheckCircle,
  Clock3,
  Cpu,
  Eye,
  HardHat,
  Layers3,
  MapPin,
  Recycle,
  RotateCcw,
  ScanEye,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Truck,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';

import type { SolutionPageContent } from '@/components/sections/solution-page-template';

export const solutionPages: Record<string, SolutionPageContent> = {
  'adas-autobuses': {
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué sistema ADAS ayuda a reducir puntos ciegos en autobuses urbanos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vision360IA combina cámaras 360°, detección de peatones y ciclistas con IA y arquitectura preparada para operación urbana intensiva. Ayuda a reducir puntos ciegos en giros, arranques y maniobras de parada, y facilita cumplimiento GSR en flotas profesionales.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cómo se amortiza un sistema ADAS en una flota de autobuses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Normalmente se amortiza evitando uno o dos incidentes relevantes, reduciendo inmovilizaciones, reclamaciones y exposición al riesgo en maniobras urbanas. La configuración depende de la geometría del vehículo y del nivel de integración requerido por la flota.',
            },
          },
          {
            '@type': 'Question',
            name: '¿El sistema ADAS para autobuses facilita cumplimiento GSR europeo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Vision360IA está preparado para R151, R158 y R159, lo que ayuda a operadores y talleres a desplegar una solución coherente en retrofit sobre autobuses de servicio urbano e interurbano ya operativos.',
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Sistema ADAS para Autobuses - Vision360IA',
        description:
          'Sistema ADAS para autobuses con cámaras 360°, detección de peatones y ciclistas y arquitectura preparada para mejorar seguridad urbana y facilitar cumplimiento GSR en flotas profesionales.',
        brand: { '@type': 'Brand', name: 'Vision360IA' },
        category: 'Sistemas ADAS para Autobuses',
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'EUR',
        },
      },
    ],
    theme: {
      heroBackground:
        'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_24%),linear-gradient(180deg,#0f172a_0%,#1e293b_20%,#111827_100%)]',
      heroGlowStart: 'bg-amber-400/18',
      heroGlowEnd: 'bg-sky-300/12',
      accentText: 'text-amber-700/80',
      accentSoftText: 'text-amber-300/80',
      badgeIcon: 'text-amber-400',
      heroPanelIconBg: 'bg-amber-500/20',
      heroPanelIconText: 'text-amber-300',
      heroPanelAccent: 'text-amber-300',
      primaryButton: 'bg-amber-500 text-black hover:bg-amber-600',
      darkPanel:
        'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_28%),linear-gradient(180deg,#0f172a,#111827)]',
      specDot: 'text-amber-500 bg-amber-500',
      relatedLinkHover: 'hover:text-white',
    },
    hero: {
      badge: 'ADAS para flotas de autobuses',
      badgeIcon: Bus,
      title: 'Reduce puntos ciegos y maniobras de riesgo en tu flota de autobuses',
      description:
        'Sistema de cámaras 360° con detección inteligente de peatones y ciclistas para autobuses urbanos e interurbanos. Diseñado para mejorar seguridad, reducir incidentes y facilitar cumplimiento sin penalizar la operación.',
      highlights: [
        'Paradas frecuentes en entorno urbano',
        'Exposición continua a peatones y ciclistas',
        'Giros con ángulo muerto crítico',
        'Operación intensiva con presión de servicio',
      ],
      primaryCtaLabel: 'Solicitar información técnica',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver demostración en vídeo',
      secondaryCtaHref: '/#productos',
      panelEyebrow: 'Entorno de operación',
      panelTitle: 'Operación urbana con exposición constante al riesgo',
      panelIcon: Users,
      panelStats: [
        { value: '+2.000', label: 'vehículos instalados' },
        { value: '40%', label: 'menos incidentes en maniobra' },
        { value: 'GSR', label: 'R151, R158 y R159' },
      ],
      panelBenefitsLabel: 'Lo que gana la flota',
      panelBenefits: [
        'Menos exposición a incidentes en giros, paradas y arranques.',
        'Mayor visibilidad para el conductor en servicio urbano intensivo.',
        'Despliegue compatible con operación real y retrofit sobre flota existente.',
      ],
    },
    context: {
      eyebrow: 'Riesgo operativo',
      title: 'El mayor riesgo en autobuses urbanos: los puntos ciegos',
      paragraphs: [
        'Un autobús opera todos los días en entornos con peatones, ciclistas, scooters, tráfico denso y paradas continuas. Esa combinación multiplica el riesgo en maniobras de baja velocidad y en giros con visibilidad limitada.',
        'Vision360IA elimina esos puntos ciegos con visión cenital 360° y detección inteligente de usuarios vulnerables de la vía en las zonas de mayor exposición.',
        'No es solo una cámara: es una solución activa para ayudar al conductor a reaccionar antes de que una maniobra termine en incidente, reclamación o parada de servicio.',
      ],
      sideTitle: 'Escenarios críticos',
      sideItems: [
        'Giros urbanos con ángulo muerto lateral.',
        'Arranque en parada con cruce de pasajeros.',
        'Intercambios con bicicletas y VMP.',
        'Operación continua en tráfico denso y horarios extensos.',
      ],
    },
    features: {
      eyebrow: 'Arquitectura para flota',
      title: 'Beneficios para operadores de autobús y gestores de flota',
      cards: [
        {
          icon: Eye,
          title: 'Elimina puntos ciegos en maniobras urbanas',
          desc: 'Cámaras HD con vista cenital unificada para mejorar visibilidad en giros, salidas de parada y maniobras en calles estrechas.',
          tone: 'border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-sky-500 to-blue-600',
          tag: 'Prevención visual',
        },
        {
          icon: ShieldCheck,
          title: 'Protege a peatones y ciclistas en tiempo real',
          desc: 'La IA detecta usuarios vulnerables de la vía en zonas de riesgo y alerta al conductor antes de que la maniobra termine en incidente.',
          tone: 'border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
          iconTone: 'bg-gradient-to-br from-amber-400 to-orange-500',
          tag: 'Protección VRU',
        },
        {
          icon: Brain,
          title: 'Analiza el riesgo antes de que llegue el siniestro',
          desc: 'Algoritmos embarcados procesan el entorno en milisegundos para clasificar riesgos y mejorar la reacción del conductor.',
          tone: 'border-emerald-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))]',
          iconTone: 'bg-gradient-to-br from-emerald-500 to-teal-500',
          tag: 'IA embarcada',
        },
        {
          icon: CheckCircle,
          title: 'Facilita cumplimiento GSR en flota real',
          desc: 'Arquitectura preparada para R151, R158 y R159 en retrofit sobre autobuses ya operativos.',
          tone: 'border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,243,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
          tag: 'Normativa',
        },
      ],
    },
    middleSection: {
      type: 'tag-grid',
      eyebrow: 'Tipos de flota',
      title: 'Configuración adaptable a distintas tipologías de servicio',
      description:
        'Una misma arquitectura puede adaptarse a urbano, interurbano, lanzaderas o retrofit según geometría del vehículo y nivel de exposición al riesgo.',
      items: ['Urbanos', 'Interurbanos', 'Lanzaderas', 'BRT', 'Escolares', 'Regionales', 'Aeropuerto', 'Retrofit'],
    },
    metrics: {
      eyebrow: 'Resultados reales',
      title: 'Impacto directo en seguridad y operación',
      items: [
        { value: '360°', label: 'cobertura perimetral' },
        { value: 'IP69K', label: 'grado industrial' },
        { value: '< 1 min', label: 'calibración automática' },
        { value: '24/7', label: 'operación de flota' },
      ],
    },
    faq: {
      eyebrow: 'FAQ para operadores',
      title: 'Preguntas frecuentes sobre seguridad 360° en autobuses',
      items: [
        {
          q: '¿Qué sistema ayuda a reducir puntos ciegos en autobuses urbanos?',
          a: 'Una solución que combine visión cenital 360°, detección de peatones y ciclistas y arquitectura pensada para servicio urbano real. Vision360IA está diseñada precisamente para ese escenario.',
        },
        {
          q: '¿Cómo se amortiza un sistema ADAS en una flota de autobuses?',
          a: 'Normalmente evitando uno o dos incidentes relevantes, reduciendo inmovilizaciones, reclamaciones y exposición al riesgo en maniobras de parada y giro.',
        },
        {
          q: '¿La solución facilita cumplimiento GSR?',
          a: 'Sí. Vision360IA está preparada para R151, R158 y R159, lo que facilita despliegues coherentes en retrofit sobre flota existente.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Protege tu flota de autobuses con visión 360° inteligente',
      description:
        'Solicita una sesión técnica para revisar riesgos, tipología de servicio y la configuración más eficaz para tu operación.',
      buttonLabel: 'Ver si encaja en mi flota',
      buttonHref: '/#contacto',
      relatedLinks: [
        { href: '/adas-camiones', label: 'ADAS para Camiones' },
        { href: '/anti-atropellos-peatones-ciclistas', label: 'Sistema Anti-Atropellos' },
        { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
        { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° Vehículos Industriales' },
        { href: '/adas-vehiculos-recogida-residuos', label: 'ADAS Recogida de Residuos' },
      ],
    },
  },
  'adas-camiones': {
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué solución ayuda a reducir puntos ciegos en camiones y cumplir GSR?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Una solución que combine visión 360°, detección de peatones y ciclistas y arquitectura preparada para R151, R158 y R159. Vision360IA está diseñada para reducir puntos ciegos y facilitar despliegues coherentes en transporte pesado.',
            },
          },
          {
            '@type': 'Question',
            name: '¿La solución funciona en tractoras, rígidos y articulados?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Vision360IA está preparado para rígidos, tractoras y vehículos articulados, con configuración adaptable a la geometría del vehículo, compatibilidad 12V y 24V y robustez industrial para operación exigente.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cómo reduce costes una solución ADAS en flotas de camiones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Se amortiza evitando uno o dos incidentes relevantes, reduciendo inmovilizaciones, daños en maniobra y exposición al siniestro. Además, aporta información útil para formación, operación y prevención.',
            },
          },
        ],
      },
    ],
    theme: {
      heroBackground:
        'bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_24%),linear-gradient(180deg,#0f172a_0%,#111827_22%,#020617_100%)]',
      heroGlowStart: 'bg-sky-400/18',
      heroGlowEnd: 'bg-amber-300/12',
      accentText: 'text-sky-700/80',
      accentSoftText: 'text-sky-300/80',
      badgeIcon: 'text-sky-400',
      heroPanelIconBg: 'bg-sky-500/20',
      heroPanelIconText: 'text-sky-300',
      heroPanelAccent: 'text-sky-300',
      primaryButton: 'bg-sky-500 text-white hover:bg-sky-600',
      darkPanel:
        'bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#0f172a,#111827)]',
      specDot: 'text-sky-500 bg-sky-500',
      relatedLinkHover: 'hover:text-white',
    },
    hero: {
      badge: 'ADAS para transporte pesado',
      badgeIcon: Truck,
      title: 'Reduce puntos ciegos y riesgo de siniestro en tu flota de camiones',
      description:
        'Sistema de cámaras 360° con detección inteligente de peatones y ciclistas para camiones, rígidos, tractoras y articulados. Diseñado para mejorar maniobras, reducir incidentes y facilitar implantación sobre flota real.',
      highlights: [
        'Ángulos muertos de gran tamaño',
        'Tractoras, rígidos y articulados',
        'Convivencia con peatones y ciclistas',
        'Maniobras críticas en muelles y ciudad',
      ],
      primaryCtaLabel: 'Solicitar información técnica',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver demostración en vídeo',
      secondaryCtaHref: '/#productos',
      panelEyebrow: 'Entorno de operación',
      panelTitle: 'Operación de camión con máxima exposición al riesgo',
      panelIcon: Users,
      panelStats: [
        { value: '12V / 24V', label: 'compatibilidad de plataforma' },
        { value: 'IP69K', label: 'grado industrial' },
        { value: 'GSR', label: 'R151, R158 y R159' },
      ],
      panelBenefitsLabel: 'Lo que gana la flota',
      panelBenefits: [
        'Menos exposición a golpes, atropellos y maniobras inseguras.',
        'Mayor visibilidad para conductores en ciudad, muelle y accesos logísticos.',
        'Despliegue retrofit sobre flota mixta ya operativa.',
      ],
    },
    context: {
      eyebrow: 'Riesgo operativo',
      title: 'El principal riesgo en camiones: los puntos ciegos y la maniobra',
      paragraphs: [
        'Los camiones concentran algunos de los puntos ciegos más peligrosos de la vía. El riesgo se dispara en giros urbanos, accesos a muelles, maniobras de marcha atrás y entornos mixtos con peatones y ciclistas.',
        'Vision360IA aporta visión cenital 360° y detección inteligente para reducir esa exposición en rígidos, tractoras y articulados.',
        'No se limita a mostrar imagen: ayuda a prevenir incidentes, reducir daños en maniobra y mejorar la seguridad operativa de la flota.',
      ],
      sideTitle: 'Escenarios críticos',
      sideItems: [
        'Giro urbano con ángulo muerto lateral.',
        'Marcha atrás y maniobras en muelle.',
        'Entornos mixtos con peatones y bicicletas.',
        'Operación con remolque y geometrías variables.',
      ],
    },
    features: {
      eyebrow: 'Arquitectura para flota',
      title: 'Beneficios para gestores de transporte pesado',
      cards: [
        {
          icon: Eye,
          title: 'Reduce puntos ciegos en transporte pesado',
          desc: 'Cámaras HD en cabina, laterales y trasera generan una vista cenital unificada para maniobras más seguras incluso con remolque.',
          tone: 'border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-sky-500 to-blue-600',
          tag: 'Prevención visual',
        },
        {
          icon: ShieldCheck,
          title: 'Protege a peatones y ciclistas en zonas críticas',
          desc: 'La IA detecta usuarios vulnerables de la vía y alerta al conductor en maniobra, giro urbano y accesos logísticos.',
          tone: 'border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
          iconTone: 'bg-gradient-to-br from-amber-400 to-orange-500',
          tag: 'Protección VRU',
        },
        {
          icon: Brain,
          title: 'Analiza el entorno antes del incidente',
          desc: 'La ECU procesa cámaras y clasifica riesgos en milisegundos para ayudar a reducir colisiones, golpes y maniobras inseguras.',
          tone: 'border-emerald-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))]',
          iconTone: 'bg-gradient-to-br from-emerald-500 to-teal-500',
          tag: 'IA embarcada',
        },
        {
          icon: CheckCircle,
          title: 'Implantación sobre flota existente',
          desc: 'Arquitectura compatible con 12V y 24V, preparada para transporte pesado y retrofit con robustez industrial.',
          tone: 'border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,243,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
          tag: 'Integración',
        },
      ],
    },
    middleSection: {
      type: 'tag-grid',
      eyebrow: 'Tipos de flota',
      title: 'Configuración adaptable a distintas plataformas de camión',
      description:
        'Arquitectura válida para largo recorrido, distribución, construcción y logística urbana, con ajuste según geometría y nivel de exposición al riesgo.',
      items: ['Rígidos', 'Tractoras', 'Articulados', 'Frigoríficos', 'Obra', 'Distribución', 'Portacontenedores', 'Retrofit'],
    },
    metrics: {
      eyebrow: 'Impacto operativo',
      title: 'Impacto directo en seguridad y continuidad de servicio',
      items: [
        { value: '40%', label: 'menos incidentes' },
        { value: '+2.000', label: 'vehículos equipados' },
        { value: '2 años', label: 'garantía completa' },
        { value: '< 1 min', label: 'calibración automática' },
      ],
    },
    faq: {
      eyebrow: 'FAQ para gestores',
      title: 'Preguntas frecuentes sobre seguridad 360° en camiones',
      items: [
        {
          q: '¿Qué solución ayuda a reducir puntos ciegos en camiones y cumplir GSR?',
          a: 'Una solución que combine visión 360°, detección de peatones y ciclistas y arquitectura preparada para R151, R158 y R159. Vision360IA está pensada para ese escenario.',
        },
        {
          q: '¿Funciona en rígidos, tractoras y articulados?',
          a: 'Sí. La arquitectura se adapta a la geometría del vehículo y a flotas mixtas con compatibilidad 12V y 24V.',
        },
        {
          q: '¿Cómo reduce costes en una flota de camiones?',
          a: 'Evitando uno o dos incidentes relevantes, reduciendo inmovilizaciones, daños en maniobra y exposición al siniestro en operación urbana y logística.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Protege tu flota de camiones con visión 360° inteligente',
      description:
        'Solicita una sesión técnica para revisar geometría del vehículo, riesgos operativos y la configuración más eficaz para tu flota.',
      buttonLabel: 'Ver si encaja en mi flota',
      buttonHref: '/#contacto',
      relatedLinks: [
        { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
        { href: '/anti-atropellos-peatones-ciclistas', label: 'Sistema Anti-Atropellos' },
        { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
        { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° Vehículos Industriales' },
        { href: '/adas-vehiculos-recogida-residuos', label: 'ADAS Recogida de Residuos' },
      ],
    },
  },
  'adas-vehiculos-recogida-residuos': {
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Por qué los vehículos de recogida de residuos necesitan ADAS específico?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Los camiones de recogida operan en entornos urbanos con paradas cada 50-100 metros, marcha atrás frecuente, operarios caminando alrededor del vehículo y circulación lenta junto a peatones y ciclistas. Es uno de los escenarios con mayor riesgo de atropello. Un ADAS genérico no cubre estas particularidades; Vision360IA está optimizado para maniobras de baja velocidad con detección de personas en proximidad.',
            },
          },
          {
            '@type': 'Question',
            name: '¿El sistema detecta a los operarios de recogida?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. La IA de Vision360IA detecta personas en todas las zonas del vehículo: lateral, trasera y frontal. Esto incluye a los operarios que trabajan en la parte trasera o lateral del camión. Se configuran zonas de exclusión específicas para las áreas de trabajo y el sistema alerta si el vehículo se mueve mientras hay personas en ellas.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Es compatible con los diferentes tipos de camión de recogida?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Vision360IA se instala en camiones de carga lateral, carga trasera, carga superior, vehículos de recogida selectiva y barredoras. Compatible con 12V y 24V, y con chasis de cualquier fabricante. Las cámaras IP69K resisten los lavados industriales a alta presión.',
            },
          },
        ],
      },
    ],
    theme: {
      heroBackground:
        'bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_24%),linear-gradient(180deg,#052e16_0%,#0f172a_22%,#020617_100%)]',
      heroGlowStart: 'bg-green-400/18',
      heroGlowEnd: 'bg-emerald-300/12',
      accentText: 'text-green-700/80',
      accentSoftText: 'text-green-300/80',
      badgeIcon: 'text-green-400',
      heroPanelIconBg: 'bg-green-500/20',
      heroPanelIconText: 'text-green-300',
      heroPanelAccent: 'text-green-300',
      primaryButton: 'bg-green-500 text-white hover:bg-green-600',
      darkPanel:
        'bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_28%),linear-gradient(180deg,#0f172a,#111827)]',
      specDot: 'text-green-500 bg-green-500',
      relatedLinkHover: 'hover:text-white',
    },
    hero: {
      badge: 'Recogida de residuos',
      badgeIcon: Recycle,
      title: 'Protege a operarios y ciudadanos en la recogida urbana con visión 360° inteligente',
      description:
        'Sistema ADAS para vehículos RSU que detecta operarios, peatones y ciclistas en maniobras de baja velocidad y ayuda a reducir incidentes en un entorno urbano de máxima exposición.',
      highlights: [
        'Operarios alrededor del vehículo',
        'Marcha atrás recurrente',
        'Calles estrechas y contenedores',
        'Turnos nocturnos con baja visibilidad',
      ],
      primaryCtaLabel: 'Ver si encaja en mi flota',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver demostración en vídeo',
      secondaryCtaHref: '/#productos',
      panelEyebrow: 'Escenario crítico',
      panelTitle: 'Recogida urbana con operarios en zona crítica',
      panelIcon: Users,
      panelStats: [
        { value: '50-100 m', label: 'paradas urbanas frecuentes' },
        { value: '< 5 km/h', label: 'detección IA en maniobra lenta' },
        { value: 'IP69K', label: 'lavado industrial a presión' },
      ],
      panelBenefitsLabel: 'Lo que gana la flota',
      panelBenefits: [
        'Menos exposición a atropellos y golpes en maniobra lenta.',
        'Mayor control sobre operarios y peatones en proximidad.',
        'Robustez industrial para lavado, suciedad y turnos intensivos.',
      ],
    },
    context: {
      eyebrow: 'Riesgo operativo real',
      title: 'El mayor riesgo en recogida urbana: operarios, maniobra lenta y visibilidad cambiante',
      paragraphs: [
        'Los vehículos de recogida de residuos conviven de forma constante con operarios, peatones, bicicletas, mobiliario urbano y maniobras de baja velocidad que cambian en segundos.',
        'Los operarios de recogida trabajan junto al vehículo, muchas veces en la parte trasera o lateral, mientras el conductor gestiona maniobra, entorno y servicio. Ese contexto dispara el riesgo operativo.',
        'Vision360IA aporta una solución de visión 360° con IA optimizada para ese escenario: detecta personas en las zonas de riesgo, ayuda a reaccionar antes y mantiene robustez industrial durante jornadas exigentes.',
      ],
      sideTitle: 'Puntos de tensión diaria',
      sideItems: [
        'Operarios subiendo y bajando en cada parada.',
        'Convivencia con peatones, bicicletas y mobiliario urbano.',
        'Cambios de visibilidad entre madrugada, lluvia y suciedad.',
        'Necesidad de reacción rápida sin saturar al conductor.',
      ],
    },
    features: {
      eyebrow: 'Arquitectura para RSU',
      title: 'Beneficios para una operación RSU más segura y controlada',
      cards: [
        {
          icon: Eye,
          title: 'Reduce puntos ciegos en maniobras de baja velocidad',
          desc: 'Vista cenital completa para calles estrechas, rotondas, contenedores y maniobras repetitivas donde el riesgo cambia en segundos.',
          tone: 'border-green-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))]',
          iconTone: 'bg-gradient-to-br from-green-500 to-emerald-600',
          tag: 'Prevención visual',
        },
        {
          icon: ShieldCheck,
          title: 'Protege a operarios en torno al vehículo',
          desc: 'Zonas de exclusión trasera y lateral con alertas si el vehículo se mueve mientras hay personal en zona de riesgo.',
          tone: 'border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
          iconTone: 'bg-gradient-to-br from-amber-400 to-orange-500',
          tag: 'Seguridad de equipo',
        },
        {
          icon: Brain,
          title: 'Detecta riesgo donde una cámara pasiva no basta',
          desc: 'Algoritmos ajustados para maniobras por debajo de 5 km/h, donde operarios, peatones y ciclistas conviven muy cerca del vehículo.',
          tone: 'border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-sky-500 to-blue-600',
          tag: 'IA de proximidad',
        },
        {
          icon: MapPin,
          title: 'Adapta alertas al contexto operativo',
          desc: 'Configura comportamiento distinto según casco urbano, polígono, entorno escolar o tramo de ruta para reducir ruido y mejorar utilidad.',
          tone: 'border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,243,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
          tag: 'Ruta y contexto',
        },
      ],
    },
    middleSection: {
      type: 'tag-grid',
      eyebrow: 'Compatibilidad de flota',
      title: 'Configuración adaptable a cada tipología de vehículo RSU',
      description:
        'Arquitectura válida para flotas municipales, contratas urbanas y vehículos especiales con distintos ciclos, geometrías y niveles de exposición al riesgo.',
      items: ['Carga lateral', 'Carga trasera', 'Carga superior', 'Recogida selectiva', 'Barredoras', 'Lavacontenedores', 'Furgonetas RSU', 'Volquetes'],
    },
    metrics: {
      eyebrow: 'Datos de impacto',
      title: 'Indicadores clave para maniobra y seguridad RSU',
      items: [
        { value: '360°', label: 'sin ángulos muertos' },
        { value: 'IP69K', label: 'resistencia industrial' },
        { value: '12V / 24V', label: 'compatibilidad total' },
        { value: '< 1 min', label: 'calibración automática' },
      ],
    },
    faq: {
      eyebrow: 'FAQ para flotas municipales',
      title: 'Preguntas frecuentes sobre seguridad 360° en recogida de residuos',
      items: [
        {
          q: '¿Por qué la recogida de residuos necesita un ADAS específico?',
          a: 'Porque combina operarios alrededor del vehículo, marcha atrás frecuente, baja velocidad y visibilidad cambiante. Vision360IA está optimizado para ese contexto.',
        },
        {
          q: '¿Detecta a los operarios de recogida?',
          a: 'Sí. Detecta personas en las zonas lateral, frontal y trasera y puede activar alertas o zonas de exclusión según el área de trabajo.',
        },
        {
          q: '¿Es compatible con distintos tipos de camión RSU?',
          a: 'Sí. Se adapta a carga lateral, trasera, superior, selectiva y barredoras, con compatibilidad 12V/24V y robustez IP69K.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Refuerza la seguridad de operarios y ciudadanos en tu flota RSU',
      description:
        'Estudio técnico personalizado para revisar maniobras, tipología de vehículo y configuración más eficaz para reducir incidentes en recogida urbana.',
      buttonLabel: 'Ver si encaja en mi flota',
      buttonHref: '/#contacto',
      relatedLinks: [
        { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
        { href: '/adas-camiones', label: 'ADAS para Camiones' },
        { href: '/anti-atropellos-peatones-ciclistas', label: 'Sistema Anti-Atropellos' },
        { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° Vehículos Industriales' },
        { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
      ],
    },
  },
  'anti-atropellos-peatones-ciclistas': {
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cómo ayuda el sistema a prevenir atropellos con peatones y ciclistas?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vision360IA utiliza cámaras HD y visión artificial para reconocer peatones y ciclistas, calcular su trayectoria y alertar al conductor cuando existe riesgo en las zonas críticas del vehículo.',
            },
          },
          {
            '@type': 'Question',
            name: '¿En qué maniobras se concentra más riesgo de atropello?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El mayor riesgo se concentra en giros urbanos, marcha atrás, arranque en parada y maniobras en zonas de carga o tráfico mixto. Vision360IA está diseñado para cubrir esos escenarios con cámaras y alertas dedicadas.',
            },
          },
          {
            '@type': 'Question',
            name: '¿La normativa GSR exige protección VRU en vehículos nuevos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. El GSR exige sistemas como BSIS y otras funciones de protección en camiones y autobuses nuevos. Vision360IA está preparado para ayudar a operadores y talleres a desplegar una solución coherente orientada a VRU desde retrofit o posventa.',
            },
          },
        ],
      },
    ],
    theme: {
      heroBackground:
        'bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_24%),linear-gradient(180deg,#450a0a_0%,#0f172a_24%,#020617_100%)]',
      heroGlowStart: 'bg-red-400/18',
      heroGlowEnd: 'bg-rose-300/12',
      accentText: 'text-red-700/80',
      accentSoftText: 'text-red-300/80',
      badgeIcon: 'text-red-400',
      heroPanelIconBg: 'bg-red-500/20',
      heroPanelIconText: 'text-red-300',
      heroPanelAccent: 'text-red-300',
      primaryButton: 'bg-red-500 text-white hover:bg-red-600',
      darkPanel:
        'bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_28%),linear-gradient(180deg,#0f172a,#111827)]',
      specDot: 'text-red-500 bg-red-500',
      relatedLinkHover: 'hover:text-white',
    },
    hero: {
      badge: 'Protección VRU',
      badgeIcon: ShieldAlert,
      title: 'Reduce el riesgo de atropello en maniobras urbanas con detección VRU inteligente',
      description:
        'Sistema anti-atropellos para autobuses, camiones y flotas urbanas que detecta peatones y ciclistas en tiempo real y alerta al conductor antes de que la maniobra termine en incidente.',
      highlights: [
        'Giro a la derecha en ciudad',
        'Marcha atrás con visibilidad limitada',
        'Arranque en parada y zonas de carga',
        'Convivencia con peatones y ciclistas',
      ],
      primaryCtaLabel: 'Ver si encaja en mi flota',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver demostración en vídeo',
      secondaryCtaHref: '/#productos',
      panelEyebrow: 'Prevención activa',
      panelTitle: 'Detección antes del impacto',
      panelIcon: Siren,
      panelStats: [
        { value: '<100 ms', label: 'detección IA' },
        { value: '3 s', label: 'ventana de anticipación' },
        { value: 'GSR', label: 'R151, R158 y R159' },
      ],
      panelBenefitsLabel: 'Lo que gana la flota',
      panelBenefits: [
        'Menos exposición a atropellos en giros, marcha atrás y arranque.',
        'Alertas con tiempo útil de reacción para el conductor.',
        'Cobertura orientada a las zonas donde más riesgo concentra el vehículo.',
      ],
    },
    context: {
      eyebrow: 'Riesgo vial real',
      title: 'El riesgo más crítico en flotas urbanas: no ver al usuario vulnerable a tiempo',
      paragraphs: [
        'Autobuses, camiones y vehículos municipales conviven cada día con peatones, ciclistas y scooters en maniobras donde unos segundos marcan la diferencia.',
        'Vision360IA convierte cámaras en una capa real de prevención: detecta VRU en las zonas de mayor exposición y ayuda al conductor a reaccionar antes de que se produzca el atropello.',
        'No es solo una ayuda visual. Es una solución pensada para reducir riesgo operativo, incidentes graves y presión reputacional en flotas que trabajan en ciudad.',
      ],
      sideTitle: 'Escenarios críticos',
      sideItems: [
        'Giro a la derecha en intersecciones y rotondas.',
        'Marcha atrás en zonas urbanas con poca visibilidad.',
        'Arranque en parada con usuarios cruzando delante del vehículo.',
        'Áreas de carga, descarga y maniobras con tráfico mixto.',
      ],
    },
    features: {
      eyebrow: 'Arquitectura VRU',
      title: 'Beneficios para una estrategia real de prevención de atropellos',
      cards: [
        {
          icon: ScanEye,
          title: 'Detecta peatones y ciclistas antes del impacto',
          desc: 'La visión artificial reconoce usuarios vulnerables de la vía, calcula trayectorias y ayuda a activar alertas con tiempo útil de reacción.',
          tone: 'border-red-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(254,242,242,0.96))]',
          iconTone: 'bg-gradient-to-br from-rose-500 to-red-600',
          tag: 'Detección VRU',
        },
        {
          icon: ShieldAlert,
          title: 'Alerta al conductor en el momento crítico',
          desc: 'Avisos visuales y sonoros con distintos niveles de criticidad para reducir la probabilidad de atropello en maniobras urbanas.',
          tone: 'border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
          iconTone: 'bg-gradient-to-br from-amber-400 to-orange-500',
          tag: 'Prevención activa',
        },
        {
          icon: Users,
          title: 'Cubre las zonas donde se concentran los atropellos',
          desc: 'Cámaras laterales, frontal baja y trasera eliminan ángulos muertos en giro urbano, marcha atrás y arranque en parada.',
          tone: 'border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-sky-500 to-blue-600',
          tag: 'Cobertura crítica',
        },
        {
          icon: Zap,
          title: 'Mantiene fiabilidad en condiciones reales',
          desc: 'Procesamiento adaptativo con HDR para conservar detección útil con baja luz, contraluz y meteorología adversa.',
          tone: 'border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,243,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
          tag: 'Operación real',
        },
      ],
    },
    metrics: {
      eyebrow: 'Impacto operativo',
      title: 'Indicadores clave para reducir riesgo VRU',
      items: [
        { value: '360°', label: 'sin ángulos muertos' },
        { value: '<100 ms', label: 'tiempo de detección' },
        { value: '3 s', label: 'anticipación' },
        { value: 'VRU', label: 'detección específica' },
      ],
    },
    faq: {
      eyebrow: 'FAQ para flotas',
      title: 'Preguntas frecuentes sobre prevención de atropellos',
      items: [
        {
          q: '¿Cómo ayuda el sistema a prevenir atropellos con peatones y ciclistas?',
          a: 'Detectando usuarios vulnerables de la vía, calculando su trayectoria y alertando al conductor cuando el riesgo aparece en las zonas críticas del vehículo.',
        },
        {
          q: '¿En qué maniobras se concentra más riesgo de atropello?',
          a: 'En giros urbanos, marcha atrás, arranque en parada y maniobras en zonas de carga o tráfico mixto.',
        },
        {
          q: '¿La normativa GSR exige protección VRU?',
          a: 'Sí. El GSR exige funciones de protección en camiones y autobuses nuevos, y Vision360IA está preparado para desplegar una solución coherente orientada a VRU.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Refuerza la prevención de atropellos en tu flota',
      description:
        'Solicita una demostración y revisemos qué maniobras, vehículos y zonas de riesgo deben cubrirse en tu operación.',
      buttonLabel: 'Ver si encaja en mi flota',
      buttonHref: '/#contacto',
      relatedLinks: [
        { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
        { href: '/adas-camiones', label: 'ADAS para Camiones' },
        { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
        { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° Vehículos Industriales' },
        { href: '/adas-vehiculos-recogida-residuos', label: 'ADAS Recogida de Residuos' },
      ],
    },
  },
  'camaras-vision-artificial-flotas': {
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué aporta una cámara con visión artificial frente a una cámara convencional?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Una cámara convencional solo registra imagen. Una cámara con visión artificial interpreta la escena, detecta eventos relevantes y convierte vídeo en alertas y datos útiles para la operación de flota.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuántas cámaras necesita un vehículo según su operación?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depende de la geometría del vehículo y de los riesgos a cubrir. Vision360IA adapta la configuración para asegurar cobertura útil y capturar los eventos realmente críticos de cada operación.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Se integra con el sistema de gestión de flotas existente?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Vision360IA ofrece integración con FMS para enviar eventos, alertas y analítica de conducción y facilitar supervisión centralizada en tiempo real.',
            },
          },
        ],
      },
    ],
    theme: {
      heroBackground:
        'bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_24%),linear-gradient(180deg,#1e1b4b_0%,#0f172a_24%,#020617_100%)]',
      heroGlowStart: 'bg-indigo-400/18',
      heroGlowEnd: 'bg-cyan-300/12',
      accentText: 'text-indigo-700/80',
      accentSoftText: 'text-indigo-300/80',
      badgeIcon: 'text-indigo-400',
      heroPanelIconBg: 'bg-indigo-500/20',
      heroPanelIconText: 'text-indigo-300',
      heroPanelAccent: 'text-indigo-300',
      primaryButton: 'bg-indigo-500 text-white hover:bg-indigo-600',
      darkPanel:
        'bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_28%),linear-gradient(180deg,#0f172a,#111827)]',
      specDot: 'text-indigo-500 bg-indigo-500',
      relatedLinkHover: 'hover:text-white',
    },
    hero: {
      badge: 'Visión Artificial',
      badgeIcon: Camera,
      title: 'Convierte vídeo en decisiones operativas para tu flota',
      description:
        'Cámaras de visión artificial para detectar riesgos, analizar conducción y enviar eventos útiles a operación, seguridad y gestión de flota.',
      highlights: [
        'Detección de personas y objetos',
        'Análisis de conducción y fatiga',
        'Integración cloud y FMS',
        'Procesamiento local sin internet',
      ],
      primaryCtaLabel: 'Ver si encaja en mi flota',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver demostración en vídeo',
      secondaryCtaHref: '/#productos',
      panelEyebrow: 'Arquitectura edge AI',
      panelTitle: 'Procesamiento útil para seguridad y control operativo',
      panelIcon: ScanEye,
      panelStats: [
        { value: '<100 ms', label: 'latencia edge AI' },
        { value: '1080p', label: 'resolución HD' },
        { value: '24/7', label: 'procesamiento continuo' },
      ],
      panelBenefitsLabel: 'Lo que gana la flota',
      panelBenefits: [
        'Detección automática de eventos críticos.',
        'Vídeo conectado con operación, seguridad y supervisión.',
        'Inferencia local incluso sin internet.',
      ],
    },
    context: {
      eyebrow: 'Qué aporta al negocio',
      title: 'La diferencia entre grabar y tener inteligencia operativa',
      paragraphs: [
        'Una flota no necesita solo cámaras. Necesita saber qué ha ocurrido, dónde ha ocurrido y si ese evento requiere una acción inmediata.',
        'Las cámaras de Vision360IA interpretan la escena en tiempo real y convierten vídeo en eventos útiles para seguridad, mantenimiento, supervisión y mejora de conducción.',
        'El resultado es una operación con más contexto, menos dependencia de revisión manual y mejor capacidad para reaccionar ante riesgos reales.',
      ],
      sideTitle: 'Capacidades diferenciales',
      sideItems: [
        'Detección automática de eventos relevantes.',
        'Inferencia embarcada sin depender de internet.',
        'Supervisión remota y explotación de eventos.',
        'Analítica para seguridad y comportamiento de conducción.',
      ],
    },
    features: {
      eyebrow: 'De la cámara al dato útil',
      title: 'Beneficios de la visión artificial en flota real',
      cards: [
        {
          icon: Eye,
          title: 'Detecta riesgos y eventos sin depender del ojo humano',
          desc: 'La IA distingue peatones, ciclistas, vehículos, señales y objetos con reglas de alerta adaptadas a la operación real.',
          tone: 'border-indigo-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,242,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-indigo-500 to-blue-600',
          tag: 'Detección útil',
        },
        {
          icon: Cpu,
          title: 'Procesa en el vehículo incluso sin cobertura',
          desc: 'La inferencia se ejecuta en la ECU para mantener respuesta inmediata aunque el vehículo pierda conectividad.',
          tone: 'border-cyan-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,254,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-cyan-500 to-sky-500',
          tag: 'Procesamiento local',
        },
        {
          icon: Wifi,
          title: 'Convierte eventos en supervisión centralizada',
          desc: 'Los eventos y alertas se envían a plataforma para supervisión remota, streaming bajo demanda y explotación analítica.',
          tone: 'border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
          iconTone: 'bg-gradient-to-br from-amber-400 to-orange-500',
          tag: 'Control de flota',
        },
        {
          icon: BarChart3,
          title: 'Mejora conducción, seguridad y eficiencia',
          desc: 'Scoring de conductores, detección de fatiga y recomendaciones accionables para reducir riesgo y mejorar operación.',
          tone: 'border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,243,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
          tag: 'Analítica operativa',
        },
      ],
    },
    middleSection: {
      type: 'spec-groups',
      eyebrow: 'Especificaciones técnicas',
      title: 'Cámaras y ECU preparadas para flota real',
      groups: [
        {
          title: 'Sensor y óptica',
          specs: ['Resolución HD 1920×1080', 'Ojo de pez >180° FOV', 'HDR + WDR adaptativo', 'Visión nocturna IR'],
        },
        {
          title: 'Procesamiento IA',
          specs: ['ECU con NPU dedicado', 'Edge computing on-board', 'Latencia <100ms', 'Modelos deep learning'],
        },
        {
          title: 'Robustez',
          specs: ['IP69K agua a presión', 'Operación -30°C a +70°C', 'Vibración MIL-STD-810G', 'Conectores M12 estancos'],
        },
      ],
    },
    metrics: {
      eyebrow: 'Rendimiento',
      title: 'Métricas de visión artificial aplicada',
      items: [
        { value: '<100 ms', label: 'latencia de detección' },
        { value: '360°', label: 'cobertura perimetral' },
        { value: '1080p', label: 'resolución HD' },
        { value: '24/7', label: 'procesamiento continuo' },
      ],
    },
    faq: {
      eyebrow: 'FAQ para flotas',
      title: 'Preguntas frecuentes sobre visión artificial aplicada',
      items: [
        {
          q: '¿Qué aporta una cámara con visión artificial frente a una cámara convencional?',
          a: 'Convierte vídeo en eventos y alertas útiles para operación y seguridad, en lugar de limitarse a grabar imagen.',
        },
        {
          q: '¿Cuántas cámaras necesita un vehículo?',
          a: 'Depende de la geometría y de los riesgos a cubrir. Vision360IA adapta la configuración para captar los eventos realmente críticos.',
        },
        {
          q: '¿Se integra con el sistema de gestión de flotas?',
          a: 'Sí. Puede enviar eventos, vídeo y analítica para supervisión centralizada y explotación operativa.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Activa visión artificial útil para tu operación',
      description:
        'Solicita una consulta técnica para definir qué eventos necesitas detectar, cómo integrarlos y qué arquitectura encaja mejor con tu flota.',
      buttonLabel: 'Ver si encaja en mi flota',
      buttonHref: '/#contacto',
      relatedLinks: [
        { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
        { href: '/adas-camiones', label: 'ADAS para Camiones' },
        { href: '/anti-atropellos-peatones-ciclistas', label: 'Sistema Anti-Atropellos' },
        { href: '/vision-360-vehiculos-industriales', label: 'Visión 360° Vehículos Industriales' },
        { href: '/adas-vehiculos-recogida-residuos', label: 'ADAS Recogida de Residuos' },
      ],
    },
  },
  'vision-360-vehiculos-industriales': {
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué maquinaria y vehículos industriales pueden equipar visión 360°?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vision360IA es compatible con excavadoras, retroexcavadoras, palas, carretillas, grúas móviles, dumpers, vehículos municipales y otra maquinaria pesada, con compatibilidad 12V y 24V.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Resiste las condiciones reales de obra e industria?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Las cámaras cuentan con certificación IP69K y están diseñadas para polvo, agua a presión, vibraciones y temperaturas extremas en entornos industriales severos.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Ayuda a reforzar prevención de riesgos laborales?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. La visión 360° y la detección de personas refuerzan medidas de protección colectiva y mejoran visibilidad en entornos con interacción persona-máquina.',
            },
          },
        ],
      },
    ],
    theme: {
      heroBackground:
        'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_24%),linear-gradient(180deg,#451a03_0%,#0f172a_24%,#020617_100%)]',
      heroGlowStart: 'bg-amber-400/18',
      heroGlowEnd: 'bg-orange-300/12',
      accentText: 'text-amber-700/80',
      accentSoftText: 'text-amber-300/80',
      badgeIcon: 'text-amber-400',
      heroPanelIconBg: 'bg-amber-500/20',
      heroPanelIconText: 'text-amber-300',
      heroPanelAccent: 'text-amber-300',
      primaryButton: 'bg-amber-500 text-slate-950 hover:bg-amber-600',
      darkPanel:
        'bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_28%),linear-gradient(180deg,#0f172a,#111827)]',
      specDot: 'text-emerald-500 bg-emerald-500',
      relatedLinkHover: 'hover:text-white',
    },
    hero: {
      badge: 'Vehículos industriales',
      badgeIcon: HardHat,
      title: 'Reduce riesgo persona-máquina con visión 360° para vehículos industriales',
      description:
        'Solución de visión 360° para maquinaria pesada, obra y vehículos industriales que mejora la maniobra, reduce puntos ciegos y ayuda a proteger a las personas en entorno severo.',
      highlights: [
        'Excavadoras y palas cargadoras',
        'Carretillas y grúas móviles',
        'Vehículos municipales y portuarios',
        'Operación en obra, patio y nave',
      ],
      primaryCtaLabel: 'Ver si encaja en mi flota',
      primaryCtaHref: '/#contacto',
      secondaryCtaLabel: 'Ver demostración en vídeo',
      secondaryCtaHref: '/#productos',
      panelEyebrow: 'Bird view industrial',
      panelTitle: 'Cobertura útil para maniobra crítica',
      panelIcon: Layers3,
      panelStats: [
        { value: '4-6', label: 'cámaras por vehículo' },
        { value: '360°', label: 'cobertura perimetral' },
        { value: 'IP69K', label: 'entorno industrial' },
      ],
      panelBenefitsLabel: 'Lo que gana la operación',
      panelBenefits: [
        'Mayor control visual en espacios estrechos y maniobras complejas.',
        'Menos exposición a golpes e incidentes con personas.',
        'Despliegue retrofit sobre maquinaria ya en operación.',
      ],
    },
    context: {
      eyebrow: 'Seguridad perimetral',
      title: 'El riesgo industrial más repetido: maniobrar sin visibilidad suficiente',
      paragraphs: [
        'En obra, nave o patio industrial, una maniobra con visibilidad limitada puede convertirse rápidamente en golpe, incidente persona-máquina o parada de operación.',
        'Vision360IA instala cámaras HD certificadas IP69K para crear una vista cenital 360° en cabina y reforzar la percepción del entorno inmediato.',
        'Además de mostrar el perímetro completo, la IA detecta personas y activa alertas o zonas de exclusión según el tipo de vehículo y el entorno de trabajo.',
      ],
      sideTitle: 'Maquinaria compatible',
      sideItems: [
        'Excavadoras y retroexcavadoras',
        'Palas cargadoras y dumpers',
        'Carretillas elevadoras y grúas móviles',
        'Vehículos municipales y maquinaria portuaria',
      ],
      sideStyle: 'check',
    },
    features: {
      eyebrow: 'Capas del sistema',
      title: 'Beneficios para seguridad y control de maniobra',
      cards: [
        {
          icon: Eye,
          title: 'Reduce puntos ciegos en maniobras industriales',
          desc: 'Fusión en tiempo real de 4-6 cámaras para mostrar todo el entorno del vehículo en una sola vista continua.',
          tone: 'border-amber-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,251,235,0.96))]',
          iconTone: 'bg-gradient-to-br from-amber-400 to-orange-500',
          tag: 'Visión 360°',
        },
        {
          icon: Shield,
          title: 'Protege a personas en zona de riesgo',
          desc: 'Reconocimiento inteligente de trabajadores con alertas escalonadas según proximidad y trayectoria alrededor de la máquina.',
          tone: 'border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-sky-500 to-blue-600',
          tag: 'Protección activa',
        },
        {
          icon: Cpu,
          title: 'Mantiene fiabilidad en entorno severo',
          desc: 'Cámaras, cableado y conectores diseñados para polvo, agua a presión y vibraciones severas en obra e industria pesada.',
          tone: 'border-violet-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,243,255,0.96))]',
          iconTone: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
          tag: 'Robustez',
        },
        {
          icon: RotateCcw,
          title: 'Activa alertas en zonas de exclusión',
          desc: 'Define perímetros virtuales alrededor del vehículo para avisar automáticamente cuando alguien entra en una zona crítica.',
          tone: 'border-emerald-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(236,253,245,0.96))]',
          iconTone: 'bg-gradient-to-br from-emerald-500 to-teal-500',
          tag: 'Control de maniobra',
        },
      ],
    },
    metrics: {
      eyebrow: 'Especificaciones clave',
      title: 'Indicadores de la visión 360° industrial',
      items: [
        { value: 'IP69K', label: 'protección máxima' },
        { value: '-30/+70°C', label: 'rango de temperatura' },
        { value: '<1 min', label: 'calibración automática' },
        { value: 'ISO 5006', label: 'visibilidad industrial' },
      ],
    },
    faq: {
      eyebrow: 'FAQ para industria',
      title: 'Preguntas frecuentes sobre visión 360° en maquinaria',
      items: [
        {
          q: '¿Qué maquinaria y vehículos industriales pueden equipar el sistema?',
          a: 'Excavadoras, palas, carretillas, grúas móviles, dumpers, vehículos municipales y otra maquinaria pesada con instalación 12V o 24V.',
        },
        {
          q: '¿Resiste las condiciones reales de obra?',
          a: 'Sí. Está diseñado para polvo, agua a presión, vibraciones y temperaturas extremas con componentes industriales certificados.',
        },
        {
          q: '¿Ayuda a reforzar prevención de riesgos?',
          a: 'Sí. Mejora visibilidad, control de maniobra y protección colectiva en entornos con interacción persona-máquina.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: 'Refuerza la seguridad de tu parque industrial con visión 360°',
      description:
        'Solicita un estudio técnico para definir cámaras, montaje y configuración de maniobra según tu maquinaria y entorno de trabajo.',
      buttonLabel: 'Ver si encaja en mi flota',
      buttonHref: '/#contacto',
      relatedLinks: [
        { href: '/adas-autobuses', label: 'ADAS para Autobuses' },
        { href: '/adas-camiones', label: 'ADAS para Camiones' },
        { href: '/anti-atropellos-peatones-ciclistas', label: 'Sistema Anti-Atropellos' },
        { href: '/camaras-vision-artificial-flotas', label: 'Cámaras con Visión Artificial' },
        { href: '/adas-vehiculos-recogida-residuos', label: 'ADAS Recogida de Residuos' },
      ],
    },
  },
};