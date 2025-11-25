
import { findImage } from './placeholder-images';

const baseTranslations = {
  header: {
    login: 'Iniciar Sesión',
    getQuote: 'Pedir Presupuesto',
    openMenu: 'Abrir Menú',
    changeLanguage: 'Cambiar idioma',
  },
  footer: {
    tagline: 'Soluciones Avanzadas de Seguridad para Vehículos para un mañana más seguro.',
    followUsOn: 'Síguenos en',
    quickLinks: 'Enlaces Rápidos',
    company: {
      title: 'Compañía',
      about: 'Sobre Nosotros',
      jobs: 'Empleo',
      press: 'Prensa',
    },
    legal: {
      title: 'Legal',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
    },
    copyright: 'Todos los derechos reservados.',
  },
  hero: {
    title: 'Control 360° con IA: Reduce Riesgos, Maximiza Eficiencia.',
    subtitle: '-40% de incidentes en flotas en 6 meses.',
    description: 'Cada día, tu flota se enfrenta a lo imprevisible. Con **Vision360IA**, tus vehículos ven más allá: detectan riesgos, anticipan colisiones y convierten datos en seguridad activa. Tecnología **ADAS potenciada por IA**, diseñada para proteger lo que más importa: **tu equipo y tus activos**.',
    mainCta: 'Solicita demo',
    secondaryCta: 'Ver vídeo 60s',
    trustedBy: 'Con la confianza de las principales flotas',
    dailyChallenge: 'Cada día, tu flota se enfrenta a lo imprevisible.',
    vision360iaIntro: 'tus vehículos ven más allá',
    badges: {
      detectRisks: 'Detecta riesgos',
      anticipateCollisions: 'Anticipa colisiones',
      convertData: 'Convierte datos en seguridad activa',
    },
    adasTech: 'diseñada para proteger lo que más importa:',
    teamAssets: 'tu equipo y tus activos',
  },
  productsSection: {
    eyebrow: 'Ventajas Clave',
    title: 'Sistemas ADAS y Seguridad Vehicular con IA',
    description: 'Integramos hardware de vanguardia en tus vehículos: cámaras de alta definición y sensores robustos, procesados por algoritmos de IA, que analizan el entorno en tiempo real para anticipar peligros, eliminar puntos ciegos y garantizar una protección integral y eficiencia operativa superior.',
    addToCart: 'Más Información',
  },
  solutionsSection: {
    eyebrow: 'Soluciones a Medida',
    title: 'Soluciones ADAS y Gestión para Vehículos de Empresa',
    learnMore: 'Saber Más',
  },
  geofencingSection: {
    eyebrow: 'Automatización Geoespacial',
    title: 'Vallas Electrónicas: Tu Perímetro de Seguridad Virtual',
    description: 'Transforma el mapa en una herramienta de control activo. Delimita zonas exactas y automatiza la supervisión de tu flota según su ubicación.',
    features: [
      {
        title: 'Diseño de precisión flexible',
        description: 'Dibuja polígonos complejos, rectángulos o círculos para adaptarte exactamente a tu operación (almacenes, rutas prohibidas, zonas de clientes). Personaliza cada valla con nombre, descripción y colores para identificación visual inmediata.'
      },
      {
        title: 'Asignación inteligente de activos',
        description: 'Vincula dispositivos o grupos de vehículos específicos a cada valla. Tú decides qué reglas aplican a quién y dónde.'
      },
      {
        title: 'Reglas de automatización críticas',
        description: 'Configura disparadores automáticos basados en el comportamiento dentro del perímetro:',
        subFeatures: [
          {
            title: 'Control de Acceso',
            description: 'Alertas inmediatas por entrada o salida no autorizada de la zona.'
          },
          {
            title: 'Seguridad Vial',
            description: 'Impón límites de velocidad exclusivos dentro del área (ej. "Máx. 10 km/h en el patio de carga").'
          }
        ]
      }
    ]
  },
  aiAnalysisSection: {
    eyebrow: 'Análisis con IA',
    title: 'Obtén tu Informe de Seguridad Personalizado',
    description: 'Nuestra herramienta inteligente de análisis de amenazas evalúa los riesgos para tu vehículo y ubicación específicos para proporcionar recomendaciones de seguridad a medida.',
    form: {
      vehicleType: 'Tipo de Vehículo',
      vehicleTypePlaceholder: 'p. ej. SUV',
      vehicleMake: 'Marca',
      vehicleMakePlaceholder: 'p. ej. Toyota',
      vehicleModel: 'Modelo',
      vehicleModelPlaceholder: 'p. ej. RAV4',
      vehicleYear: 'Año',
      vehicleYearPlaceholder: 'p. ej. 2023',
      location: 'Ubicación (Ciudad, Provincia)',
      locationPlaceholder: 'p. ej. San Francisco, CA',
      specificConcerns: 'Preocupaciones Específicas (Opcional)',
      specificConcernsPlaceholder: 'p. ej. Allanamiento, robo de catalizador',
      analyzeButton: 'Analizar Amenazas',
    },
    results: {
      loading: 'Analizando tu vehículo...',
      loadingDescription: 'Nuestra IA está elaborando tu informe personalizado.',
      errorTitle: 'El Análisis Falló',
      pendingTitle: 'Tu Informe te Espera',
      pendingDescription: 'Rellena el formulario para empezar.',
      reportTitle: 'Tu Informe de Seguridad',
      threatAnalysis: 'Análisis de Amenazas',
      recommendations: 'Recomendaciones',
      reasoning: 'Razonamiento',
    },
  },
  newsSection: {
    eyebrow: 'Noticias e Información',
    title: 'Adelántate a las Amenazas de Seguridad',
    description: 'Lee nuestros últimos artículos sobre tendencias en seguridad vehicular, nuevas tecnologías y consejos de seguridad.',
    readMore: 'Leer Más',
  },
  testimonialsSection: {
    eyebrow: 'Lo que Dicen Nuestros Clientes',
    title: 'Con la Confianza de Conductores y Gestores de Flotas',
    description: 'No te fíes solo de nuestra palabra. Esto es lo que nuestros clientes satisfechos tienen que decir sobre Vision360ia.',
  },
  faqSection: {
    eyebrow: 'FAQ Técnico',
    title: 'Implementación: Lo que necesitas saber',
    description: 'Transparencia total. Despejamos las dudas operativas y técnicas más frecuentes para que tomes una decisión informada y segura para tu negocio.',
  },
  contactSection: {
    eyebrow: 'Hablemos de tu Proyecto',
    title: 'Hablemos de Ingeniería, no de ventas',
    description: 'Cuéntanos cómo es tu flota y en una sesión técnica de 20–30 minutos un ingeniero de WINFIN te propondrá la arquitectura Vision360IA más eficiente para tu operación.',
    badges: [
      '+2.000 vehículos equipados',
      'Integradores: Indra, GMV, Etra',
      'Operadores: EMT Madrid, CRTM, ATM…'
    ],
    blocks: {
      contact: 'Datos de contacto',
      fleet: 'Sobre tu flota',
      technical: 'Detalles técnicos',
      privacy: 'Privacidad y comunicaciones'
    },
    trustBoxes: [
      {
        icon: 'Code2',
        title: 'Hablas con ingenieros',
        description: 'No comerciales. Conversación técnica real sobre arquitectura, integración y requisitos específicos de tu flota.'
      },
      {
        icon: 'FlaskConical',
        title: 'Estudio de viabilidad',
        description: 'Analizamos compatibilidad con tu hardware actual, infraestructura de red y sistemas de gestión existentes.'
      },
      {
        icon: 'Rocket',
        title: 'Sin compromiso de compra',
        description: 'Primero entendemos el problema. Si Vision360IA no es la solución óptima para tu caso, te lo diremos.'
      }
    ],
    form: {
      name: 'Nombre Completo',
      namePlaceholder: 'Juan García López',
      email: 'Dirección de Correo Electrónico',
      emailPlaceholder: 'tu@ejemplo.com',
      company: 'Empresa',
      companyPlaceholder: 'Nombre de tu operador / empresa',
      role: 'Cargo / rol',
      rolePlaceholder: 'Ej.: Director de Operaciones, CTO, Responsable de Flota…',
      phone: 'Teléfono (opcional)',
      phonePlaceholder: 'Para coordinar más rápido la sesión técnica',
      fleetSize: 'Tamaño de flota *',
      fleetSizeOptions: {
        placeholder: 'Selecciona…',
        option1: '1–20 vehículos',
        option2: '21–100 vehículos',
        option3: '101–300 vehículos',
        option4: 'Más de 300 vehículos'
      },
      vehicleTypes: 'Tipo de vehículos',
      vehicleTypeOptions: {
        urban: 'Autobuses urbanos',
        intercity: 'Interurbanos / regionales',
        trucks: 'Camiones / logística',
        industrial: 'Vehículos industriales / especiales'
      },
      mainInterest: 'Interés principal',
      mainInterestOptions: {
        placeholder: 'Selecciona…',
        vision360: 'Vision360 (cámaras 360°)',
        driverMonitoring: 'Monitorización del conductor',
        analytics: 'Analítica de eventos e incidencias',
        integration: 'Integración con sistemas existentes',
        pilot: 'Proyecto piloto / prueba de concepto'
      },
      projectHorizon: 'Horizonte del proyecto',
      projectHorizonOptions: {
        placeholder: 'Selecciona…',
        exploring: 'Explorando opciones',
        months3: '1–3 meses',
        months6: '3–6 meses',
        year: 'Más de 6 meses'
      },
      contactPreference: 'Preferencia de contacto',
      contactPreferenceOptions: {
        placeholder: 'Selecciona…',
        video: 'Videollamada',
        phone: 'Teléfono',
        email: 'Email'
      },
      message: 'Tu Mensaje',
      messagePlaceholder: '¿Cómo podemos ayudarte?',
      privacyLabel: 'He leído y acepto la',
      privacyLink: 'Política de Privacidad',
      marketingLabel: 'Quiero recibir información sobre nuevas funcionalidades y casos de éxito (opcional)',
      submitButton: 'Enviar y agendar sesión técnica',
      submitting: 'Enviando...',
      footerText: 'Tus datos están protegidos. Sin spam. Solo hablamos de tecnología y casos reales en flotas como la tuya.',
      sendButton: 'Hablar con un Experto →',
    },
    toast: {
      title: '¡Mensaje Enviado!',
      description: 'Gracias por contactarnos. Te responderemos pronto.',
    },
  },
  languageBanner: {
    title: 'Sugerencia de idioma',
    suggestion: 'Parece que prefieres {lang}. ¿Quieres cambiar?',
    languages: {
        es: 'castellano',
        ca: 'catalán',
        eu: 'euskera',
    },
    confirm: 'Sí, cambiar',
    dismiss: 'No, gracias',
  },
  whyWinfinSection: {
    title: '¿Por qué elegir Vision360IA?',
    aboutUsButton: 'Quiénes somos',
    aboutUsAriaLabel: 'Leer más sobre quiénes somos',
  },
  aboutPage: {
    hero: {
      title: 'Quiénes somos',
      subtitle: 'Más de 20 años impulsando la innovación y la seguridad en el transporte.',
      cta: 'Contactar',
    },
    sections: {
      mission: {
        title: 'Nuestra Misión',
        text: 'Proporcionar soluciones tecnológicas de vanguardia que garanticen la máxima seguridad, eficiencia y sostenibilidad para flotas de transporte, protegiendo vidas y activos a través de la innovación constante.',
      },
      vision: {
        title: 'Nuestra Visión',
        text: 'Ser el partner tecnológico líder a nivel global en sistemas inteligentes para el transporte, transformando la manera en que el mundo se mueve, un vehículo a la vez.',
      },
      whatWeDo: {
        title: 'Qué Hacemos',
        text: 'Ofrecemos un ecosistema completo de soluciones tecnológicas para el transporte.',
      },
    },
    cta: {
      title: '¿Listo para transformar tu flota?',
      text: 'Hablemos de cómo nuestras soluciones pueden adaptarse a tus necesidades específicas.',
      button: 'Solicitar Propuesta',
    },
  },
};

const productSpecs = {
  prod1: {
    name: 'Sistema ADAS con Visión Periférica 360º',
    description: 'Vision360ia elimina los puntos ciegos y ofrece control total del entorno. Mediante la fusión inteligente de cámaras HD ultra gran angular (>180°), genera una vista cenital unificada en tiempo real. Su ECU dedicada procesa y compone la imagen con máxima precisión para mostrar en el monitor de cabina una visualización continua, nítida y estable, incluso con lluvia, polvo o baja luminosidad. Integración rápida y configurable para cualquier tipo de vehículo.',
    vimeoId: '1133755711',
    videoPoster: '/images/winfin_vision360ia_1.jpg',
    specs: [
        'Seguridad superior: sin puntos ciegos y mayor percepción situacional.',
        'Maniobras más ágiles: aparcamientos, giros y acoples con mayor precisión.',
        'Menos incidentes: reduce golpes, tiempos muertos y costes asociados.',
        'Adopción sencilla: calibración automática y ajuste por vehículo.',
        'Cámaras HD ultra gran angular (>180°) con óptica calibrada.',
        'ECU de alto rendimiento para procesamiento y fusión en tiempo real.',
        'Vista cenital 360° continua, sin latencia perceptible.',
        'Grado industrial IP69K, resistente a intemperie, polvo y vibraciones.',
        'Arquitectura modular y compatible con ADAS y sistemas de monitorización.'
    ],
  },
  prod2: {
    name: 'ADAS con Alertas de Seguridad Vehicular Inteligente',
    description: 'El sistema de Asistencia Proactiva al Conductor con IA eleva la seguridad activa del vehículo mediante la detección temprana de riesgos. Basado en algoritmos de visión artificial y análisis predictivo, este módulo ADAS supervisa constantemente el entorno del vehículo y emite alertas visuales y sonoras en cabina ante posibles situaciones de peligro. El sistema detecta y notifica riesgo de colisión frontal (FCW), salidas involuntarias de carril (LDW) y la presencia de peatones o ciclistas (VRU) en zonas de riesgo. Su interfaz intuitiva y configurable facilita la interpretación de las alertas, permitiendo al conductor reaccionar de forma inmediata.',
    vimeoId: '1133755727',
    videoPoster: '/images/winfin_vision360ia_2.jpg',
    specs: [
      'Alertas de colisión frontal (FCW) con distintos niveles de urgencia.',
      'Aviso de salida de carril (LDW) y asistente de mantenimiento de trayectoria.',
      'Detección inteligente de peatones y ciclistas (VRU) mediante IA.',
      'Interfaz de conductor configurable (alertas visuales y acústicas).',
      'Integración opcional con sistemas de frenado automático y ADAS.',
      'Procesamiento en ECU dedicada para respuesta en milisegundos.',
      'Operatividad garantizada en condiciones adversas.'
    ],
  },
  prod3: {
    name: 'Gestión de Flotas con Análisis IA y Reportes',
    description: 'La Plataforma de Análisis de Flota con IA transforma los datos telemáticos en información estratégica para la toma de decisiones. Mediante algoritmos avanzados de inteligencia artificial y aprendizaje automático, analiza patrones de conducción, eventos críticos y comportamientos de riesgo, generando informes precisos y personalizables. Esta herramienta ofrece una visión integral del rendimiento operativo de cada vehículo y conductor, ayudando a optimizar rutas, reducir costes de combustible y mantenimiento, y a promover una cultura de conducción más segura y eficiente.',
    vimeoId: '1133755748',
    videoPoster: '/images/winfin_vision360ia_3.jpg',
    specs: [
      'Evaluación continua y scoring del comportamiento del conductor.',
      'Reconstrucción detallada de eventos críticos, incluyendo vídeo.',
      'Panel de control web para gestores de flota con KPIs en tiempo real.',
      'Informes personalizables y exportables.',
      'Integración mediante API con plataformas de gestión de flotas (FMS).',
      'Procesamiento en la nube con modelos IA para análisis predictivo.',
      'Cumplimiento de estándares de seguridad y privacidad de datos (GDPR).'
    ],
  },
};

const whyWinfinCardsData = [
  {
    id: 'experience',
    icon: 'Users',
    title: 'Experiencia',
    metric: '20+ años',
    text: 'Instalando sistemas embarcados en buses, trenes y flotas industriales.',
    submetric: '+2.000 vehículos equipados',
  },
  {
    id: 'trust',
    icon: 'Handshake',
    title: 'Confianza',
    subtitle: 'Respaldados por la industria',
    text: 'Si confían en nosotros <strong>EMT Madrid, Indra o ATM Barcelona</strong>, tú también puedes hacerlo. Cumplimos con los estándares más exigentes del mercado.',
  },
  {
    id: 'innovation',
    icon: 'BrainCircuit',
    title: 'Innovación',
    subtitle: 'Tecnología que ahorra y protege',
    text: 'Convierte datos en decisiones. Nuestras soluciones <strong>Vision360IA</strong> y <strong>Afluencia360</strong> utilizan IA y Big Data para maximizar la seguridad y reducir costes operativos.',
  },
  {
    id: 'custom-solutions',
    icon: 'Lightbulb',
    title: 'Soluciones a medida',
    subtitle: 'Soluciones "Llave en Mano"',
    text: 'Olvídate de la gestión técnica. Nos encargamos de todo el ciclo de vida: desde el diseño hasta el mantenimiento de tus sistemas embarcados.',
  },
];


export const translations = {
  es: {
    ...baseTranslations,
    navigationLinks: [
      { href: '#products', label: 'Producto' },
      { href: '#faq', label: 'FAQs' },
      { href: '#contact', label: 'Contacto' },
    ],
    whyWinfinCards: whyWinfinCardsData,
    products: [
      { id: 'prod1', price: 'Beneficio', image: findImage('product1'), ...productSpecs.prod1 },
      { id: 'prod2', price: 'Beneficio', image: findImage('product2'), ...productSpecs.prod2 },
      { id: 'prod3', price: 'Beneficio', image: findImage('product3'), ...productSpecs.prod3 },
    ],
    solutions: [
      {
        id: 'vans',
        vehicleType: 'Furgonetas',
        title: 'Seguridad activa para reparto, logística y última milla.',
        image: findImage('solution1'),
      },
      {
        id: 'fleets',
        vehicleType: 'Flotas',
        title: 'Control unificado y reducción de costes para grandes parques móviles.',
        image: findImage('solution2'),
      },
      {
        id: 'professionals',
        vehicleType: 'Profesionales',
        title: 'Tecnología robusta para vehículos industriales y transporte pesado.',
        image: findImage('solution3'),
      },
    ],
    testimonials: [
        {
          id: 'client1',
          quote: 'Desde que instalamos Vision360ia en nuestra flota, los incidentes menores han disminuido un 40%. La inversión se ha pagado sola.',
          author: 'Javier Gómez',
          company: 'Director de Logística, TransLogis',
          avatar: findImage('avatar1'),
        },
        {
          id: 'client2',
          quote: 'Como conductor, la vista de 360 grados me da una tranquilidad increíble en el tráfico urbano. Ya no me preocupan los puntos ciegos.',
          author: 'Ana Torres',
          company: 'Transportista Profesional',
          avatar: findImage('avatar2'),
        },
        {
          id: 'client3',
          quote: 'La plataforma de análisis es increíblemente potente. Nos ha ayudado a identificar patrones de riesgo que no conocíamos y a formar a nuestros conductores de forma más efectiva.',
          author: 'Carlos Ruiz',
          company: 'Gerente de Flota, UrbanGo',
          avatar: findImage('avatar3'),
        },
    ],
    faqs: [
      {
        id: 'faq1',
        question: '¿Cómo funciona exactamente el sistema de cámaras 360°?',
        answer: 'Nuestro sistema utiliza Inteligencia Artificial para fusionar imágenes en tiempo real. Mediante tecnología de stitching, integramos la señal de hasta 6 cámaras ojo de pez HD con 190° de apertura. Esto crea una vista envolvente única que elimina totalmente los puntos ciegos, permitiendo detectar peatones, ciclistas y vehículos cercanos mediante IA y alertar al conductor con avisos visuales y sonoros.',
      },
      {
        id: 'faq2',
        question: '¿Cumple el sistema con la Normativa GSR (R151, R158, R159)?',
        answer: 'Sí, Vision 360 es la herramienta ideal para cumplir con el Reglamento de Seguridad General (GSR) de la UE, cubriendo sus tres pilares fundamentales: R151 (BSIS - Ángulo Muerto) detecta ciclistas y peatones en el lado del copiloto, alertando de riesgos en giros. R158 (Reversing - Marcha Atrás) garantiza visibilidad completa al maniobrar hacia atrás, detectando obstáculos y personas. R159 (MOIS - Arranque Frontal) incluye alerta de colisión frontal y detección de peatones en la zona delantera al iniciar la marcha.',
      },
      {
        id: 'faq3',
        question: '¿Qué diferencia hay entre este sistema y una cámara de reversa convencional?',
        answer: 'Una cámara convencional es pasiva. Vision 360 es un sistema de prevención activa que actúa como un copiloto digital. Cobertura Total: Cubrimos los 360° del vehículo eliminando ángulos muertos laterales y frontales, no solo los traseros. Inteligencia Artificial: Detecta riesgos (peatones, salida de carril) y avisa al conductor antes de que ocurra el accidente. Telemetría: Registramos impactos (sensor G) y datos de conducción, algo que una cámara simple no hace.',
      },
      {
        id: 'faq4',
        question: '¿Ayuda este sistema a reducir los costes de la flota?',
        answer: 'Sí, el retorno de inversión es rápido. Se estima que el sistema se amortiza con solo evitar uno o dos incidentes. Seguros: Ayuda a reducir primas y obtener bonificaciones al incorporar sistemas ADAS y grabación. Operativa: Minimiza los días de vehículos inmovilizados en taller al evitar pequeñas colisiones en maniobras.',
      },
      {
        id: 'faq5',
        question: '¿El sistema graba las imágenes o solo muestra la visión en tiempo real?',
        answer: 'Ofrece protección integral. Grabación: Se activa por sensor G, exceso de velocidad o detección de IA. Los archivos están protegidos contra sobreescritura. Evidencia Legal: En caso de litigio, dispones de un registro con fecha, hora, coordenadas GPS y vídeo HD para evitar reclamaciones falsas.',
      },
      {
        id: 'faq6',
        question: '¿Es complicado instalar el sistema en camiones o vehículos de gran tamaño?',
        answer: 'No, está diseñado para flotas profesionales. Rápido: Calibración automática en menos de 1 minuto para reducir tiempos de parada. Versátil: Compatible con vehículos de 12V y 24V, nuevos o antiguos, y cámaras con certificación IP69K para máxima resistencia.',
      },
      {
        id: 'faq7',
        question: '¿El sistema me avisa si un vehículo se sale de su ruta?',
        answer: 'Sí, mediante el módulo de Valla Electrónica. Puedes dibujar zonas en el mapa y configurar reglas automáticas. El sistema generará una alarma si el vehículo entra en zona prohibida, sale de su área o excede la velocidad en un perímetro definido.',
      },
      {
        id: 'faq8',
        question: '¿Quién respalda la tecnología y el soporte?',
        answer: 'Vision 360 cuenta con el respaldo de WINFIN, con más de 15 años de experiencia y más de 2.000 vehículos instalados. Ofrecemos garantía de 2 años y soporte técnico real para asegurar la operatividad de tu flota.',
      },
    ],
  },
  ca: {
    ...baseTranslations,
    header: {
      login: 'Iniciar Sessió',
      getQuote: 'Demanar Pressupost',
      openMenu: 'Obrir Menú',
      changeLanguage: 'Canviar idioma',
    },
    hero: {
      ...baseTranslations.hero,
      title: 'Control 360° amb IA: Redueix Riscos, Maximitza Eficiència.',
      subtitle: '-40% d\'incidents en flotes en 6 mesos.',
      description: 'Cada dia, la teva flota s\'enfronta a l\'imprevisible. Amb Vision360IA, els teus vehicles veuen més enllà: detecten riscos, anticipen col·lisions i converteixen dades en seguretat activa. Tecnologia ADAS potenciada per IA, dissenyada per protegir el que més importa: el teu equip i els teus actius.',
      mainCta: 'Sol·licita demo',
      secondaryCta: 'Veure vídeo 60s',
      trustedBy: 'Amb la confiança de les principals flotes',
      dailyChallenge: 'Cada dia, la teva flota s\'enfronta a l\'imprevisible.',
      vision360iaIntro: 'els teus vehicles veuen més enllà',
      badges: {
        detectRisks: 'Detecta riscos',
        anticipateCollisions: 'Anticipa col·lisions',
        convertData: 'Converteix dades en seguretat activa',
      },
      adasTech: 'dissenyada per protegir el que més importa:',
      teamAssets: 'el teu equip i els teus actius',
    },
    footer: {
        ...baseTranslations.footer,
        tagline: 'Solucions Avançades de Seguretat per a Vehicles per a un demà més segur.',
        quickLinks: 'Enllaços Ràpids',
        company: {
            title: 'Empresa',
            about: 'Sobre Nosaltres',
            jobs: 'Feina',
            press: 'Premsa',
        },
        legal: {
            title: 'Legal',
            privacy: 'Política de Privacitat',
            terms: 'Termes de Servei',
        },
        copyright: 'Tots els drets reservats.',
    },
    productsSection: {
      ...baseTranslations.productsSection,
      eyebrow: 'Avantatges Clau',
      title: 'Tecnologia Dissenyada per Protegir la teva Inversió',
      description: 'Integrem maquinari d\'avantguarda als teus vehicles: càmeres d\'alta definició i sensors robustos, processats per algoritmes d\'IA, que analitzen l\'entorn en temps real per anticipar perills, eliminar punts cecs i garantir una protecció integral i eficiència operativa superior.',
      addToCart: 'Més Informació',
    },
    solutionsSection: {
        ...baseTranslations.solutionsSection,
        eyebrow: 'Solucions a Mida',
        title: 'Seguretat que s\'Adapta al teu Vehicle',
        description: 'Dissenyem, implantem i mantenim ecosistemes digitals integrats per a flotes de transport: autobusos, camions, trens i vehicles industrials.\nTecnologia orientada a la fiabilitat operativa i als nous desafiaments de la mobilitat intel·ligent.',
        learnMore: 'Saber Més',
    },
    aiAnalysisSection: {
        ...baseTranslations.aiAnalysisSection,
        eyebrow: 'Anàlisi amb IA',
        title: 'Obtén el teu Informe de Seguretat Personalitzat',
        description: 'La nostra eina intel·ligent d\'anàlisi d\'amenaces avalua els riscos per al teu vehicle i ubicació específics per proporcionar recomanacions de seguretat a mida.',
        form: {
            ...baseTranslations.aiAnalysisSection.form,
            vehicleType: 'Tipus de Vehicle',
            vehicleTypePlaceholder: 'p. ex. SUV',
            vehicleMake: 'Marca',
            vehicleMakePlaceholder: 'p. ex. Toyota',
            vehicleModel: 'Model',
            vehicleModelPlaceholder: 'p. ex. RAV4',
            vehicleYear: 'Any',
            vehicleYearPlaceholder: 'p. ex. 2023',
            location: 'Ubicació (Ciutat, Província)',
            locationPlaceholder: 'p. ex. Barcelona, BCN',
            specificConcerns: 'Preocupacions Específiques (Opcional)',
            specificConcernsPlaceholder: 'p. ex. Intrusió, robatori de catalitzador',
            analyzeButton: 'Analitzar Amenaces',
        },
        results: {
            ...baseTranslations.aiAnalysisSection.results,
            loading: 'Analitzant el teu vehicle...',
            loadingDescription: 'La nostra IA està elaborant el teu informe personalitzat.',
            errorTitle: 'L\'Anàlisi ha Fallat',
            pendingTitle: 'El teu Informe t\'Espera',
            pendingDescription: 'Omple el formulari per començar.',
            reportTitle: 'El teu Informe de Seguretat',
            threatAnalysis: 'Anàlisi d\'Amenaces',
            recommendations: 'Recomanacions',
            reasoning: 'Raonament',
        },
    },
    newsSection: {
        ...baseTranslations.newsSection,
        eyebrow: 'Notícies i Informació',
        title: 'Avança\'t a les Amenaces de Seguretat',
        description: 'Llegeix els nostres últims articles sobre tendències en seguretat vehicular, noves tecnologies i consells de seguretat.',
        readMore: 'Llegir Més',
    },
    testimonialsSection: {
        ...baseTranslations.testimonialsSection,
        eyebrow: 'Què Diuen els Nostres Clients',
        title: 'Amb la Confiança de Conductors i Gestors de Flotes',
        description: 'No et fiïs només de la nostra paraula. Això és el que els nostres clients satisfets tenen a dir sobre Vision360ia.',
    },
    faqSection: {
        ...baseTranslations.faqSection,
        eyebrow: 'Preguntes Freqüents',
        title: 'Les teves Preguntes, Respostes',
        description: 'Troba respostes a preguntes comunes sobre els nostres productes, serveis i seguretat vehicular en general.',
    },
    contactSection: {
        ...baseTranslations.contactSection,
        eyebrow: 'Parlem del teu Projecte',
        title: 'Parlem d\'Enginyeria, no de vendes',
        description: 'Explica\'ns com és la teva flota i en una sessió tècnica de 20–30 minuts un enginyer de WINFIN et proposarà l\'arquitectura Vision360IA més eficient per a la teva operació.',
        badges: [
          '+2.000 vehicles equipats',
          'Integradors: Indra, GMV, Etra',
          'Operadors: EMT Madrid, CRTM, ATM…'
        ],
        blocks: {
          contact: 'Dades de contacte',
          fleet: 'Sobre la teva flota',
          technical: 'Detalls tècnics',
          privacy: 'Privacitat i comunicacions'
        },
        form: {
            ...baseTranslations.contactSection.form,
            name: 'Nom Complet',
            namePlaceholder: 'Joan Petit Martí',
            email: 'Adreça de Correu Electrònic',
            emailPlaceholder: 'el_teu@exemple.com',
            company: 'Empresa',
            companyPlaceholder: 'Nom del teu operador / empresa',
            role: 'Càrrec / rol',
            rolePlaceholder: 'Ex.: Director d\'Operacions, CTO, Responsable de Flota…',
            phone: 'Telèfon (opcional)',
            phonePlaceholder: 'Per coordinar més ràpid la sessió tècnica',
            fleetSize: 'Mida de flota *',
            fleetSizeOptions: {
              placeholder: 'Selecciona…',
              option1: '1–20 vehicles',
              option2: '21–100 vehicles',
              option3: '101–300 vehicles',
              option4: 'Més de 300 vehicles'
            },
            vehicleTypes: 'Tipus de vehicles',
            vehicleTypeOptions: {
              urban: 'Autobusos urbans',
              intercity: 'Interurbans / regionals',
              trucks: 'Camions / logística',
              industrial: 'Vehicles industrials / especials'
            },
            mainInterest: 'Interès principal',
            mainInterestOptions: {
              placeholder: 'Selecciona…',
              vision360: 'Vision360 (càmeres 360°)',
              driverMonitoring: 'Monitorització del conductor',
              analytics: 'Analítica d\'esdeveniments i incidències',
              integration: 'Integració amb sistemes existents',
              pilot: 'Projecte pilot / prova de concepte'
            },
            projectHorizon: 'Horitzó del projecte',
            projectHorizonOptions: {
              placeholder: 'Selecciona…',
              exploring: 'Explorant opcions',
              months3: '1–3 mesos',
              months6: '3–6 mesos',
              year: 'Més de 6 mesos'
            },
            contactPreference: 'Preferència de contacte',
            contactPreferenceOptions: {
              placeholder: 'Selecciona…',
              video: 'Videotrucada',
              phone: 'Telèfon',
              email: 'Email'
            },
            message: 'El teu Missatge',
            messagePlaceholder: 'Com et podem ajudar?',
            privacyLabel: 'He llegit i accepto la',
            privacyLink: 'Política de Privacitat',
            marketingLabel: 'Vull rebre informació sobre noves funcionalitats i casos d\'èxit (opcional)',
            submitButton: 'Enviar i agendar sessió tècnica',
            submitting: 'Enviant...',
            footerText: 'Les teves dades estan protegides. Sense spam. Només parlem de tecnologia i casos reals en flotes com la teva.',
            sendButton: 'Parlar amb un Expert →',
        },
        toast: {
            title: 'Missatge Enviat!',
            description: 'Gràcies per contactar-nos. Et respondrem aviat.',
        },
    },
    languageBanner: {
        ...baseTranslations.languageBanner,
        suggestion: 'Sembla que prefereixes el {lang}. Vols canviar?',
        languages: {
            es: 'castellà',
            ca: 'català',
            eu: 'basc',
        },
        confirm: 'Sí, canvia',
        dismiss: 'No, gràcies',
    },
    whyWinfinSection: {
      title: 'Per què Vision360IA?',
      description: '<strong>Vision360IA</strong> és la plataforma de seguretat avançada desenvolupada per <strong>WINFIN</strong>, una empresa amb més de <strong>20 anys d\'experiència</strong> en sistemes tecnològics per al transport.\nAmb aquesta experiència, desenvolupem <strong>solucions que combinen fiabilitat i innovació</strong>, i que milloren contínuament per respondre als <strong>reptes de la mobilitat intel·ligent</strong>.',
      aboutUsButton: 'Qui som',
      aboutUsAriaLabel: 'Llegir més sobre qui som',
    },
    aboutPage: {
      hero: {
        title: 'Qui som',
        subtitle: 'Més de 20 anys impulsant la innovació i la seguretat en el transport.',
        cta: 'Contactar',
      },
      sections: {
        mission: {
          title: 'La Nostra Missió',
          text: 'Proporcionar solucions tecnològiques d\'avantguarda que garanteixin la màxima seguretat, eficiència i sostenibilitat per a flotes de transport, protegint vides i actius a través de la innovació constant.',
        },
        vision: {
          title: 'La Nostra Visió',
          text: 'Ser el partner tecnològic líder a nivell global en sistemes intel·ligents per al transport, transformant la manera com el món es mou, un vehicle a la vegada.',
        },
        whatWeDo: {
          title: 'Què Fem',
          text: 'Oferim un ecosistema complet de solucions tecnològiques per al transport.',
        },
      },
      cta: {
        title: 'A punt per transformar la teva flota?',
        text: 'Parlem de com les nostres solucions es poden adaptar a les teves necessitats específiques.',
        button: 'Sol·licitar Proposta',
      },
    },
    whyWinfinCards: [
      {
        id: 'experience',
        icon: 'Users',
        title: 'Experiència',
        text: 'Més de 20 anys en instal·lació i manteniment de sistemes embarcats en busos, trens i flotes industrials. <strong>+2.000 vehicles equipats</strong>.',
      },
      {
        id: 'trust',
        icon: 'Handshake',
        title: 'Confiança',
        text: 'Col·laborem amb integradores com <strong>Indra, GMV i Etra</strong>, i operadors com <strong>EMT Madrid, CRTM, ATM Barcelona i Lurraldebus</strong>.',
      },
      {
        id: 'innovation',
        icon: 'BrainCircuit',
        title: 'Innovació',
        text: 'Solucions basades en <strong>IoT, Big Data i IA</strong>: <strong>Vision360IA</strong> i <strong>Afluencia360</strong> per a seguretat, eficiència i sostenibilitat.',
      },
      {
        id: 'custom-solutions',
        icon: 'Lightbulb',
        title: 'Solucions a mida',
        text: 'Dissenyem, implantem i mantenim <strong>ecosistemes digitals integrats</strong> per a flotes de transport: <strong>autobusos, camions, trens i vehicles industrials</strong>.<br class="hidden sm:block" /><span class="block mt-2"><strong>Tecnologia orientada a la fiabilitat operativa</strong> i als <strong>nous desafiaments de la mobilitat intel·ligent</strong>.</span>',
      },
    ],
    navigationLinks: [
        { href: '#products', label: 'Producte' },
        { href: '#faq', label: 'FAQs' },
        { href: '#contact', label: 'Contacte' },
    ],
    products: [
        { id: 'prod1', price: 'Benefici', image: findImage('product1'), ...productSpecs.prod1, 
          name: 'Visió Perifèrica 360º',
          description: 'Vision360ia elimina els punts cecs i ofereix control total de l\'entorn. Mitjançant la fusió intel·ligent de càmeres HD ultra gran angular (>180°), genera una vista zenital unificada en temps real. La seva ECU dedicada processa i compon la imatge amb màxima precisió per mostrar al monitor de cabina una visualització contínua, nítida i estable, fins i tot amb pluja, pols o baixa lluminositat. Integració ràpida i configurable per a qualsevol tipus de vehicle.',
        },
        { id: 'prod2', price: 'Benefici', image: findImage('product2'), ...productSpecs.prod2, 
          name: 'Alertes Proactives a la Cabina',
          description: 'El sistema d\'Assistència Proactiva al Conductor amb IA eleva la seguretat activa del vehicle mitjançant la detecció primerenca de riscos. Basat en algoritmes de visió artificial i anàlisi predictiva, aquest mòdul ADAS supervisa constantment l\'entorn del vehicle i emet alertes visuals i sonores a la cabina davant de possibles situacions de perill. El sistema detecta i notifica el risc de col·lisió frontal (FCW), sortides involuntàries de carril (LDW) i la presència de vianants o ciclistes (VRU) en zones de risc. La seva interfície intuïtiva i configurable facilita la interpretació de les alertes, permetent al conductor reaccionar de manera immediata.',
        },
        { id: 'prod3', price: 'Benefici', image: findImage('product3'), ...productSpecs.prod3, 
          name: 'Anàlisi IA i Informes',
          description: 'La Plataforma d\'Anàlisi de Flota amb IA transforma les dades telemàtiques en informació estratègica per a la presa de decisions. Mitjançant algorismes avançats d\'intel·ligència artificial i aprenentatge automàtic, analitza patrons de conducció, esdeveniments crítics i comportaments de risc, generant informes precisos i personalitzables. Aquesta eina ofereix una visió integral del rendiment operatiu de cada vehicle i conductor, ajudant a optimitzar rutes, reduir costos de combustible i manteniment, i a promoure una cultura de conducció més segura i eficient.',
        },
    ],
    solutions: [
      {
        id: 'cars',
        vehicleType: 'Turismes',
        title: 'Protecció Avançada per a Conductors Particulars',
        description: 'La seguretat no és només per a flotes. Les nostres solucions ADAS per a turismes porten la tecnologia d\'assistència al conductor d\'alta gamma al teu vehicle personal. Gaudeix d\'una major tranquil·litat amb alertes de col·lisió, detecció de vianants i una visió 360º que fa que aparcar i maniobrar a la ciutat sigui més fàcil i segur que mai.',
        features: [
          'Visió perifèrica completa per eliminar punts cecs.',
          'Alertes de col·lisió frontal i de trànsit creuat posterior.',
          'Assistent d\'aparcament amb vista d\'ocell.',
          'Detecció de vianants i ciclistes per a seguretat urbana.',
        ],
        image: findImage('solution1'),
      },
      {
        id: 'trucks',
        vehicleType: 'Flotes',
        title: 'Optimització i Seguretat per a Flotes Comercials',
        description: 'Maximitza l\'eficiència i minimitza el risc a tota la teva flota. La nostra plataforma centralitzada t\'ofereix una visió completa de tots els teus vehicles, amb anàlisi de comportament del conductor, optimització de rutes i alertes de manteniment predictiu. Redueix els costos de combustible, evita accidents costosos i garanteix que el teu equip i la teva càrrega arribin al seu destí de forma segura.',
        features: [
          'Monitorització 360º en temps real per a cada vehicle.',
          'Anàlisi d\'IA del comportament del conductor i puntuació de risc.',
          'Optimització de rutes i gestió de combustible.',
          'Alertes de manteniment i diagnòstic de vehicles.',
        ],
        image: findImage('solution2'),
      },
      {
        id: 'motorcycles',
        vehicleType: 'Professionals',
        title: 'Seguretat Millorada per a Professionals en Moviment',
        description: 'Des de repartidors fins a serveis d\'emergència, els professionals a la carretera s\'enfronten a riscos únics. Les nostres solucions compactes i robustes estan dissenyades per a motocicletes i vehicles lleugers, oferint detecció de punts cecs i alertes de col·lisió adaptades a l\'agilitat i vulnerabilitat d\'aquests vehicles, millorant dràsticament la seguretat del conductor.',
        features: [
          'Detecció de vehicles en punts cecs laterals i posteriors.',
          'Alertes de col·lisió frontal amb avís de proximitat.',
          'Disseny compacte, resistent a la intempèrie i de baix consum.',
          'Fàcil instal·lació i integració amb sistemes existents.',
        ],
        image: findImage('solution3'),
      },
    ],
    testimonials: [
        {
          id: 'client1',
          quote: 'Des que vam instal·lar Vision360ia a la nostra flota, els incidents menors han disminuït un 40%. La inversió s\'ha pagat sola.',
          author: 'Javier Gómez',
          company: 'Director de Logística, TransLogis',
          avatar: findImage('avatar1'),
        },
        {
          id: 'client2',
          quote: 'Com a conductor, la vista de 360 graus em dona una tranquil·litat increïble en el trànsit urbà. Ja no em preocupen els punts cecs.',
          author: 'Ana Torres',
          company: 'Transportista Professional',
          avatar: findImage('avatar2'),
        },
        {
          id: 'client3',
          quote: 'La plataforma d\'anàlisi és increïblement potent. Ens ha ajudat a identificar patrons de risc que no coneixíem i a formar els nostres conductors de manera més efectiva.',
          author: 'Carlos Ruiz',
          company: 'Gerent de Flota, UrbanGo',
          avatar: findImage('avatar3'),
        },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Com funciona exactament el sistema de càmeres 360°?',
        answer: 'El sistema utilitza quatre o més càmeres HD de gran angular ubicades estratègicament al vehicle (frontal, posterior i laterals). Les imatges s\'envien a una Unitat de Control Electrònic (ECU) que les processa, corregeix les distorsions òptiques i fusiona en temps real, generant una vista zenital o “vista d\'ocell” que mostra el vehicle i el seu entorn immediat amb total claredat al monitor de cabina.',
      },
      {
        id: 'faq2',
        question: 'Quina diferència hi ha entre el vostre sistema i una càmera de marxa enrere convencional?',
        answer: 'Una càmera de marxa enrere ofereix únicament la vista posterior, mentre que el sistema de visió envoltant 360° combina simultàniament les imatges de diverses càmeres per proporcionar una visió integral de tot el perímetre del vehicle. Això permet eliminar punts cecs en totes les direccions, millorar la percepció de l\'entorn i facilitar maniobres complexes —com girs tancats, estacionaments o circulació en espais reduïts— amb total seguretat.',
      },
      {
        id: 'faq3',
        question: 'És complicat instal·lar el sistema en camions o vehicles de grans dimensions?',
        answer: 'No. Els sistemes estan dissenyats per a una instal·lació ràpida i precisa per tècnics certificats. El procés inclou la col·locació estratègica de les càmeres i una calibració automàtica que garanteix la correcta fusió de les imatges. Disposem de kits específics adaptats a diferents tipus de vehicles, des d\'autobusos i camions fins a maquinària industrial o agrícola, assegurant sempre un resultat òptim i fiable.',
      },
      {
        id: 'faq4',
        question: 'El sistema grava les imatges o només mostra la visió en temps real?',
        answer: 'Per defecte, el sistema mostra la visió en temps real, però es pot integrar amb una unitat de gravació (DVR) que emmagatzema les imatges de totes les càmeres. Això permet registrar esdeveniments o maniobres crítiques per a la seva posterior anàlisi, formació de conductors o investigació d\'incidents, complint sempre amb la normativa vigent en matèria de protecció de dades (GDPR).',
      },
      {
        id: 'faq5',
        question: 'Es pot integrar amb altres sistemes del vehicle (ADAS, FMS, etc.)?',
        answer: 'Sí. La nostra tecnologia està preparada per integrar-se mitjançant protocols estàndard (CAN, Ethernet, API, FMS) amb sistemes d\'assistència avançada (ADAS), monitorització de flotes o plataformes telemàtiques. D\'aquesta manera, les dades de visió i alertes poden combinar-se amb informació de sensors, GPS o gestió de rutes, oferint una visió global i centralitzada del rendiment i la seguretat del vehicle.',
      },
      {
        id: 'faq6',
        question: 'Requereix manteniment periòdic o recalibració?',
        answer: 'El sistema està dissenyat per a un funcionament continu i estable, sense necessitat d\'ajustaments freqüents. No obstant això, es recomana una revisió visual i recalibració bàsica després d\'operacions de manteniment del vehicle o substitució de càmeres, per assegurar una alineació perfecta. Els components estan fabricats amb certificació IP69K, garantint resistència a pols, aigua, vibracions i temperatures extremes.',
      },
    ],
  },
  eu: {
    ...baseTranslations,
    header: {
        login: 'Saioa Hasi',
        getQuote: 'Aurrekontua Eskatu',
        openMenu: 'Menua Ireki',
        changeLanguage: 'Hizkuntza Aldatu',
    },
    hero: {
      ...baseTranslations.hero,
      title: '360° Kontrola IA-rekin: Arriskuak Murriztu, Eraginkortasuna Maximizatu.',
      subtitle: '-40% istripu flotetan 6 hilabetetan.',
      description: 'Egunero, zure flota ezustekoari aurre egiten dio. Vision360IA-rekin, zure ibilgailuek haratago ikusten dute: arriskuak detektatzen dituzte, talkak aurreikusten dituzte eta datuak segurtasun aktibo bihurtzen dituzte. IA-k bultzatutako ADAS teknologia, garrantzitsuena babesteko diseinatua: zure taldea eta zure aktiboak.',
      mainCta: 'Demo bat eskatu',
      secondaryCta: 'Bideoa ikusi 60s',
      trustedBy: 'Flota nagusien konfiantzarekin',
      dailyChallenge: 'Egunero, zure flota ezustekoari aurre egiten dio.',
      vision360iaIntro: 'zure ibilgailuek haratago ikusten dute',
      badges: {
        detectRisks: 'Arriskuak detektatzen ditu',
        anticipateCollisions: 'Talkak aurreikusten ditu',
        convertData: 'Datuak segurtasun aktibo bihurtzen ditu',
      },
      adasTech: 'garrantzitsuena babesteko diseinatua:',
      teamAssets: 'zure taldea eta zure aktiboak',
    },
    footer: {
        ...baseTranslations.footer,
        tagline: 'Ibilgailuentzako Segurtasun Soluzio Aurreratuak etorkizun seguruago baterako.',
        quickLinks: 'Esteka Azkarrak',
        company: {
            title: 'Enpresa',
            about: 'Guri Buruz',
            jobs: 'Lana',
            press: 'Prentsa',
        },
        legal: {
            title: 'Legezkoa',
            privacy: 'Pribatutasun Politika',
            terms: 'Zerbitzu Baldintzak',
        },
        copyright: 'Eskubide guztiak erreserbatuta.',
    },
    productsSection: {
      ...baseTranslations.productsSection,
      eyebrow: 'Abantaila Nagusiak',
      title: 'Zure Inbertsioa Babesteko Diseinatutako Teknologia',
      description: 'Abangoardiako hardwarea integratzen dugu zure ibilgailuetan: definizio altuko kamerak eta sentsore sendoak, IA algoritmoek prozesatuta, ingurunea denbora errealean aztertzen dutenak arriskuak aurreikusteko, puntu itsuak ezabatzeko eta babes integrala eta eraginkortasun operatibo handiagoa bermatzeko.',
      addToCart: 'Informazio Gehiago',
    },
    solutionsSection: {
        ...baseTranslations.solutionsSection,
        eyebrow: 'Neurrira Egindako Soluzioak',
        title: 'Zure Ibilgailura Egokitzen den Segurtasuna',
        description: 'Garraio-flotarako ekosistema digital integratuak diseinatzen, ezartzen eta mantentzen ditugu: autobusak, kamioak, trenak eta ibilgailu industrialak.\nTeknologia eraginkortasun operatiborako eta mugikortasun adimendunaren erronka berrietarako bideratua.',
        learnMore: 'Gehiago Jakin',
    },
    aiAnalysisSection: {
        ...baseTranslations.aiAnalysisSection,
        eyebrow: 'IA bidezko Analisia',
        title: 'Lortu zure Segurtasun Txosten Pertsonalizatua',
        description: 'Gure mehatxuen analisi tresna adimendunak zure ibilgailu eta kokapen espezifikoetarako arriskuak ebaluatzen ditu, neurrira egindako segurtasun gomendioak emateko.',
        form: {
            ...baseTranslations.aiAnalysisSection.form,
            vehicleType: 'Ibilgailu Mota',
            vehicleTypePlaceholder: 'adib. SUV',
            vehicleMake: 'Marka',
            vehicleMakePlaceholder: 'adib. Toyota',
            vehicleModel: 'Modeloa',
            vehicleModelPlaceholder: 'adib. RAV4',
            vehicleYear: 'Urtea',
            vehicleYearPlaceholder: 'adib. 2023',
            location: 'Kokalekua (Hiria, Probintzia)',
            locationPlaceholder: 'adib. Donostia, GI',
            specificConcerns: 'Kezka Espezifikoak (Aukerakoa)',
            specificConcernsPlaceholder: 'adib. Lapurreta, katalizatzailearen lapurreta',
            analyzeButton: 'Mehatxuak Analizatu',
        },
        results: {
            ...baseTranslations.aiAnalysisSection.results,
            loading: 'Zure ibilgailua aztertzen...',
            loadingDescription: 'Gure IA zure txosten pertsonalizatua prestatzen ari da.',
            errorTitle: 'Analisiak Huts Egin Du',
            pendingTitle: 'Zure Txostena Zain Duzu',
            pendingDescription: 'Bete formularioa hasteko.',
            reportTitle: 'Zure Segurtasun Txostena',
            threatAnalysis: 'Mehatxuen Analisia',
            recommendations: 'Gomendioak',
            reasoning: 'Arrazoiketa',
        },
    },
    newsSection: {
        ...baseTranslations.newsSection,
        eyebrow: 'Berriak eta Informazioa',
        title: 'Aurreratu Segurtasun Mehatxuei',
        description: 'Irakurri gure azken artikuluak ibilgailuen segurtasun joerei, teknologia berriei eta segurtasun aholkuei buruz.',
        readMore: 'Gehiago Irakurri',
    },
    testimonialsSection: {
        ...baseTranslations.testimonialsSection,
        eyebrow: 'Gure Bezeroek Esaten Dutena',
        title: 'Gidari eta Flota Kudeatzaileen Konfiantza',
        description: 'Ez fidatu gure hitzaz soilik. Hona hemen gure bezero pozikek Vision360ia-ri buruz esaten dutena.',
    },
    faqSection: {
        ...baseTranslations.faqSection,
        eyebrow: 'Galdera Ohikoenak',
        title: 'Zure Galderak, Erantzunak',
        description: 'Aurkitu gure produktuei, zerbitzuei eta ibilgailuen segurtasun orokorrari buruzko galdera ohikoenen erantzunak.',
    },
    contactSection: {
        ...baseTranslations.contactSection,
        eyebrow: 'Hitz Egin Dezagun Zure Proiektuaz',
        title: 'Hitz Egin Dezagun Ingeniaritzaz, ez Salmentaz',
        description: 'Kontatu nolakoa den zure flota eta 20–30 minutuko saio tekniko batean WINFINeko ingeniari batek Vision360IA arkitektura egokiena proposatuko dizu zure eragiketarako.',
        badges: [
          '+2.000 ibilgailu ekipatuta',
          'Integratzaileak: Indra, GMV, Etra',
          'Operadoreak: EMT Madrid, CRTM, ATM…'
        ],
        blocks: {
          contact: 'Kontaktu datuak',
          fleet: 'Zure flotari buruz',
          technical: 'Xehetasun teknikoak',
          privacy: 'Pribatutasuna eta komunikazioak'
        },
        form: {
            ...baseTranslations.contactSection.form,
            name: 'Izen Osoa',
            namePlaceholder: 'Jon Artola Etxeberria',
            email: 'Posta Elektroniko Helbidea',
            emailPlaceholder: 'zurea@adibidea.eus',
            company: 'Enpresa',
            companyPlaceholder: 'Zure operadorearen / enpresaren izena',
            role: 'Kargua / rola',
            rolePlaceholder: 'Adib.: Eragiketa Zuzendaria, CTO, Flota Arduraduna…',
            phone: 'Telefonoa (aukerakoa)',
            phonePlaceholder: 'Saio teknikoa azkarrago koordinatzeko',
            fleetSize: 'Flotaren tamaina *',
            fleetSizeOptions: {
              placeholder: 'Hautatu…',
              option1: '1–20 ibilgailu',
              option2: '21–100 ibilgailu',
              option3: '101–300 ibilgailu',
              option4: '300 ibilgailu baino gehiago'
            },
            vehicleTypes: 'Ibilgailu motak',
            vehicleTypeOptions: {
              urban: 'Autobus hiritarrak',
              intercity: 'Hiriartekoek / eskualdekoak',
              trucks: 'Kamioak / logistika',
              industrial: 'Ibilgailu industrialak / bereziak'
            },
            mainInterest: 'Interes nagusia',
            mainInterestOptions: {
              placeholder: 'Hautatu…',
              vision360: 'Vision360 (360° kamerak)',
              driverMonitoring: 'Gidariaren monitorizazioa',
              analytics: 'Gertaeren eta intzidenteen analitika',
              integration: 'Lehendik dauden sistemekiko integrazioa',
              pilot: 'Pilotu proiektua / kontzeptu froga'
            },
            projectHorizon: 'Proiektuaren horizontea',
            projectHorizonOptions: {
              placeholder: 'Hautatu…',
              exploring: 'Aukerak aztertzen',
              months3: '1–3 hilabete',
              months6: '3–6 hilabete',
              year: '6 hilabete baino gehiago'
            },
            contactPreference: 'Kontaktu lehentasuna',
            contactPreferenceOptions: {
              placeholder: 'Hautatu…',
              video: 'Bideo-deia',
              phone: 'Telefonoa',
              email: 'Posta elektronikoa'
            },
            message: 'Zure Mezua',
            messagePlaceholder: 'Nola lagun zaitzakegu?',
            privacyLabel: 'Irakurri eta onartzen dut',
            privacyLink: 'Pribatutasun Politika',
            marketingLabel: 'Funtzionalitate berrien eta arrakasta-kasuen informazioa jaso nahi dut (aukerakoa)',
            submitButton: 'Bidali eta saio teknikoa antolatu',
            submitting: 'Bidaltzen...',
            footerText: 'Zure datuak babestuak daude. Spam-ik gabe. Teknologiaz eta flota errealetan gertaturikoz bakarrik hitz egiten dugu.',
            sendButton: 'Adituarekin Hitz Egin →',
        },
        toast: {
            title: 'Mezua Bidalita!',
            description: 'Eskerrik asko gurekin harremanetan jartzeagatik. Laster erantzungo dizugu.',
        },
    },
    languageBanner: {
        ...baseTranslations.languageBanner,
        suggestion: 'Badirudi {lang} nahiago duzula. Aldatu nahi duzu?',
        languages: {
            es: 'gaztelania',
            ca: 'katalana',
            eu: 'euskara',
        },
        confirm: 'Bai, aldatu',
        dismiss: 'Ez, eskerrik asko',
    },
    whyWinfinSection: {
      title: 'Zergatik Vision360IA?',
      description: '<strong>Vision360IA</strong> WINFINek garatutako segurtasun aurreratuko plataforma da; <strong>WINFINek</strong> <strong>20 urte baino gehiagoko esperientzia</strong> du garraiorako sistema teknologikoetan.\nEsperientzia honekin, <strong>fidagarritasuna eta berrikuntza uztartzen dituzten soluzioak</strong> garatzen ditugu, eta etengabe hobetzen ditugu <strong>mugikortasun adimendunaren erronkei</strong> erantzuteko.',
      aboutUsButton: 'Nor gara',
      aboutUsAriaLabel: 'Nor garenari buruz gehiago irakurri',
    },
    aboutPage: {
      hero: {
        title: 'Nor gara',
        subtitle: '20 urte baino gehiago garraioaren berrikuntza eta segurtasuna bultzatzen.',
        cta: 'Kontaktatu',
      },
      sections: {
        mission: {
          title: 'Gure Misioa',
          text: 'Garraio-flotetarako segurtasun, eraginkortasun eta iraunkortasun handiena bermatzen duten abangoardiako soluzio teknologikoak eskaintzea, berrikuntza etengabearen bidez bizitzak eta aktiboak babestuz.',
        },
        vision: {
          title: 'Gure Ikuspegia',
          text: 'Garraiorako sistema adimendunetan mundu mailako partner teknologiko liderra izatea, mundua mugitzeko modua eraldatuz, ibilgailuz ibilgailu.',
        },
        whatWeDo: {
          title: 'Zer Egiten Dugu',
          text: 'Garraiorako soluzio teknologikoen ekosistema osoa eskaintzen dugu.',
        },
      },
      cta: {
        title: 'Zure flota eraldatzeko prest?',
        text: 'Hitz egin dezagun gure soluzioak zure behar espezifikoetara nola egokitu daitezkeen.',
        button: 'Proposamena Eskatu',
      },
    },
    whyWinfinCards: [
      {
        id: 'experience',
        icon: 'Users',
        title: 'Esperientzia',
        text: '20 urte baino gehiago autobusetan, trenetan eta flota industrialetan barneratutako sistemak instalatzen eta mantentzen. <strong>+2.000 ibilgailu hornituta</strong>.',
      },
      {
        id: 'trust',
        icon: 'Handshake',
        title: 'Konfiantza',
        text: '<strong>Indra, GMV eta Etra</strong> bezalako integratzaileekin, eta <strong>EMT Madrid, CRTM, ATM Barcelona eta Lurraldebus</strong> bezalako operadoreekin lan egiten dugu.',
      },
      {
        id: 'innovation',
        icon: 'BrainCircuit',
        title: 'Berrikuntza',
        text: '<strong>IoT, Big Data eta IA</strong>n oinarritutako soluzioak: <strong>Vision360IA</strong> eta <strong>Afluencia360</strong> segurtasunerako, eraginkortasunerako eta iraunkortasunerako.',
      },
      {
        id: 'custom-solutions',
        icon: 'Lightbulb',
        title: 'Neurrirako soluzioak',
        text: 'Garraio-flotarako <strong>ekosistema digital integratuak</strong> diseinatzen, ezartzen eta mantentzen ditugu: <strong>autobusak, kamioak, trenak eta ibilgailu industrialak</strong>.<br class="hidden sm:block" /><span class="block mt-2"><strong>Teknologia eraginkortasun operatiborako</strong> eta <strong>mugikortasun adimendunaren erronka berrietarako</strong> bideratua.</span>',
      },
    ],
    navigationLinks: [
        { href: '#products', label: 'Produktua' },
        { href: '#faq', label: 'FAQs' },
        { href: '#contact', label: 'Kontaktua' },
    ],
    products: [
        { id: 'prod1', price: 'Onura', image: findImage('product1'), ...productSpecs.prod1,
          name: '360º-ko Ikuspegi Periferikoa',
          description: 'Vision360ia-k puntu itsuak ezabatzen ditu eta ingurunearen kontrol osoa eskaintzen du. HD ultra angelu zabaleko (>180°) kameren fusio adimendunaren bidez, denbora errealeko ikuspegi zenital bateratua sortzen du. Bere ECU dedikatuak irudia doitasun handienarekin prozesatu eta konposatzen du kabinako monitorean etengabeko, zorrotz eta egonkorra den bistaratzea erakusteko, baita euriarekin, hautsarekin edo argi gutxirekin ere. Edozein ibilgailu motarako integrazio azkarra eta konfiguragarria.',
        },
        { id: 'prod2', price: 'Onura', image: findImage('product2'), ...productSpecs.prod2,
          name: 'Kabinako Alerta Proaktiboak',
          description: 'Gidariari Laguntza Proaktiboa IA-rekin sistemak ibilgailuaren segurtasun aktiboa areagotzen du arriskuen detekzio goiztiarraren bidez. Ikusmen artifizialeko eta analisi prediktiboko algoritmoetan oinarrituta, ADAS modulu honek etengabe gainbegiratzen du ibilgailuaren ingurunea eta abisu bisualak eta soinudunak igortzen ditu kabinan arrisku-egoera posibleen aurrean. Sistemak aurreko talka-arriskua (FCW), nahigabeko erreitik irteteak (LDW) eta oinezkoen edo txirrindularien presentzia (VRU) detektatu eta jakinarazten ditu arrisku-eremuetan. Bere interfaze intuitibo eta konfiguragarriak alerten interpretazioa errazten du, gidariari berehala erreakzionatzeko aukera emanez.',
        },
        { id: 'prod3', price: 'Onura', image: findImage('product3'), ...productSpecs.prod3,
          name: 'IA Analisia eta Txostenak',
          description: 'Flotaren Analisirako IA Plataformak datu telematikoak informazio estrategiko bihurtzen ditu erabakiak hartzeko. Adimen artifizialeko eta ikaskuntza automatikoko algoritmo aurreratuen bidez, gidatzeko ereduak, gertaera kritikoak eta arrisku-jokabideak aztertzen ditu, txosten zehatzak eta pertsonalizagarriak sortuz. Tresna honek ibilgailu eta gidari bakoitzaren errendimendu operatiboaren ikuspegi integrala eskaintzen du, ibilbideak optimizatzen, erregai eta mantentze-kostuak murrizten eta gidatze-kultura seguruago eta eraginkorragoa sustatzen lagunduz.',
        },
    ],
    solutions: [
      {
        id: 'cars',
        vehicleType: 'Autoak',
        title: 'Babes Aurreratua Gidari Partikularrentzat',
        description: 'Segurtasuna ez da flotentzako bakarrik. Autoentzako gure ADAS soluzioek goi-mailako gidariari laguntzeko teknologia zure ibilgailu pertsonalera eramaten dute. Gozatu lasaitasun handiagoaz talka-abisuak, oinezkoen detekzioa eta hirian aparkatzea eta maniobrak egitea inoiz baino errazago eta seguruago bihurtzen duen 360º-ko ikuspegiarekin.',
        features: [
          'Ikuspegi periferiko osoa puntu itsuak ezabatzeko.',
          'Aurreko talka eta atzeko trafiko gurutzatuaren alertak.',
          'Aparkatzeko laguntzailea txori-ikuspegiarekin.',
          'Oinezkoen eta txirrindularien detekzioa hiri-segurtasunerako.',
        ],
        image: findImage('solution1'),
      },
      {
        id: 'trucks',
        vehicleType: 'Flotak',
        title: 'Optimizazioa eta Segurtasuna Flota Komertzialentzat',
        description: 'Maximizatu eraginkortasuna eta minimizatu arriskua zure flota osoan. Gure plataforma zentralizatuak zure ibilgailu guztien ikuspegi osoa eskaintzen dizu, gidariaren portaeraren analisia, ibilbideen optimizazioa eta mantentze prediktiboko alertak barne. Murriztu erregai-kostuak, saihestu istripu garestiak eta bermatu zure taldea eta zama beren helmugara segurtasunez iristen direla.',
        features: [
          '360º-ko monitorizazioa denbora errealean ibilgailu bakoitzerako.',
          'Gidariaren portaeraren IA analisia eta arrisku-puntuazioa.',
          'Ibilbideen optimizazioa eta erregai-kudeaketa.',
          'Mantentze-lanen eta ibilgailuen diagnostikoen alertak.',
        ],
        image: findImage('solution2'),
      },
      {
        id: 'motorcycles',
        vehicleType: 'Profesionalak',
        title: 'Segurtasun Hobetua Mugimenduan dauden Profesionalentzat',
        description: 'Banatzaileetatik hasi eta larrialdi-zerbitzuetaraino, errepidean dauden profesionalek arrisku bereziei aurre egiten diete. Gure soluzio trinko eta sendoak motozikleta eta ibilgailu arinetarako diseinatuta daude, puntu itsuen detekzioa eta ibilgailu hauen arintasun eta ahultasunera egokitutako talka-alertak eskainiz, gidariaren segurtasuna nabarmen hobetuz.',
        features: [
          'Ibilgailuen detekzioa alboko eta atzeko puntu itsuetan.',
          'Aurreko talka-alertak hurbiltasun-abisuarekin.',
          'Diseinu trinkoa, eguraldiari erresistentea eta kontsumo txikikoa.',
          'Instalazio erraza eta lehendik dauden sistemekin integratzea.',
        ],
        image: findImage('solution3'),
      },
    ],
    testimonials: [
        {
          id: 'client1',
          quote: 'Gure flotan Vision360ia instalatu genuenetik, istripu txikiak %40 jaitsi dira. Inbertsioak bere burua ordaindu du.',
          author: 'Javier Gómez',
          company: 'Logistika Zuzendaria, TransLogis',
          avatar: findImage('avatar1'),
        },
        {
          id: 'client2',
          quote: 'Gidari gisa, 360 graduko ikuspegiak sekulako lasaitasuna ematen dit hiri-trafikoan. Jada ez naiz puntu itsuez kezkatzen.',
          author: 'Ana Torres',
          company: 'Garraiolari Profesionala',
          avatar: findImage('avatar2'),
        },
        {
          id: 'client3',
          quote: 'Analisi plataforma izugarri indartsua da. Ezagutzen ez genituen arrisku-ereduak identifikatzen eta gure gidariak modu eraginkorragoan prestatzen lagundu digu.',
          author: 'Carlos Ruiz',
          company: 'Flota Kudeatzailea, UrbanGo',
          avatar: findImage('avatar3'),
        },
    ],
    faqs: [
      {
        id: 'faq1',
        question: 'Nola funtzionatzen du zehazki 360°-ko kamera-sistemak?',
        answer: 'Sistemak ibilgailuan estrategikoki kokatutako lau HD angelu zabaleko kamera edo gehiago erabiltzen ditu (aurrean, atzean eta alboetan). Irudiak Kontrol Unitate Elektroniko (ECU) batera bidaltzen dira, honek prozesatu, distortsio optikoak zuzendu eta denbora errealean fusionatzen ditu, "txori-bista" edo ikuspegi zenital bat sortuz, ibilgailua eta bere ingurune hurbila kabinako monitorean argitasun osoz erakusten dituena.',
      },
      {
        id: 'faq2',
        question: 'Zein desberdintasun dago zuen sistemaren eta atzerako martxako kamera konbentzional baten artean?',
        answer: 'Atzerako martxako kamera batek atzeko ikuspegia soilik eskaintzen du, aldiz, 360° ikuspegi inguratzailearen sistemak aldi berean hainbat kameren irudiak konbinatzen ditu ibilgailuaren perimetro osoaren ikuspegi integrala emateko. Honek norabide guztietan puntu itsuak ezabatzea, ingurunearen pertzepzioa hobetzea eta maniobra konplexuak —biraketa itxiak, aparkalekuak edo espazio murriztuetan zirkulatzea— segurtasun osoz erraztea ahalbidetzen du.',
      },
      {
        id: 'faq3',
        question: 'Zaila al da sistema kamioietan edo ibilgailu handietan instalatzea?',
        answer: 'Ez. Sistemak teknikari ziurtatuek instalazio azkar eta zehatza egiteko diseinatuta daude. Prozesuak kameren kokapen estrategikoa eta irudien fusio zuzena bermatzen duen kalibrazio automatikoa barne hartzen ditu. Ibilgailu mota desberdinetara egokitutako kit espezifikoak ditugu, autobusetatik eta kamioietatik hasi eta makineria industrial edo nekazaritzakoraino, beti emaitza optimoa eta fidagarria bermatuz.',
      },
      {
        id: 'faq4',
        question: 'Sistemak irudiak grabatzen ditu ala denbora errealeko ikuspegia soilik erakusten du?',
        answer: 'Lehenespenez, sistemak denbora errealeko ikuspegia erakusten du, baina kamera guztien irudiak gordetzen dituen grabazio-unitate (DVR) batekin integra daiteke. Honek gertaera edo maniobra kritikoak erregistratzea ahalbidetzen du, ondoren aztertzeko, gidariak prestatzeko edo gertakarien ikerketarako, betiere datuen babesari buruzko indarrean dagoen araudia (GDPR) betez.',
      },
      {
        id: 'faq5',
        question: 'Integra daiteke beste ibilgailu-sistemekin (ADAS, FMS, etab.)?',
        answer: 'Bai. Gure teknologia protokolo estandarren bidez (CAN, Ethernet, API, FMS) laguntza-sistema aurreratuekin (ADAS), floten monitorizazioarekin edo plataforma telematikoekin integratzeko prestatuta dago. Horrela, ikusmen-datuak eta alertak sentsoreen informazioarekin, GPSarekin edo ibilbideen kudeaketarekin konbina daitezke, ibilgailuaren errendimenduaren eta segurtasunaren ikuspegi global eta zentralizatua eskainiz.',
      },
      {
        id: 'faq6',
        question: 'Aldizkako mantentze-lanak edo birkalibrazioa behar du?',
        answer: 'Sistema etengabeko eta egonkorra den funtzionamendurako diseinatuta dago, maiz doikuntzak egin beharrik gabe. Hala ere, ibilgailuaren mantentze-lanak egin edo kamerak ordezkatu ondoren, oinarrizko ikusizko berrikuspena eta birkalibrazioa gomendatzen da, lerrokatze perfektua ziurtatzeko. Osagaiak IP69K ziurtagiriarekin fabrikatuta daude, hautsarekiko, urarekiko, bibrazioekiko eta muturreko tenperaturekiko erresistentzia bermatuz.',
      },
    ],
  },
};

export type Translation = typeof translations;
