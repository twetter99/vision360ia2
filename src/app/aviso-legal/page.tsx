'use client';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <article className="max-w-none">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <Link 
              href="/" 
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {common.backToHome}
            </Link>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary md:text-xs">
                  <Scale className="h-4 w-4" />
                  Información jurídica
                </div>
                <h1 className="font-headline text-4xl font-semibold tracking-[-0.035em] text-slate-950 md:text-5xl">{t.title}</h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed tracking-[-0.015em] text-slate-600">{t.subtitle}</p>
              </div>

              <div className="elevated-card rounded-[1.75rem] border border-white/70 p-5 md:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Documentos relacionados</p>
                <div className="grid gap-3">
                  <Link href="/privacidad" className="interactive-tile flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700">
                    <span>Política de Privacidad</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                  <Link href="/cookies" className="interactive-tile flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700">
                    <span>Política de Cookies</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
          <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{t.titular.title}</h2>
            </div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">{t.titular.title}</h2>
            <div className="space-y-2 text-slate-700">
              <p><strong>{language === 'ca' ? 'Raó social:' : language === 'eu' ? 'Sozietate izena:' : 'Razón social:'}</strong> {t.titular.company}</p>
              <p><strong>CIF:</strong> {t.titular.cif}</p>
              <p><strong>{language === 'ca' ? 'Domicili:' : language === 'eu' ? 'Helbidea:' : 'Domicilio:'}</strong> {t.titular.address}</p>
              <p><strong>Email:</strong> <a href="mailto:info@vision360ia.com" className="text-primary hover:underline">info@vision360ia.com</a></p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
          <p className="text-slate-600 leading-relaxed">
            {t.intro}
          </p>
          </div>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.objeto.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.objeto.content}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.condiciones.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.condiciones.content}
            </p>
            <div className="rounded-[1.25rem] border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">{t.sections.condiciones.prohibido}</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                {t.sections.condiciones.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.propiedad.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.propiedad.content1}
            </p>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.propiedad.content2}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
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

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.enlaces.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.enlaces.content}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.proteccion.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.proteccion.content}{' '}
              <Link href="/privacidad" className="text-primary hover:underline font-medium">
                {t.sections.proteccion.link}
              </Link>
              {t.sections.proteccion.content2}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.legislacion.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.legislacion.content}
            </p>
          </section>

          <div className="border-t border-slate-200 pt-6 mt-2">
            <p className="text-sm text-slate-500">
              {common.lastUpdated}: {new Date().toLocaleDateString(language === 'ca' ? 'ca-ES' : language === 'eu' ? 'eu-ES' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          </div>
        </article>
      </div>
    </div>
  );
}
