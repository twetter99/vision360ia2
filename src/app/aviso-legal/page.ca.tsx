import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Avís Legal | Vision360IA',
  description: 'Avís legal i condicions d\'ús de Vision360IA',
  robots: 'noindex, nofollow',
};

export default function AvisoLegalCA() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tornar a l'inici
        </Link>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Avís Legal</h1>
          <p className="text-lg text-slate-600 mb-8">Condicions d'ús del lloc web</p>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Titular del lloc web</h2>
            <div className="space-y-2 text-slate-700">
              <p><strong>Raó social:</strong> WINFIN INSTALACIONES, S.L.</p>
              <p><strong>CIF:</strong> B05393632</p>
              <p><strong>Domicili:</strong> C/ Moreras, 1 N 66, 28350 Ciempozuelos (Madrid), Espanya</p>
              <p><strong>Email:</strong> <a href="mailto:info@vision360ia.com" className="text-primary hover:underline">info@vision360ia.com</a></p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">
            L'accés i ús d'aquest lloc web atribueix la condició d'usuari i implica l'acceptació plena d'aquest Avís Legal. 
            Si no hi està conforme, ha d'abstenir-se d'utilitzar-lo.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Objecte del lloc web</h2>
            <p className="text-slate-700 leading-relaxed">
              El present lloc web té com a finalitat oferir informació sobre els productes i serveis tecnològics de 
              WINFIN INSTALACIONES, S.L., incloent solucions embarcades, IoT, sistemes de visió, anàlisi d'afluències, 
              manteniment d'equips i qualsevol altra activitat descrita a la plataforma.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Condicions d'ús</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              L'usuari es compromet a utilitzar aquest lloc web de forma lícita i conforme a la legislació aplicable, 
              sense realitzar activitats que puguin danyar, inutilitzar o afectar el funcionament del mateix.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Queda prohibit:</p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• Introduir malware, scripts maliciosos o qualsevol tecnologia que comprometi la seguretat.</li>
                <li>• Copiar o reproduir continguts sense autorització expressa.</li>
                <li>• Usar el web amb fins fraudulents.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Propietat intel·lectual i industrial</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Tots els continguts del lloc web (textos, imatges, logotips, vídeos, programari, disseny, etc.) són propietat 
              exclusiva de WINFIN INSTALACIONES, S.L. o de tercers que han autoritzat el seu ús.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Queda prohibida la reproducció total o parcial sense autorització prèvia i per escrit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Responsabilitat del titular</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              WINFIN INSTALACIONES, S.L. no serà responsable de:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4">
              <li>• Errors tècnics o interrupcions del servei.</li>
              <li>• Danys derivats de l'ús incorrecte del web.</li>
              <li>• Contingut de tercers o enllaços externs.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              El titular es reserva el dret a modificar la informació o estructura del web sense avís previ.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Política d'enllaços externs</h2>
            <p className="text-slate-700 leading-relaxed">
              Aquest lloc pot contenir enllaços a webs de tercers. WINFIN INSTALACIONES, S.L. no es fa responsable dels 
              continguts, polítiques o pràctiques d'aquests llocs.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Protecció de dades personals</h2>
            <p className="text-slate-700 leading-relaxed">
              El tractament de les dades personals es regula a la{' '}
              <Link href="/privacidad" className="text-primary hover:underline font-medium">
                Política de Privacitat
              </Link>
              , incorporada en aquest lloc web.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Legislació aplicable i jurisdicció</h2>
            <p className="text-slate-700 leading-relaxed">
              Aquest Avís Legal es regeix per la legislació espanyola. Qualsevol conflicte serà resolt als Jutjats i 
              Tribunals de Madrid (Espanya), llevat que la normativa disposi el contrari.
            </p>
          </section>

          <div className="border-t border-slate-200 pt-6 mt-12">
            <p className="text-sm text-slate-500">
              Última actualització: {new Date().toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
