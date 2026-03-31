'use client';
import Link from 'next/link';
import { ArrowLeft, Cookie, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { legalTranslations } from '@/lib/legal-translations';
import { useEffect, useState } from 'react';

export default function Cookies() {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const lang = (language || 'es') as keyof typeof legalTranslations;
  const t = legalTranslations[lang]?.cookies || legalTranslations.es.cookies;
  const common = legalTranslations[lang] || legalTranslations.es;

  // Wait for client hydration to avoid SSR mismatch
  if (!isClient || !t || !t.title) {
    return null;
  }

  const browserUrls = {
    chrome: 'https://support.google.com/chrome/answer/95647',
    firefox: language === 'ca' 
      ? 'https://support.mozilla.org/ca/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias'
      : language === 'eu'
      ? 'https://support.mozilla.org/eu/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias'
      : 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias',
    safari: language === 'ca'
      ? 'https://support.apple.com/ca-es/guide/safari/sfri11471/mac'
      : language === 'eu'
      ? 'https://support.apple.com/eu-es/guide/safari/sfri11471/mac'
      : 'https://support.apple.com/es-es/guide/safari/sfri11471/mac',
    edge: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
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
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700 md:text-xs">
                  <Cookie className="h-4 w-4" />
                  Consentimiento y medición
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
                  <Link href="/privacidad" className="interactive-tile flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-4 text-slate-700">
                    <span>Política de Privacidad</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
          <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 shadow-[var(--shadow-soft)] md:p-8">
            <p className="text-slate-700 leading-relaxed">
              {t.intro}
            </p>
          </div>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.que.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.que.content}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.tipos.title}</h2>
            
            <div className="space-y-6">
              <div className="interactive-tile bg-white border-l-4 border-green-500 rounded-[1.25rem] p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.sections.tipos.tecnicas.badge}</h3>
                <p className="text-slate-700 text-sm mb-3">
                  {t.sections.tipos.tecnicas.description}
                </p>
                <p className="text-xs text-slate-500 italic">
                  {t.sections.tipos.tecnicas.noConsent}
                </p>
                <div className="mt-3 bg-slate-50 rounded p-3">
                  <p className="text-xs font-mono text-slate-600">
                    {t.sections.tipos.tecnicas.example}
                  </p>
                </div>
              </div>

              <div className="interactive-tile bg-white border-l-4 border-blue-500 rounded-[1.25rem] p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.sections.tipos.analiticas.badge}</h3>
                <p className="text-slate-700 text-sm mb-3">
                  {t.sections.tipos.analiticas.description}
                </p>
                <p className="text-xs text-red-600 font-semibold mb-2">
                  {t.sections.tipos.analiticas.consent}
                </p>
                <div className="mt-3 bg-slate-50 rounded p-3 space-y-1">
                  <p className="text-xs font-semibold text-slate-700">{t.sections.tipos.analiticas.providers}</p>
                  {t.sections.tipos.analiticas.list.map((provider: string, i: number) => (
                    <p key={i} className="text-xs font-mono text-slate-600">• {provider}</p>
                  ))}
                </div>
              </div>

              <div className="interactive-tile bg-white border-l-4 border-purple-500 rounded-[1.25rem] p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.sections.tipos.terceros.badge}</h3>
                <p className="text-slate-700 text-sm mb-3">
                  {t.sections.tipos.terceros.description}
                </p>
                <p className="text-xs text-red-600 font-semibold mb-2">
                  {t.sections.tipos.terceros.consent}
                </p>
                <div className="mt-3 space-y-2">
                  {t.sections.tipos.terceros.providers.map((provider: { name: string; description: string }, i: number) => (
                    <div key={i} className="interactive-tile bg-slate-50 rounded-[1rem] p-3">
                      <p className="text-xs font-semibold text-slate-700">{provider.name}</p>
                      <p className="text-xs text-slate-600">{provider.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.configuracion.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.configuracion.intro}
            </p>
            <div className="bg-white border border-slate-200 rounded-[1.25rem] p-4">
              <ul className="space-y-2 text-slate-700">
                {t.sections.configuracion.options.map((option: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={i === 0 ? 'text-green-600' : i === 1 ? 'text-red-600' : 'text-blue-600'}>
                      {i === 0 ? '✓' : i === 1 ? '✗' : '⚙'}
                    </span>
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              {t.sections.configuracion.footer}
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.desactivar.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.desactivar.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <a 
                href={browserUrls.chrome} 
                target="_blank" 
                rel="noopener noreferrer"
                className="interactive-tile bg-white border border-slate-200 rounded-[1.25rem] p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[0].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[0].text}</p>
              </a>
              <a 
                href={browserUrls.firefox} 
                target="_blank" 
                rel="noopener noreferrer"
                className="interactive-tile bg-white border border-slate-200 rounded-[1.25rem] p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[1].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[1].text}</p>
              </a>
              <a 
                href={browserUrls.safari} 
                target="_blank" 
                rel="noopener noreferrer"
                className="interactive-tile bg-white border border-slate-200 rounded-[1.25rem] p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[2].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[2].text}</p>
              </a>
              <a 
                href={browserUrls.edge} 
                target="_blank" 
                rel="noopener noreferrer"
                className="interactive-tile bg-white border border-slate-200 rounded-[1.25rem] p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[3].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[3].text}</p>
              </a>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.detalle.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-2 text-left">{t.sections.detalle.headers.cookie}</th>
                    <th className="border border-slate-300 p-2 text-left">{t.sections.detalle.headers.proveedor}</th>
                    <th className="border border-slate-300 p-2 text-left">{t.sections.detalle.headers.finalidad}</th>
                    <th className="border border-slate-300 p-2 text-left">{t.sections.detalle.headers.duracion}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.sections.detalle.cookies.map((cookie: { name: string; provider: string; purpose: string; duration: string }, i: number) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-slate-50'}>
                      <td className="border border-slate-300 p-2 font-mono text-xs">{cookie.name}</td>
                      <td className="border border-slate-300 p-2">{cookie.provider}</td>
                      <td className="border border-slate-300 p-2">{cookie.purpose}</td>
                      <td className="border border-slate-300 p-2">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.cambios.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.cambios.content}
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-[1.75rem] p-5">
            <p className="text-sm text-slate-700">
              <strong>{t.sections.contacto.label}</strong> {t.sections.contacto.text}{' '}
              <a href="mailto:info@vision360ia.com" className="text-primary hover:underline font-medium">
                info@vision360ia.com
              </a>
            </p>
          </div>

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
