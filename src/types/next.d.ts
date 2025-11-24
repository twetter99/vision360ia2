// Extensión de tipos para Vercel Edge Geolocation
// https://vercel.com/docs/concepts/edge-network/geolocation

import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    geo?: {
      city?: string;
      country?: string;
      region?: string;
      latitude?: string;
      longitude?: string;
    };
  }
}
