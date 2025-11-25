import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vision360ia.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/secure_storage/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
