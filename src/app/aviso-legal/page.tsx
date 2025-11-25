'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { legalTranslations } from '@/lib/legal-translations';

export default function AvisoLegal() {
  const { language } = useLanguage();
  const lang = language as keyof typeof legalTranslations;
  const t = legalTranslations[lang]?.avisoLegal || legalTranslations.es.avisoLegal;
  const common = legalTranslations[lang] || legalTranslations.es;
  
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Objeto del sitio web</h2>
            <p className="text-slate-700 leading-relaxed">
              El presente sitio web tiene como finalidad ofrecer información sobre los productos y servicios tecnológicos de 
              WINFIN INSTALACIONES, S.L., incluyendo soluciones embarcadas, IoT, sistemas de visión, análisis de afluencias, 
              mantenimiento de equipos y cualquier otra actividad descrita en la plataforma.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Condiciones de uso</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              El usuario se compromete a utilizar este sitio web de forma lícita y conforme a la legislación aplicable, 
              sin realizar actividades que puedan dañar, inutilizar o afectar al funcionamiento del mismo.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Queda prohibido:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Introducir malware, scripts maliciosos o cualquier tecnología que comprometa la seguridad.</li>
                <li>• Copiar o reproducir contenidos sin autorización expresa.</li>
                <li>• Usar la web con fines fraudulentos.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Propiedad intelectual e industrial</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Todos los contenidos del sitio web (textos, imágenes, logotipos, vídeos, software, diseño, etc.) son propiedad 
              exclusiva de WINFIN INSTALACIONES, S.L. o de terceros que han autorizado su uso.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Queda prohibida la reproducción total o parcial sin autorización previa y por escrito.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Responsabilidad del titular</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              WINFIN INSTALACIONES, S.L. no será responsable de:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4">
              <li>• Fallos técnicos o interrupciones del servicio.</li>
              <li>• Daños derivados del uso incorrecto de la web.</li>
              <li>• Contenido de terceros o enlaces externos.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              El titular se reserva el derecho a modificar la información o estructura de la web sin previo aviso.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Política de enlaces externos</h2>
            <p className="text-slate-700 leading-relaxed">
              Este sitio puede contener enlaces a webs de terceros. WINFIN INSTALACIONES, S.L. no se hace responsable de 
              los contenidos, políticas o prácticas de dichos sitios.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Protección de datos personales</h2>
            <p className="text-slate-700 leading-relaxed">
              El tratamiento de los datos personales se regula en la{' '}
              <Link href="/privacidad" className="text-primary hover:underline font-medium">
                Política de Privacidad
              </Link>
              , incorporada en este sitio web.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Legislación aplicable y jurisdicción</h2>
            <p className="text-slate-700 leading-relaxed">
              Este Aviso Legal se rige por la legislación española. Cualquier conflicto será resuelto en los Juzgados y 
              Tribunales de Madrid (España), salvo que la normativa disponga lo contrario.
            </p>
          </section>

          <div className="border-t border-slate-200 pt-6 mt-12">
            <p className="text-sm text-slate-500">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
