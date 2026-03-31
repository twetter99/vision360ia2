import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['adas-autobuses'].metadata;

export default function AdasAutobusesPage() {
  return <SolutionPage data={solutionPages['adas-autobuses'].page} />;
}