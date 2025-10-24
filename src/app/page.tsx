import { Contact } from '@/components/sections/contact';
import { Faq } from '@/components/sections/faq';
import { Hero } from '@/components/sections/hero';
import { News } from '@/components/sections/news';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { SolutionsOverview } from '@/components/sections/solutions-overview';
import { Testimonials } from '@/components/sections/testimonials';
import { ThreatAnalysis } from '@/components/sections/threat-analysis';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProductShowcase />
      <SolutionsOverview />
      <ThreatAnalysis />
      <News />
      <Testimonials />
      <Faq />
      <Contact />
    </div>
  );
}
