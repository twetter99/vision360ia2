
'use client';

import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { News } from '@/components/sections/news';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { SolutionsOverview } from '@/components/sections/solutions-overview';
import { Testimonials } from '@/components/sections/testimonials';
import { ThreatAnalysis } from '@/components/sections/threat-analysis';
import { useLanguage } from '@/hooks/use-language';

export default function Home() {
  const { translations } = useLanguage();
  return (
    <div className="flex flex-col">
      <Hero translations={translations} />
      <ProductShowcase translations={translations} />
      <SolutionsOverview translations={translations} />
      <ThreatAnalysis translations={translations} />
      <News translations={translations} />
      <Testimonials translations={translations} />
      <Faq translations={translations} />
      <Contact translations={translations} />
    </div>
  );
}
