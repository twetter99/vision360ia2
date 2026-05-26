import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Build estático: genera carpeta `out/` con HTML/CSS/JS puro listo para subir a SiteGround.
  // Las cabeceras de seguridad (CSP, HSTS, etc.) se sirven vía .htaccess (ver public/.htaccess).
  output: 'export',

  trailingSlash: false,
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1'],

  // Image Optimization no aplica en static export; servimos imágenes tal cual.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // ESLint 9 tiene bug con .eslintrc.json; lintamos en local antes de push.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
