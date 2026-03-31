'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'vision360ia-cookie-consent';
const COOKIE_CONSENT_VERSION = '1.0'; // Incrementar si cambia la política

type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'custom';

interface CookiePreferences {
  necessary: boolean; // Siempre true, no se puede desactivar
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: COOKIE_CONSENT_VERSION,
  timestamp: '',
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Verificar si ya existe consentimiento
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (stored) {
      try {
        const parsed: CookiePreferences = JSON.parse(stored);
        // Verificar si la versión coincide
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setPreferences(parsed);
          return; // No mostrar banner
        }
      } catch {
        // Si hay error, mostrar banner
      }
    }
    
    // Mostrar banner con pequeño delay para mejor UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    const finalPrefs = {
      ...prefs,
      necessary: true, // Siempre activas
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalPrefs));
    setPreferences(finalPrefs);
    setIsVisible(false);
    
    // Disparar evento para que otros componentes reaccionen
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: finalPrefs }));
  };

  const handleAcceptAll = () => {
    saveConsent({
      ...defaultPreferences,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      ...defaultPreferences,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-[9999] p-4 md:bottom-4"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[22px] border border-white/16 bg-slate-950/68 p-3 shadow-[0_20px_70px_rgba(15,23,42,0.46)] backdrop-blur-xl md:p-4">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.84),rgba(15,23,42,0.72)_42%,rgba(30,41,59,0.62))]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.12),transparent_26%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[21px] border border-white/8" />
          <div className="pointer-events-none absolute inset-[10px] rounded-[18px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%)]" />

          <div className="relative z-10 flex flex-col gap-2.5 md:grid md:grid-cols-[minmax(0,1.4fr)_auto] md:items-center md:gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/96 text-primary shadow-[0_6px_18px_rgba(96,165,250,0.24)] ring-1 ring-white/30 md:h-7 md:w-7">
                  <Cookie className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <h2 id="cookie-banner-title" className="font-headline text-sm font-semibold text-white md:text-lg">
                    Preferencias de privacidad
                  </h2>
                </div>
              </div>

              <div className="mt-1.5 space-y-1.5 md:mt-2 md:space-y-2">
                <p id="cookie-banner-description" className="max-w-3xl text-xs leading-5 text-white/95 md:text-[15px] md:leading-6">
                  Utilizamos cookies tecnicas para garantizar el funcionamiento del sitio. Con su consentimiento, activamos analitica y medicion para optimizar rendimiento, contenidos y experiencia.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm">
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="font-semibold text-white underline decoration-white/45 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {showDetails ? 'Ocultar configuracion' : 'Configurar'}
                  </button>
                  <Link 
                    href="/cookies" 
                    className="font-medium text-slate-100 underline-offset-4 hover:text-white hover:underline"
                  >
                    Politica de cookies
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:min-w-[360px] md:max-w-[420px] md:items-stretch">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectNonEssential}
                  className="h-10 justify-center border-white/14 bg-white/[0.04] px-2 text-xs text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/22 hover:bg-white/[0.08] hover:text-white md:h-9 md:text-sm"
                >
                  Solo necesarias
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="h-10 justify-center bg-[linear-gradient(180deg,rgba(59,130,246,1),rgba(37,99,235,0.96))] px-2 text-xs shadow-[0_10px_28px_rgba(37,99,235,0.32)] hover:bg-[linear-gradient(180deg,rgba(96,165,250,1),rgba(37,99,235,1))] md:h-9 md:px-4 md:text-sm"
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-3 rounded-2xl border border-slate-700 bg-slate-900/90 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Necesarias</p>
                      <p className="mt-1 text-xs leading-5 text-slate-200">Mantienen la navegacion, la seguridad y el envio de formularios.</p>
                    </div>
                    <div className="flex h-6 w-11 shrink-0 items-center rounded-full bg-primary px-1">
                      <div className="h-4 w-4 translate-x-5 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Analiticas</p>
                      <p className="mt-1 text-xs leading-5 text-slate-200">Permiten evaluar uso, contenidos y rendimiento del sitio.</p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-1 transition-colors ${
                        preferences.analytics ? 'bg-primary' : 'bg-slate-300'
                      }`}
                      aria-label={preferences.analytics ? 'Desactivar cookies analíticas' : 'Activar cookies analíticas'}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Marketing</p>
                      <p className="mt-1 text-xs leading-5 text-slate-200">Ayudan a medir campanas y priorizar mensajes mas relevantes.</p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-1 transition-colors ${
                        preferences.marketing ? 'bg-primary' : 'bg-slate-300'
                      }`}
                      aria-label={preferences.marketing ? 'Desactivar cookies de marketing' : 'Activar cookies de marketing'}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="justify-center border-slate-600 bg-slate-900 text-white hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePreferences}
                  className="justify-center px-4"
                >
                  Guardar preferencias
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Hook para verificar consentimiento desde otros componentes
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        try {
          setConsent(JSON.parse(stored));
        } catch {
          setConsent(null);
        }
      }
    };

    checkConsent();

    // Escuchar cambios
    const handleUpdate = (e: CustomEvent<CookiePreferences>) => {
      setConsent(e.detail);
    };

    window.addEventListener('cookieConsentUpdated', handleUpdate as EventListener);
    return () => window.removeEventListener('cookieConsentUpdated', handleUpdate as EventListener);
  }, []);

  return {
    consent,
    hasConsent: consent !== null,
    analyticsAllowed: consent?.analytics ?? false,
    marketingAllowed: consent?.marketing ?? false,
  };
}
