import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Política de cookies del sitio Vision360IA. Tipos de cookies utilizadas, finalidad, duración y cómo gestionar tus preferencias.',
  alternates: {
    canonical: '/cookies',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Política de Cookies | Vision360IA',
    description:
      'Tipos de cookies utilizadas en vision360ia.com, su finalidad y cómo configurarlas.',
    url: 'https://www.vision360ia.com/cookies',
    type: 'website',
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
