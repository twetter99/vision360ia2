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
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-0">{t.title}</h1>
            </div>
          </div>
          <p className="text-lg text-slate-600 mb-8">{t.subtitle}</p>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">{t.titular.title}</h2>
            <div className="space-y-2 text-slate-700">
              <p><strong>{language === 'ca' ? 'Raó social:' : language === 'eu' ? 'Sozietate izena:' : 'Razón social:'}</strong> {t.titular.company}</p>
              <p><strong>CIF:</strong> {t.titular.cif}</p>
              <p><strong>{language === 'ca' ? 'Domicili:' : language === 'eu' ? 'Helbidea:' : 'Domicilio:'}</strong> {t.titular.address}</p>
              <p><strong>Email:</strong> <a href={`mailto:${t.titular.email}`} className="text-primary hover:underline">{t.titular.email}</a></p>
            </div>
          </div>

          <section className="mb-10">
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

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">{t.sections.finalidades.title}</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">{t.sections.finalidades.intro}</p>
            <ul className="space-y-2 text-slate-700">
              {t.sections.finalidades.items.map((item, i) => (
                <li key={i}>✓ {item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.baseLegal.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">{t.sections.baseLegal.intro}</p>
            <div className="space-y-3">
              {t.sections.baseLegal.items.map((item, i) => (
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

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.conservacion.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.conservacion.intro}
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              {t.sections.conservacion.items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.comunicacion.title}</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              {t.sections.comunicacion.intro}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <ul className="space-y-1 text-slate-700 text-sm">
                {t.sections.comunicacion.providers.map((provider, i) => (
                  <li key={i}>• {provider}</li>
                ))}
              </ul>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              {t.sections.comunicacion.footer}{' '}
              <strong>{t.sections.comunicacion.noSale}</strong>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.transferencias.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.transferencias.intro}
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              {t.sections.transferencias.items.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
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
              {t.sections.derechos.rights.map((right, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
                  <p className="font-semibold text-slate-900 text-sm">✓ {right.title}</p>
                  <p className="text-xs text-slate-600">{right.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-slate-700">
                <strong>{t.sections.derechos.authority.label}</strong> {t.sections.derechos.authority.text}{' '}
                <a href="https://www.aepd.es" target="_blank" rel="noopener" className="text-primary hover:underline">
                  {t.sections.derechos.authority.linkText}
                </a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.sections.seguridad.title}</h2>
            <p className="text-slate-700 leading-relaxed">
              {t.sections.seguridad.content}
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
