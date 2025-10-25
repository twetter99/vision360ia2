
import { findImage, type ImagePlaceholder } from "@/lib/placeholder-images";

// Define the structure for a single news article
export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: ImagePlaceholder;
}

// Mock data simulating what would come from a CMS API
const mockNewsData: NewsArticle[] = [
  { 
    id: 'news1', 
    title: 'El Auge del Robo de Coches Sin Llave y Cómo Prevenirlo', 
    date: '26 de Octubre, 2023', 
    excerpt: 'Los sistemas de entrada sin llave son convenientes, pero también han abierto la puerta a una nueva ola de ladrones de coches de alta tecnología. Aprende cómo funcionan los ataques de relé y qué puedes hacer.', 
    image: findImage('news1') 
  },
  { 
    id: 'news2', 
    title: 'Por Qué los Rastreadores GPS son Imprescindibles para los Gestores de Flotas', 
    date: '15 de Octubre, 2023', 
    excerpt: 'Más allá de la recuperación por robo, los rastreadores GPS modernos ofrecen un conjunto de herramientas para mejorar la eficiencia, reducir costes y aumentar la seguridad para flotas comerciales de todos los tamaños.', 
    image: findImage('news2') 
  },
  { 
    id: 'news3', 
    title: 'El Futuro de la Seguridad Vehicular: IA y Análisis Predictivo', 
    date: '5 de Octubre, 2023', 
    excerpt: 'La inteligencia artificial ya no es ciencia ficción. Descubre cómo la IA está revolucionando la seguridad vehicular al predecir y prevenir amenazas antes de que ocurran.', 
    image: findImage('news3') 
  },
];

/**
 * Simulates fetching news articles from a headless CMS.
 * @returns A promise that resolves to an array of news articles.
 */
export async function getNewsArticles(): Promise<NewsArticle[]> {
  // In a real application, this would be an API call to your CMS
  // e.g., await fetch('https://your-cms.com/api/news-articles')
  console.log("Fetching news articles from mock CMS...");
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50)); 
  
  return mockNewsData;
}
