import { findImage } from './placeholder-images';

export const heroData = {
  image: findImage('hero'),
};

export const navigationLinks = [
  { href: '#products', label: 'Productos' },
  { href: '#solutions', label: 'Soluciones' },
  { href: '#ai-analysis', label: 'Análisis IA' },
  { href: '#news', label: 'Noticias' },
  { href: '#contact', label: 'Contacto' },
];

export const products = [
  {
    id: 'prod1',
    name: 'Rastreador GPS Guardián G1',
    description: 'Seguimiento GPS en tiempo real con geofencing y alertas instantáneas a tu teléfono.',
    price: '199€',
    image: findImage('product1'),
    specs: ['Conectividad 4G LTE', 'Monitorización 24/7', 'Acceso a App Móvil', 'Alertas de Manipulación'],
  },
  {
    id: 'prod2',
    name: 'Alarma Inteligente Aegis A5',
    description: 'Un sistema de alarma inteligente que detecta y disuade amenazas con una sirena penetrante.',
    price: '249€',
    image: findImage('product2'),
    specs: ['Sirena Multi-tono', 'Sensor de Rotura de Cristal', 'Detección de Movimiento', 'Armado/Desarmado Remoto'],
  },
  {
    id: 'prod3',
    name: 'Dashcam Centinela Sentry',
    description: 'Graba todo en la carretera y cuando está aparcado con nuestra dashcam impulsada por IA.',
    price: '399€',
    image: findImage('product3'),
    specs: ['Cámaras 4K Frontal y Trasera', 'Detección de Eventos por IA', 'Almacenamiento en la Nube', 'Modo Aparcamiento'],
  },
];

export const solutions = [
  {
    id: 'sol1',
    vehicleType: 'Coches Personales',
    title: 'Seguridad Completa para tu Viaje Diario',
    description: 'Protege tu coche contra robos y allanamientos con nuestro sistema integrado que incluye alarmas, inmovilizadores y seguimiento GPS. Disfruta de la tranquilidad de saber que tu vehículo personal está seguro.',
    image: findImage('solution1'),
    features: ['Bloqueos de Volante', 'Inmovilizadores Avanzados', 'Sensores de Rotura de Cristal', 'Seguimiento GPS 24/7'],
  },
  {
    id: 'sol2',
    vehicleType: 'Flota Comercial',
    title: 'Gestión y Seguridad Total de la Flota',
    description: 'Monitoriza toda tu flota en tiempo real. Optimiza rutas, supervisa el comportamiento del conductor y protege tus valiosos activos contra robos y malos usos con nuestra solución integral para flotas.',
    image: findImage('solution2'),
    features: ['Seguimiento de Flota en Vivo', 'Alertas de Comportamiento del Conductor', 'Geofencing e Historial de Rutas', 'Apagado Remoto del Motor'],
  },
  {
    id: 'sol3',
    vehicleType: 'Motocicletas',
    title: 'Protección Compacta y Robusta para Motos',
    description: 'Asegura tu motocicleta con nuestros rastreadores y alarmas discretos, impermeables y resistentes a las vibraciones. Recibe alertas instantáneas si tu moto es movida o manipulada.',
    image: findImage('solution3'),
    features: ['Alarma Sensible a Vibraciones', 'Unidad GPS Impermeable', 'Bajo Consumo de Energía', 'Alertas de Inclinación y Movimiento'],
  },
];

export const newsArticles = [
  {
    id: 'news1',
    title: 'El Auge del Robo de Coches Sin Llave y Cómo Prevenirlo',
    date: '26 de Octubre, 2023',
    excerpt: 'Los sistemas de entrada sin llave son convenientes, pero también han abierto la puerta a una nueva ola de ladrones de coches de alta tecnología. Aprende cómo funcionan los ataques de relé y qué puedes hacer.',
    image: findImage('news1'),
  },
  {
    id: 'news2',
    title: 'Por Qué los Rastreadores GPS son Imprescindibles para los Gestores de Flotas',
    date: '15 de Octubre, 2023',
    excerpt: 'Más allá de la recuperación por robo, los rastreadores GPS modernos ofrecen un conjunto de herramientas para mejorar la eficiencia, reducir costes y aumentar la seguridad para flotas comerciales de todos los tamaños.',
    image: findImage('news2'),
  },
  {
    id: 'news3',
    title: 'El Futuro de la Seguridad Vehicular: IA y Análisis Predictivo',
    date: '5 de Octubre, 2023',
    excerpt: 'La inteligencia artificial ya no es ciencia ficción. Descubre cómo la IA está revolucionando la seguridad vehicular al predecir y prevenir amenazas antes de que ocurran.',
    image: findImage('news3'),
  },
];

export const testimonials = [
  {
    id: 'test1',
    quote: 'El sistema de Vision360ia me dio tranquilidad. Puedo revisar mi camión en cualquier momento y lugar. ¡La instalación fue perfecta y el equipo de soporte es fantástico!',
    author: 'Juan D., Propietario de Cía. de Camiones',
    avatar: findImage('avatar1'),
  },
  {
    id: 'test2',
    quote: 'Después de que me robaran en el coche, instalé la alarma Aegis A5. La sensación de seguridad no tiene precio. Duermo mejor por la noche sabiendo que mi coche está protegido.',
    author: 'Sara K., Conductora Urbana',
    avatar: findImage('avatar2'),
  },
  {
    id: 'test3',
    quote: 'El rastreador GPS para mi motocicleta es increíble. Es tan pequeño y discreto, pero increíblemente potente. Recibí una alerta cuando alguien intentó moverla y pude detenerlos.',
    author: 'Miguel R., Entusiasta de las Motocicletas',
    avatar: findImage('avatar3'),
  },
];

export const faqs = [
  {
    id: 'faq1',
    question: '¿Cuánto tiempo tarda la instalación?',
    answer: 'La instalación estándar para la mayoría de nuestros productos tarda entre 1 y 3 horas. Nuestros técnicos certificados aseguran una instalación limpia y profesional sin dañar el interior de tu vehículo.',
  },
  {
    id: 'faq2',
    question: '¿Vuestros productos agotarán la batería de mi vehículo?',
    answer: 'Nuestros productos están diseñados para un consumo de energía ultra bajo. Cuando tu vehículo está aparcado, entran en un modo de suspensión profunda, consumiendo una energía mínima. Para la mayoría de los vehículos, nuestros dispositivos pueden operar durante semanas sin afectar la salud de la batería.',
  },
  {
    id: 'faq3',
    question: '¿Hay una cuota de suscripción mensual?',
    answer: 'Algunos de nuestros productos, particularmente aquellos con conectividad 4G LTE como nuestros rastreadores GPS, requieren una suscripción para datos y servicios en tiempo real. Ofrecemos varios planes asequibles que se ajustan a tus necesidades.',
  },
  {
    id: 'faq4',
    question: '¿Puedo instalar los productos yo mismo?',
    answer: 'Aunque algunos de nuestros productos están diseñados para una fácil instalación por parte del usuario, recomendamos la instalación profesional para sistemas que se integran con el cableado de tu vehículo para garantizar un rendimiento óptimo y la cobertura de la garantía.',
  },
  {
    id: 'faq5',
    question: '¿Qué pasa si un ladrón deshabilita el dispositivo?',
    answer: 'Nuestros sistemas tienen alertas de manipulación incorporadas. Si se corta la energía o se retira el dispositivo, recibirás una notificación inmediata en tu teléfono y se registrará la última ubicación conocida.',
  },
];
