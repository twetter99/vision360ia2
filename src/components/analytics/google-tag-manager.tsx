'use client';

import Script from 'next/script';
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_VERSION,
  CONSENT_UPDATED_EVENT,
} from '@/lib/consent';

const GTM_ID = 'GTM-NNR2F4HG';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Google Tag Manager + Consent Mode v2.
 * Debe colocarse en <head> o justo después de <body>.
 * GA4 (G-EH61TW7769) se configura dentro de GTM, no aquí.
 *
 * Orden crítico dentro del script (todo en uno para garantizarlo):
 *   1. gtag('consent', 'default', denied) — ANTES de cargar gtm.js.
 *   2. Si hay decisión previa en localStorage → gtag('consent', 'update').
 *   3. Listener del evento del banner → update en cuanto el usuario decide.
 *   4. Loader de GTM (los tags de Google funcionan en modo cookieless
 *      mientras el consentimiento siga denegado).
 */
export function GoogleTagManager() {
  if (!isProduction) {
    return null;
  }

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);

          function v360ApplyConsent(prefs) {
            if (!prefs || prefs.version !== '${COOKIE_CONSENT_VERSION}') return;
            var marketing = prefs.marketing === true;
            gtag('consent', 'update', {
              ad_storage: marketing ? 'granted' : 'denied',
              ad_user_data: marketing ? 'granted' : 'denied',
              ad_personalization: marketing ? 'granted' : 'denied',
              analytics_storage: prefs.analytics === true ? 'granted' : 'denied'
            });
            gtag('set', 'ads_data_redaction', !marketing);
          }

          try {
            v360ApplyConsent(JSON.parse(localStorage.getItem('${COOKIE_CONSENT_KEY}') || 'null'));
          } catch (e) {}

          window.addEventListener('${CONSENT_UPDATED_EVENT}', function (e) {
            v360ApplyConsent(e.detail);
          });

          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }}
    />
  );
}

/**
 * Google Tag Manager - Noscript fallback
 * Debe colocarse inmediatamente después de <body>
 */
export function GoogleTagManagerNoscript() {
  if (!isProduction) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
