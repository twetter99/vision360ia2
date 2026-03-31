import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['anti-atropellos-peatones-ciclistas'].metadata;

export default function AntiAtropellosPeatonesCiclistasPage() {
  return <SolutionPage data={solutionPages['anti-atropellos-peatones-ciclistas'].page} />;
}