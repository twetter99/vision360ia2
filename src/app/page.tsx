
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { News } from '@/components/sections/news';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { SolutionsOverview } from '@/components/sections/solutions-overview';
import { Testimonials } from '@/components/sections/testimonials';
import { ThreatAnalysis } from '@/components/sections/threat-analysis';
import { WhyUs } from '@/components/sections/why-us';
import { translations } from '@/lib/translations';
import { getNewsArticles } from '@/services/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision360ia | Sistema ADAS IA para Reducir Accidentes y Optimizar Flotas',
  description: 'Descubre Vision360ia, el sistema ADAS con IA que ofrece seguridad 360° para tu flota. Previene colisiones, reduce costes y protege a tus conductores. Solicita una demo.',
}

export default async function Home() {
  // Obtenemos las traducciones por defecto en el servidor (español)
  const defaultTranslations = translations.es;
  const newsArticles = await getNewsArticles();
  
  return (
    <div className="flex flex-col">
      <Hero translations={defaultTranslations} />
      <WhyUs translations={defaultTranslations} />
      <ProductShowcase translations={defaultTranslations} />
      <SolutionsOverview translations={defaultTranslations} />
      <ThreatAnalysis translations={defaultTranslations} />
      <News newsArticles={newsArticles} translations={defaultTranslations} />
      <Testimonials translations={defaultTranslations} />
      <Faq translations={defaultTranslations} />
      <Contact translations={defaultTranslations} />
    </div>
  );
}
