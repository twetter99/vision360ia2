'use client';

import { useEffect, useState } from 'react';
import { MessageSquareText } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useContactSlideOver } from '@/context/contact-slideover-provider';

/**
 * Botón flotante de contacto.
 *
 * Objetivo: dar un punto de captación de leads SIEMPRE accesible mientras el
 * usuario hace scroll por cualquier página, sin tener que volver al header ni
 * llegar al CTA final. Aparece tras un pequeño scroll (para no competir con el
 * CTA del hero) y se oculta cuando el formulario lateral está abierto.
 *
 * No produce CLS: es position:fixed, queda fuera del flujo del documento.
 */
export function FloatingCta() {
  const { isOpen, openContactSlideOver } = useContactSlideOver();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece a partir de ~600px para no solaparse con el CTA del hero.
      setVisible(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ocultar mientras el slideover está abierto (evita solape con el panel).
  const show = visible && !isOpen;

  return (
    <button
      type="button"
      onClick={openContactSlideOver}
      aria-label="Solicitar información"
      className={cn(
        'fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground shadow-[0_18px_40px_rgba(245,158,11,0.34)] transition-all duration-300 hover:bg-accent/90 sm:bottom-6 sm:right-6',
        'min-h-[52px]',
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-6 opacity-0'
      )}
    >
      <MessageSquareText className="h-5 w-5" />
      <span>Solicitar información</span>
    </button>
  );
}
