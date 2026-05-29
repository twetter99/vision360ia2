import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description:
    'Aviso legal de Vision360IA. Titular: WINFIN INSTALACIONES, S.L. (CIF B05393632). Condiciones de uso del sitio web, propiedad intelectual y responsabilidad.',
  alternates: {
    canonical: '/aviso-legal',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Aviso Legal | Vision360IA',
    description:
      'Condiciones de uso del sitio web vision360ia.com y datos del titular WINFIN INSTALACIONES, S.L.',
    url: 'https://www.vision360ia.com/aviso-legal',
    type: 'website',
  },
};

export default function AvisoLegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
