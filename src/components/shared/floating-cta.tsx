'use client';

import { useEffect, useState } from 'react';
import { MessageSquareText, PlayCircle, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useContactSlideOver } from '@/context/contact-slideover-provider';
import { WhatsAppCtaLink, WhatsAppIcon } from '@/components/shared/contact-channel-links';

/**
 * Clúster flotante de captación, visible al hacer scroll en cualquier página:
 *   - "Escríbenos por WhatsApp" (principal, verde) → canal nº1 de contacto.
 *   - "Por email" (secundario, abre el formulario) → alternativa.
 *   - "Ver demo" (secundario) → abre un modal con los vídeos de demostración,
 *     que son el activo que más convence.
 *
 * El modal reproduce los vídeos desde CUALQUIER página (no depende de que la
 * galería de la home esté en pantalla). Patrón facade: miniatura local +
 * iframe de Vimeo solo al pulsar. dnt=1 (sin cookies de tracking hasta el play).
 *
 * Lista de vídeos espejo de la galería (product-showcase.tsx). Si cambian los
 * vídeos, actualizar ambos.
 */
const DEMO_VIDEOS = [
  { id: '1197096755', title: 'Vision360IA: visión 360° con IA para flotas', thumb: '/images/demo-vision360-1.jpg' },
  { id: '1197096750', title: 'Vision360IA: inteligencia y seguridad en tiempo real', thumb: '/images/demo-vision360-2.jpg' },
  { id: '1197096752', title: 'Vision360IA en conducción real', thumb: '/images/demo-vision360-3.jpg' },
  { id: '1197096749', title: 'Vision360IA analiza el entorno del vehículo en tiempo real', thumb: '/images/demo-vision360-4.jpg' },
  { id: '1197096751', title: 'Vision360IA: visión perimetral 360° con 4 cámaras simultáneas', thumb: '/images/demo-vision360-5.jpg' },
];

export function FloatingCta() {
  const { isOpen, openContactSlideOver } = useContactSlideOver();
  const [visible, setVisible] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquear scroll del body + cerrar con Escape mientras el modal está abierto.
  useEffect(() => {
    if (!videosOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideosOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [videosOpen]);

  const closeVideos = () => {
    setVideosOpen(false);
    setSelected(null);
  };

  // Ocultar el clúster cuando hay un panel abierto (formulario o este modal).
  const showCluster = visible && !isOpen && !videosOpen;

  return (
    <>
      <div
        className={cn(
          'fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5 transition-all duration-300 sm:bottom-6 sm:right-6',
          showCluster ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        )}
      >
        <button
          type="button"
          onClick={() => setVideosOpen(true)}
          aria-label="Ver vídeos de demostración"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition-colors hover:bg-white"
        >
          <PlayCircle className="h-5 w-5 text-primary" />
          <span>Ver demo</span>
        </button>
        <button
          type="button"
          onClick={openContactSlideOver}
          aria-label="Contactar por email"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition-colors hover:bg-white"
        >
          <MessageSquareText className="h-5 w-5 text-primary" />
          <span>Por email</span>
        </button>
        <WhatsAppCtaLink
          className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,211,102,0.34)] transition-colors hover:bg-[#1fb855]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span>Escríbenos por WhatsApp</span>
        </WhatsAppCtaLink>
      </div>

      {videosOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Vídeos de demostración">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeVideos} aria-hidden="true" />
          <div className="relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <p className="font-headline text-base font-semibold text-white md:text-lg">
                Vídeos de demostración · Vision360IA
              </p>
              <button onClick={closeVideos} aria-label="Cerrar" className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {selected ? (
                <div>
                  <button
                    onClick={() => setSelected(null)}
                    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    ← Todos los vídeos
                  </button>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                    <iframe
                      src={`https://player.vimeo.com/video/${selected}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title="Vídeo de demostración Vision360IA"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {DEMO_VIDEOS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelected(v.id)}
                      className="group text-left"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.thumb} alt={v.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                            <PlayCircle className="h-7 w-7" />
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-snug text-white/90">{v.title}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
