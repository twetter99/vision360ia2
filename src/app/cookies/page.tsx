import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Cookies | Vision360IA',
  description: 'Información sobre el uso de cookies en Vision360IA',
  robots: 'noindex, nofollow',
};

export default function Cookies() {
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
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Cookie className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-0">Política de Cookies</h1>
            </div>
          </div>
          <p className="text-lg text-slate-600 mb-8">
            Información sobre el uso de cookies en este sitio web
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <p className="text-slate-700 leading-relaxed">
              Esta web utiliza cookies propias y de terceros para mejorar la experiencia del usuario, realizar mediciones 
              estadísticas, mostrar vídeos y garantizar el funcionamiento correcto de la plataforma.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. ¿Qué son las cookies?</h2>
            <p className="text-slate-700 leading-relaxed">
              Son pequeños archivos de texto que se almacenan en el navegador del usuario cuando visita un sitio web. 
              Permiten reconocer el dispositivo, recordar preferencias, mejorar la navegación y realizar estadísticas de uso.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Tipos de cookies que usamos</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">🟢 Cookies técnicas (obligatorias)</h3>
                <p className="text-slate-700 text-sm mb-3">
                  Necesarias para que la web funcione correctamente. Permiten la navegación básica y el uso de funcionalidades esenciales.
                </p>
                <p className="text-xs text-slate-500 italic">
                  No requieren consentimiento según la normativa vigente.
                </p>
                <div className="mt-3 bg-slate-50 rounded p-3">
                  <p className="text-xs font-mono text-slate-600">
                    Ejemplo: Sesión de usuario, idioma seleccionado, consentimiento de cookies
                  </p>
                </div>
              </div>

              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">🔵 Cookies analíticas</h3>
                <p className="text-slate-700 text-sm mb-3">
                  Permiten medir y analizar el comportamiento de los usuarios para mejorar el sitio web.
                </p>
                <p className="text-xs text-red-600 font-semibold mb-2">
                  ⚠️ Requieren consentimiento previo
                </p>
                <div className="mt-3 bg-slate-50 rounded p-3 space-y-1">
                  <p className="text-xs font-semibold text-slate-700">Proveedores:</p>
                  <p className="text-xs font-mono text-slate-600">• Google Analytics</p>
                  <p className="text-xs font-mono text-slate-600">• Vercel Analytics</p>
                  <p className="text-xs font-mono text-slate-600">• Firebase Analytics</p>
                </div>
              </div>

              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">🟣 Cookies de terceros</h3>
                <p className="text-slate-700 text-sm mb-3">
                  Proveedores externos que integran funcionalidades en nuestro sitio.
                </p>
                <p className="text-xs text-red-600 font-semibold mb-2">
                  ⚠️ Requieren consentimiento previo
                </p>
                <div className="mt-3 space-y-2">
                  <div className="bg-slate-50 rounded p-3">
                    <p className="text-xs font-semibold text-slate-700">Vimeo (reproducción de vídeos)</p>
                    <p className="text-xs text-slate-600">Cookies de reproducción y estadísticas de visionado</p>
                  </div>
                  <div className="bg-slate-50 rounded p-3">
                    <p className="text-xs font-semibold text-slate-700">Google (servicios cloud y analítica)</p>
                    <p className="text-xs text-slate-600">Cookies de rendimiento y medición</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Configuración del consentimiento</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Al acceder por primera vez a este sitio web, se muestra un banner que permite:
            </p>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Aceptar todas las cookies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Rechazar cookies no esenciales</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">⚙</span>
                  <span>Configurar categorías de cookies individualmente</span>
                </li>
              </ul>
            </div>
            <p className="text-slate-700 leading-relaxed mt-4">
              El usuario puede modificar su consentimiento en cualquier momento desde la configuración de cookies 
              disponible en el footer del sitio.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Cómo desactivar cookies desde el navegador</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Puede configurar su navegador para rechazar cookies. Sin embargo, esto puede afectar a la funcionalidad del sitio.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <a 
                href="https://support.google.com/chrome/answer/95647" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">Google Chrome</p>
                <p className="text-xs text-slate-600">Configurar cookies en Chrome →</p>
              </a>
              <a 
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">Mozilla Firefox</p>
                <p className="text-xs text-slate-600">Configurar cookies en Firefox →</p>
              </a>
              <a 
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">Safari</p>
                <p className="text-xs text-slate-600">Configurar cookies en Safari →</p>
              </a>
              <a 
                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors"
              >
                <p className="font-semibold text-slate-900">Microsoft Edge</p>
                <p className="text-xs text-slate-600">Configurar cookies en Edge →</p>
              </a>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Detalle de cookies utilizadas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 p-2 text-left">Cookie</th>
                    <th className="border border-slate-300 p-2 text-left">Proveedor</th>
                    <th className="border border-slate-300 p-2 text-left">Finalidad</th>
                    <th className="border border-slate-300 p-2 text-left">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 p-2 font-mono text-xs">lang</td>
                    <td className="border border-slate-300 p-2">Vision360IA</td>
                    <td className="border border-slate-300 p-2">Idioma seleccionado</td>
                    <td className="border border-slate-300 p-2">1 año</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 p-2 font-mono text-xs">cookie_consent</td>
                    <td className="border border-slate-300 p-2">Vision360IA</td>
                    <td className="border border-slate-300 p-2">Preferencias de cookies</td>
                    <td className="border border-slate-300 p-2">1 año</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-2 font-mono text-xs">_ga</td>
                    <td className="border border-slate-300 p-2">Google Analytics</td>
                    <td className="border border-slate-300 p-2">Identificador de usuario</td>
                    <td className="border border-slate-300 p-2">2 años</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-300 p-2 font-mono text-xs">vuid</td>
                    <td className="border border-slate-300 p-2">Vimeo</td>
                    <td className="border border-slate-300 p-2">Reproducción de vídeos</td>
                    <td className="border border-slate-300 p-2">2 años</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cambios en la política</h2>
            <p className="text-slate-700 leading-relaxed">
              WINFIN INSTALACIONES, S.L. podrá modificar esta Política de Cookies cuando sea necesario para adaptarse 
              a cambios normativos o en los servicios ofrecidos. Recomendamos revisarla periódicamente.
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
            <p className="text-sm text-slate-700">
              <strong>Más información:</strong> Para cualquier duda sobre el uso de cookies, puede contactar con nosotros en{' '}
              <a href="mailto:info@vision360ia.com" className="text-primary hover:underline font-medium">
                info@vision360ia.com
              </a>
            </p>
          </div>

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
