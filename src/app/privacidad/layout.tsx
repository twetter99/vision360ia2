import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de Vision360IA conforme al RGPD (Reglamento UE 2016/679) y la LOPDGDD. Tratamiento de datos personales por WINFIN INSTALACIONES, S.L.',
  alternates: {
    canonical: '/privacidad',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Política de Privacidad | Vision360IA',
    description:
      'Cómo tratamos tus datos personales en cumplimiento del RGPD y la LOPDGDD. Responsable: WINFIN INSTALACIONES, S.L.',
    url: 'https://www.vision360ia.com/privacidad',
    type: 'website',
  },
};

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
