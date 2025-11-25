import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Vision360IA',
  description: 'Política de privacidad y protección de datos de Vision360IA conforme al RGPD',
  robots: 'noindex, nofollow',
};

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <article className="prose prose-slate max-w-none">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-0">Política de Privacidad</h1>
            </div>
          </div>
          <p className="text-lg text-slate-600 mb-8">
            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD)
          </p>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Responsable del tratamiento</h2>
            <div className="space-y-2 text-slate-700">
              <p><strong>Razón social:</strong> WINFIN INSTALACIONES, S.L.</p>
              <p><strong>CIF:</strong> B05393632</p>
              <p><strong>Domicilio:</strong> C/ Moreras, 1 N 66, 28350 Ciempozuelos (Madrid), España</p>
              <p><strong>Email:</strong> <a href="mailto:info@vision360ia.com" className="text-primary hover:underline">info@vision360ia.com</a></p>
            </div>
          </div>

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">1. Datos que recopilamos</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Según el uso del sitio, podemos recopilar:
            </p>
            <div className="grid gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">📝 Datos de formulario</p>
                <p className="text-sm text-slate-700">Nombre, email, empresa, teléfono, cargo, información sobre flota.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">💻 Datos técnicos</p>
                <p className="text-sm text-slate-700">Dirección IP, navegador, dispositivo, idioma, ubicación aproximada.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">📊 Datos de navegación</p>
                <p className="text-sm text-slate-700">Páginas visitadas, tiempo de sesión, interacciones con el contenido.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">🔗 Servicios de terceros</p>
                <p className="text-sm text-slate-700">Datos derivados del uso de Vimeo, Google Analytics, Firebase, Vercel.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">2. Finalidades del tratamiento</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">Los datos se utilizan para:</p>
            <ul className="space-y-2 text-slate-700">
              <li>✓ Gestionar consultas o solicitudes recibidas a través del formulario de contacto</li>
              <li>✓ Comunicaciones comerciales relacionadas con nuestros servicios (solo con consentimiento)</li>
              <li>✓ Analítica, medición y mejora del rendimiento de la web</li>
              <li>✓ Seguridad del sitio y prevención del fraude</li>
              <li>✓ Gestión de relaciones contractuales o precontractuales</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Base legal</h2>
            <p className="text-slate-700 leading-relaxed mb-4">Dependiendo del tratamiento:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-slate-900">Consentimiento del usuario</p>
                  <p className="text-sm text-slate-600">Formularios, newsletter, cookies analíticas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-slate-900">Interés legítimo</p>
                  <p className="text-sm text-slate-600">Seguridad del sitio, analítica técnica básica</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-slate-900">Ejecución de un contrato</p>
                  <p className="text-sm text-slate-600">Prestación de servicios profesionales</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-slate-900">Cumplimiento de obligaciones legales</p>
                  <p className="text-sm text-slate-600">Facturación, contabilidad, conservación fiscal</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Conservación de los datos</h2>
            <p className="text-slate-700 leading-relaxed">
              Los datos se conservarán:
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              <li>• Mientras exista relación comercial o contractual</li>
              <li>• Mientras no se solicite su supresión</li>
              <li>• Según los plazos legales aplicables (facturación, obligaciones contables, etc.)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Comunicación de datos a terceros</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Los datos pueden ser compartidos con proveedores tecnológicos utilizados por WINFIN INSTALACIONES, S.L.:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <ul className="space-y-1 text-slate-700 text-sm">
                <li>• Google Analytics / Google Cloud / Firebase</li>
                <li>• Vercel (hosting y analítica)</li>
                <li>• Vimeo (reproducción de vídeos)</li>
                <li>• Servicios de email y almacenamiento</li>
              </ul>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              Todos ellos cumplen con garantías adecuadas conforme al RGPD.{' '}
              <strong>No se venden datos a terceros bajo ningún concepto.</strong>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Transferencias internacionales</h2>
            <p className="text-slate-700 leading-relaxed">
              Cuando algunos proveedores estén fuera de la UE, se garantiza el cumplimiento del RGPD mediante:
            </p>
            <ul className="space-y-2 text-slate-700 mt-4">
              <li>• Cláusulas contractuales tipo (SCC)</li>
              <li>• Medidas técnicas adicionales de seguridad y cifrado</li>
            </ul>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-slate-900 mb-0">7. Derechos del usuario</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              Puede ejercer los siguientes derechos mediante email a{' '}
              <a href="mailto:info@vision360ia.com" className="text-primary hover:underline font-medium">
                info@vision360ia.com
              </a>
              , acreditando su identidad:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900 text-sm">✓ Derecho de acceso</p>
                <p className="text-xs text-slate-600">Conocer qué datos tenemos sobre usted</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900 text-sm">✓ Derecho de rectificación</p>
                <p className="text-xs text-slate-600">Corregir datos inexactos o incompletos</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900 text-sm">✓ Derecho de supresión</p>
                <p className="text-xs text-slate-600">Solicitar la eliminación de sus datos</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900 text-sm">✓ Derecho de oposición</p>
                <p className="text-xs text-slate-600">Oponerse al tratamiento de sus datos</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900 text-sm">✓ Derecho de limitación</p>
                <p className="text-xs text-slate-600">Limitar el tratamiento en ciertos casos</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <p className="font-semibold text-slate-900 text-sm">✓ Derecho de portabilidad</p>
                <p className="text-xs text-slate-600">Recibir sus datos en formato estructurado</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-slate-700">
                <strong>Autoridad de control:</strong> También tiene derecho a reclamar ante la{' '}
                <a href="https://www.aepd.es" target="_blank" rel="noopener" className="text-primary hover:underline">
                  AEPD (Agencia Española de Protección de Datos)
                </a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Seguridad de los datos</h2>
            <p className="text-slate-700 leading-relaxed">
              WINFIN INSTALACIONES, S.L. aplica medidas técnicas y organizativas para garantizar la confidencialidad, 
              integridad y disponibilidad de los datos personales, incluyendo cifrado, controles de acceso y auditorías periódicas.
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
