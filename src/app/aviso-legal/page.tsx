'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { legalTranslations } from '@/lib/legal-translations';
import { useEffect, useState } from 'react';

export default function AvisoLegal() {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const lang = (language || 'es') as keyof typeof legalTranslations;
  const t = legalTranslations[lang]?.avisoLegal || legalTranslations.es.avisoLegal;
  const common = legalTranslations[lang] || legalTranslations.es;
  
  // Wait for client hydration to avoid SSR mismatch
  if (!isClient || !t || !t.title) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {common.backToHome}
        </Link>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{t.title}</h1>
          <p className="text-lg text-slate-600 mb-8">{t.subtitle}</p>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">{t.titular.title}</h2>
            <div className="space-y-2 text-slate-700">
              <p><strong>{language === 'ca' ? 'Raó social:' : language === 'eu' ? 'Sozietate izena:' : 'Razón social:'}</strong> {t.titular.company}</p>
              <p><strong>CIF:</strong> {t.titular.cif}</p>
              <p><strong>{language === 'ca' ? 'Domicili:' : language === 'eu' ? 'Helbidea:' : 'Domicilio:'}</strong> {t.titular.address}</p>
              <p><strong>Email:</strong> <a href="mailto:info@vision360ia.com" className="text-primary hover:underline">info@vision360ia.com</a></p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">
            {t.intro}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.objeto.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.objeto.content}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.condiciones.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.condiciones.content}
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">{t.sections.condiciones.prohibido}</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                {t.sections.condiciones.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.propiedad.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.propiedad.content1}
            </p>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.propiedad.content2}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.responsabilidad.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.responsabilidad.content}
            </p>
            <ul className="space-y-2 text-slate-700 mb-4">
              {t.sections.responsabilidad.items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.responsabilidad.footer}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.enlaces.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.enlaces.content}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.proteccion.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.proteccion.content}{' '}
              <Link href="/privacidad" className="text-primary hover:underline font-medium">
                {t.sections.proteccion.link}
              </Link>
              {t.sections.proteccion.content2}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.legislacion.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.legislacion.content}
            </p>
          </section>

          <div className="border-t border-slate-200 pt-6 mt-12">
            <p className="text-sm text-slate-500">
              {common.lastUpdated}: {new Date().toLocaleDateString(language === 'ca' ? 'ca-ES' : language === 'eu' ? 'eu-ES' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
