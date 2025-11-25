'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, X, Settings2 } from 'lucide-react';

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
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-border/50 bg-background/95 p-4 shadow-2xl backdrop-blur-xl md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 id="cookie-banner-title" className="font-headline text-base font-semibold text-foreground md:text-lg">
                  Uso de cookies
                </h2>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-3">
            <p id="cookie-banner-description" className="text-sm text-muted-foreground md:text-base">
              Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrar contenido personalizado. 
              Puedes aceptar todas, rechazar las no esenciales o{' '}
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                configurar tus preferencias
              </button>.{' '}
              <Link 
                href="/cookies" 
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                Más información
              </Link>
            </p>
          </div>

          {/* Detailed preferences */}
          {showDetails && (
            <div className="mt-4 space-y-3 rounded-xl border border-border/50 bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Cookies necesarias</p>
                  <p className="text-xs text-muted-foreground">Esenciales para el funcionamiento del sitio</p>
                </div>
                <div className="flex h-6 w-11 items-center rounded-full bg-primary px-1">
                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Cookies analíticas</p>
                  <p className="text-xs text-muted-foreground">Nos ayudan a entender cómo usas el sitio</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${
                    preferences.analytics ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={preferences.analytics ? 'Desactivar cookies analíticas' : 'Activar cookies analíticas'}
                >
                  <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Cookies de marketing</p>
                  <p className="text-xs text-muted-foreground">Permiten mostrarte contenido relevante</p>
                </div>
                <button
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${
                    preferences.marketing ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  aria-label={preferences.marketing ? 'Desactivar cookies de marketing' : 'Activar cookies de marketing'}
                >
                  <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            {showDetails ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="order-2 sm:order-1"
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePreferences}
                  className="order-1 sm:order-2"
                >
                  Guardar preferencias
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRejectNonEssential}
                  className="order-3 text-muted-foreground hover:text-foreground sm:order-1"
                >
                  Solo esenciales
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                  className="order-2"
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="order-1 sm:order-3"
                >
                  Aceptar todas
                </Button>
              </>
            )}
          </div>
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
