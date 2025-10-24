
import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { News } from '@/components/sections/news';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { SolutionsOverview } from '@/components/sections/solutions-overview';
import { Testimonials } from '@/components/sections/testimonials';
import { ThreatAnalysis } from '@/components/sections/threat-analysis';
import { translations } from '@/lib/translations';

export default function Home() {
  // Obtenemos las traducciones por defecto en el servidor (español)
  const defaultTranslations = translations.es;
  
  return (
    <div className="flex flex-col">
      <Hero translations={defaultTranslations} />
      <ProductShowcase translations={defaultTranslations} />
      <SolutionsOverview translations={defaultTranslations} />
      <ThreatAnalysis translations={defaultTranslations} />
      <News translations={defaultTranslations} />
      <Testimonials translations={defaultTranslations} />
      <Faq translations={defaultTranslations} />
      <Contact translations={defaultTranslations} />
    </div>
  );
}
