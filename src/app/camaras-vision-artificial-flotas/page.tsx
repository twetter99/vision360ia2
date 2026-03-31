import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['camaras-vision-artificial-flotas'].metadata;

export default function CamarasVisionArtificialFlotasPage() {
  return <SolutionPage data={solutionPages['camaras-vision-artificial-flotas'].page} />;
}