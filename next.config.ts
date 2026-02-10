
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ignorar ESLint en build (ESLint 9 tiene bug con .eslintrc.json)
    // El linting se hace localmente antes del push
    ignoreDuringBuilds: true,
  },
  
  // ✅ SEO: Trailing slashes consistentes
  trailingSlash: false,
  
  // ✅ SEO: Compresión
  compress: true,
  
  // ✅ SEO: Powered by header (ocultar por seguridad)
  poweredByHeader: false,
  
  // ✅ SEGURIDAD: Cabeceras HTTP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://player.vimeo.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https: ; connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://region1.google-analytics.com; frame-src https://challenges.cloudflare.com https://player.vimeo.com https://www.googletagmanager.com; object-src 'none'; base-uri 'self'; form-action 'self';"
          },
        ],
      },
    ];
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
