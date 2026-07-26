/**
 * Consentimiento de cookies — fuente única de verdad para la clave de
 * localStorage, la versión y el evento que sincroniza banner ↔ GTM.
 *
 * CONTRATO: el banner (cookie-banner.tsx) guarda las preferencias bajo
 * COOKIE_CONSENT_KEY y emite CONSENT_UPDATED_EVENT al decidir el usuario.
 * El script de GTM (google-tag-manager.tsx) arranca con Consent Mode v2 en
 * "denied", lee localStorage por si hay decisión previa y escucha el evento
 * para emitir gtag('consent', 'update', …). Si cambias el formato de
 * CookiePreferences, revisa ambos lados.
 */
export const COOKIE_CONSENT_KEY = 'vision360ia-cookie-consent';
export const COOKIE_CONSENT_VERSION = '1.0'; // Incrementar si cambia la política
export const CONSENT_UPDATED_EVENT = 'cookieConsentUpdated';

export interface CookiePreferences {
  necessary: boolean; // Siempre true, no se puede desactivar
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
}
