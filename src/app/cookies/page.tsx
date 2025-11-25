'use client';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { legalTranslations } from '@/lib/legal-translations';

export default function Cookies() {
  const { language } = useLanguage();
  const lang = language as keyof typeof legalTranslations;
  const t = legalTranslations[lang]?.cookies || legalTranslations.es.cookies;
  const common = legalTranslations[lang] || legalTranslations.es;

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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Cookie className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-0">{t.title}</h1>
            </div>
          </div>
          <p className="text-lg text-slate-600 mb-8">{t.subtitle}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <p className="text-slate-700 leading-relaxed">
              {t.intro}
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.que.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.que.content}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.tipos.title}</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-5">
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

              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.sections.tipos.analiticas.badge}</h3>
                <p className="text-slate-700 text-sm mb-3">
                  {t.sections.tipos.analiticas.description}
                </p>
                <p className="text-xs text-red-600 font-semibold mb-2">
                  {t.sections.tipos.analiticas.consent}
                </p>
                <div className="mt-3 bg-slate-50 rounded p-3 space-y-1">
                  <p className="text-xs font-semibold text-slate-700">{t.sections.tipos.analiticas.providers}</p>
                  {t.sections.tipos.analiticas.list.map((provider, i) => (
                    <p key={i} className="text-xs font-mono text-slate-600">• {provider}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.sections.tipos.terceros.badge}</h3>
                <p className="text-slate-700 text-sm mb-3">
                  {t.sections.tipos.terceros.description}
                </p>
                <p className="text-xs text-red-600 font-semibold mb-2">
                  {t.sections.tipos.terceros.consent}
                </p>
                <div className="mt-3 space-y-2">
                  {t.sections.tipos.terceros.providers.map((provider, i) => (
                    <div key={i} className="bg-slate-50 rounded p-3">
                      <p className="text-xs font-semibold text-slate-700">{provider.name}</p>
                      <p className="text-xs text-slate-600">{provider.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.configuracion.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.configuracion.intro}
            </p>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <ul className="space-y-2 text-slate-700">
                {t.sections.configuracion.options.map((option, i) => (
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

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.desactivar.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.desactivar.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <a 
                href={browserUrls.chrome} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[0].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[0].text}</p>
              </a>
              <a 
                href={browserUrls.firefox} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[1].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[1].text}</p>
              </a>
              <a 
                href={browserUrls.safari} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[2].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[2].text}</p>
              </a>
              <a 
                href={browserUrls.edge} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">{t.sections.desactivar.browsers[3].name}</p>
                <p className="text-xs text-slate-600">{t.sections.desactivar.browsers[3].text}</p>
              </a>
            </div>
          </section>

          <section className="mb-10">
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
                  {t.sections.detalle.cookies.map((cookie, i) => (
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

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.cambios.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.cambios.content}
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
            <p className="text-sm text-slate-700">
              <strong>{t.sections.contacto.label}</strong> {t.sections.contacto.text}{' '}
              <a href="mailto:info@vision360ia.com" className="text-primary hover:underline font-medium">
                info@vision360ia.com
              </a>
            </p>
          </div>

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
