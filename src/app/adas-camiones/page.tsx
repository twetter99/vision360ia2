import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['adas-camiones'].metadata;

export default function AdasCamionesPage() {
  return <SolutionPage data={solutionPages['adas-camiones'].page} />;
}