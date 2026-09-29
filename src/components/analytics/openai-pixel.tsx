'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_VERSION,
  CONSENT_UPDATED_EVENT,
} from '@/lib/consent';

// Píxel de medición de OpenAI Ads (anuncios en ChatGPT). El ID es público:
// viaja en el HTML de cualquier web que lo instale.
const OPENAI_PIXEL_ID = '8iZGNPaGbtyEuR1s3NW3Pt';
const OPENAI_SDK_URL = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Píxel de OpenAI Ads, gobernado por el banner de cookies (categoría marketing).
 *
 * A diferencia de GTM (que carga siempre en modo cookieless), este SDK NO se
 * descarga hasta que hay consentimiento de marketing. Motivos, comprobados en
 * el código del SDK (v0.1.41):
 *   - Arranca con consentimiento CONCEDIDO por defecto.
 *   - Con consentimiento denegado sigue enviando eventos de diagnóstico.
 *   - Lleva "automatic advanced matching": lee email/teléfono/nombre de los
 *     formularios y los envía hasheados.
 * Sin consentimiento no hay ni script, ni cookies, ni peticiones a OpenAI.
 *
 * Atribución: el clic del anuncio llega como ?oppref= en la URL de aterrizaje
 * y el SDK solo lo lee de la URL en el momento de arrancar. Si el visitante
 * acepta cookies después de navegar a otra página, el parámetro ya no está.
 * Por eso se guarda en memoria (una variable, nada en disco) y se repone en la
 * URL justo antes de cargar el SDK.
 *
 * Vistas de página: el SDK NO las mide solo (al iniciar solo envía eventos de
 * ciclo de vida). La vista inicial se mide aquí al arrancar el píxel y las
 * navegaciones cliente de Next en <OpenAIPageViews />.
 *
 * Eventos de conversión: ver src/lib/analytics.ts (lead_created).
 */
export function OpenAIPixel() {
  if (!isProduction) {
    return null;
  }

  return (
    <>
      <OpenAIPageViews />
      <Script
        id="openai-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function () {
            var started = false;
            var landingRef = null;
            try {
              landingRef = new URLSearchParams(window.location.search).get('oppref');
            } catch (e) {}

            function restoreClickId() {
              if (!landingRef) return;
              try {
                var url = new URL(window.location.href);
                if (url.searchParams.get('oppref')) return;
                url.searchParams.set('oppref', landingRef);
                window.history.replaceState(null, '', url.toString());
              } catch (e) {}
            }

            function start() {
              if (started) {
                window.oaiq('consent', true);
                return;
              }
              started = true;
              restoreClickId();
              (function (w, d, s, u) {
                if (w.oaiq) return;
                var q = function () { q.q.push(arguments); };
                q.q = [];
                w.oaiq = q;
                var js = d.createElement(s);
                js.async = true;
                js.src = u;
                var f = d.getElementsByTagName(s)[0];
                f.parentNode.insertBefore(js, f);
              })(window, document, 'script', '${OPENAI_SDK_URL}');
              // consent(true) explícito: el SDK persiste su propio estado y un
              // "false" de una visita anterior bloquearía la medición.
              window.oaiq('consent', true);
              window.oaiq('init', { pixelId: '${OPENAI_PIXEL_ID}' });
              window.oaiq('measure', 'page_viewed', {
                type: 'contents',
                contents: [{
                  id: window.location.pathname,
                  name: document.title,
                  content_type: 'page'
                }]
              });
            }

            function stop() {
              if (started) {
                // El SDK borra sus cookies al retirar el consentimiento.
                window.oaiq('consent', false);
                return;
              }
              // SDK no cargado en esta visita: limpiar lo que dejara una
              // aceptación anterior (cookies en el dominio raíz y en el host).
              if (document.cookie.indexOf('__o') === -1) return;
              var names = ['__oppref', '__obref', '__oaiq_consent'];
              var parts = window.location.hostname.split('.');
              for (var n = 0; n < names.length; n++) {
                var base = names[n] + '=; Path=/; Max-Age=0; SameSite=Lax';
                document.cookie = base;
                for (var i = 0; i < parts.length - 1; i++) {
                  document.cookie = base + '; Domain=' + parts.slice(i).join('.');
                }
              }
              try { window.localStorage.removeItem('oaiq_consent'); } catch (e) {}
            }

            function apply(prefs) {
              if (!prefs || prefs.version !== '${COOKIE_CONSENT_VERSION}') return;
              if (prefs.marketing === true) start(); else stop();
            }

            try {
              apply(JSON.parse(localStorage.getItem('${COOKIE_CONSENT_KEY}') || 'null'));
            } catch (e) {}

            window.addEventListener('${CONSENT_UPDATED_EVENT}', function (e) {
              apply(e.detail);
            });
          })();
        `,
        }}
      />
    </>
  );
}

/**
 * Mide las navegaciones cliente (el router de Next no recarga la página, así
 * que el script de arriba solo ve la primera). La vista inicial NO se mide
 * aquí: la envía el script al arrancar el píxel, que puede ocurrir más tarde
 * (cuando el visitante acepta). Si el píxel no está cargado, no hace nada.
 */
function OpenAIPageViews() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Un tick de margen para que Next haya actualizado document.title.
    const timer = window.setTimeout(() => {
      try {
        window.oaiq?.('measure', 'page_viewed', {
          type: 'contents',
          contents: [{ id: pathname, name: document.title, content_type: 'page' }],
        });
      } catch {
        // un fallo del píxel no puede afectar a la navegación
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}
