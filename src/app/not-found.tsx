import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Ilustración 404 */}
        <div className="relative mb-8">
          <div className="text-[180px] font-bold text-slate-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl">
              <Search className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
        
        {/* Mensaje */}
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
          Puede que el enlace esté desactualizado.
        </p>
        
        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              Ir al inicio
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/#contact">
              <ArrowLeft className="w-5 h-5" />
              Contactar
            </Link>
          </Button>
        </div>
        
        {/* Enlaces útiles */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">Enlaces útiles:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-blue-600 hover:underline">
              Inicio
            </Link>
            <Link href="/#productos" className="text-blue-600 hover:underline">
              Productos
            </Link>
            <Link href="/#faq" className="text-blue-600 hover:underline">
              FAQs
            </Link>
            <Link href="/aviso-legal" className="text-blue-600 hover:underline">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
