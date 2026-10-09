'use client';

import { useLandingAttribution } from './attribution';
import { getLandingVariant } from './variants';

/** Same neutral SSR and first client render; personalise after attribution mounts. */
export function HeroCopy() {
  const attribution = useLandingAttribution();
  const variant = getLandingVariant(attribution?.params.utm_content);
  return (
    <>
      <h1 className="ef-hero-title">{variant.title}</h1>
      <p className="ef-hero-lead">{variant.lead}</p>
    </>
  );
}
