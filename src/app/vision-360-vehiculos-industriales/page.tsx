import { SolutionPage } from '@/components/sections/solution-page';
import { solutionPages } from '@/lib/solution-pages';

export const metadata = solutionPages['vision-360-vehiculos-industriales'].metadata;

export default function Vision360VehiculosIndustrialesPage() {
  return <SolutionPage data={solutionPages['vision-360-vehiculos-industriales'].page} />;
}