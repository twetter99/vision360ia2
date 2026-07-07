import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['deteccion-peatones-zonas-riesgo'].metadata;

export default function DeteccionPeatonesZonasRiesgoPage() {
  return <SolutionPage data={solutionPages['deteccion-peatones-zonas-riesgo'].page} />;
}
