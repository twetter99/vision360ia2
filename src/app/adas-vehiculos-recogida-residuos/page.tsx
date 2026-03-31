import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['adas-vehiculos-recogida-residuos'].metadata;

export default function AdasVehiculosRecogidaResiduosPage() {
  return <SolutionPage data={solutionPages['adas-vehiculos-recogida-residuos'].page} />;
}