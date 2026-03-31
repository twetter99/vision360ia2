'use client';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { legalTranslations } from '@/lib/legal-translations';
import { useEffect, useState } from 'react';

export default function Privacidad() {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const lang = (language || 'es') as keyof typeof legalTranslations;
  const t = legalTranslations[lang]?.privacidad || legalTranslations.es.privacidad;
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
                  <Shield className="h-4 w-4" />
                  Protección de datos
                </div>
                <h1 className="font-headline text-4xl font-semibold tracking-[-0.035em] text-slate-950 md:text-5xl">{t.title}</h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed tracking-[-0.015em] text-slate-600">{t.subtitle}</p>
              </div>

              <div className="elevated-card rounded-[1.75rem] border border-white/70 p-5 md:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Documentos relacionados</p>
                <div className="grid gap-3">
                  <Link href="/aviso-legal" className="interactive-tile flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700">
                    <span>Aviso Legal</span>
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
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">{t.titular.title}</h2>
            <div className="space-y-2 text-slate-700">
              <p><strong>{language === 'ca' ? 'Raó social:' : language === 'eu' ? 'Sozietate izena:' : 'Razón social:'}</strong> {t.titular.company}</p>
              <p><strong>CIF:</strong> {t.titular.cif}</p>
              <p><strong>{language === 'ca' ? 'Domicili:' : language === 'eu' ? 'Helbidea:' : 'Domicilio:'}</strong> {t.titular.address}</p>
              <p><strong>Email:</strong> <a href={`mailto:${t.titular.email}`} className="text-primary hover:underline">{t.titular.email}</a></p>
            </div>
          </div>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">{t.sections.datos.title}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.datos.intro}
            </p>
            <div className="grid gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">{t.sections.datos.types.formulario.badge}</p>
                <p className="text-sm text-slate-700">{t.sections.datos.types.formulario.content}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">{t.sections.datos.types.tecnicos.badge}</p>
                <p className="text-sm text-slate-700">{t.sections.datos.types.tecnicos.content}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">{t.sections.datos.types.navegacion.badge}</p>
                <p className="text-sm text-slate-700">{t.sections.datos.types.navegacion.content}</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">{t.sections.datos.types.terceros.badge}</p>
                <p className="text-sm text-slate-700">{t.sections.datos.types.terceros.content}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">{t.sections.finalidades.title}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">{t.sections.finalidades.intro}</p>
            <ul className="space-y-2 text-slate-700">
              {t.sections.finalidades.items.map((item: string, i: number) => (
                <li key={i}>✓ {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.baseLegal.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">{t.sections.baseLegal.intro}</p>
            <div className="space-y-3">
              {t.sections.baseLegal.items.map((item: { title: string; content: string }, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.conservacion.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.conservacion.intro}
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              {t.sections.conservacion.items.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.comunicacion.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.comunicacion.intro}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <ul className="space-y-1 text-slate-700 text-sm">
                {t.sections.comunicacion.providers.map((provider: string, i: number) => (
                  <li key={i}>• {provider}</li>
                ))}
              </ul>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              {t.sections.comunicacion.footer}{' '}
              <strong>{t.sections.comunicacion.noSale}</strong>
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.transferencias.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.transferencias.intro}
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              {t.sections.transferencias.items.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">{t.sections.derechos.title}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.derechos.intro}{' '}
              <a href={`mailto:${t.titular.email}`} className="text-primary hover:underline font-medium">
                {t.titular.email}
              </a>
              {t.sections.derechos.intro2}
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {t.sections.derechos.rights.map((right: { title: string; description: string }, i: number) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
                  <p className="font-semibold text-slate-900 text-sm">✓ {right.title}</p>
                  <p className="text-xs text-slate-600">{right.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-[1.25rem] p-4 mt-4">
              <p className="text-sm text-slate-700">
                <strong>{t.sections.derechos.authority.label}</strong> {t.sections.derechos.authority.text}{' '}
                <a href="https://www.aepd.es" target="_blank" rel="noopener" className="text-primary hover:underline">
                  {t.sections.derechos.authority.linkText}
                </a>
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.seguridad.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.seguridad.content}
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
