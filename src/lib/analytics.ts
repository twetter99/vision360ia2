/**
 * Eventos de analítica hacia Google Tag Manager (GTM-NNR2F4HG).
 *
 * CONTRATO DE TRACKING (no romper): el evento `form_success` dispara la
 * conversión de Google Ads vía GTM. Debe emitirse SOLO cuando el endpoint PHP
 * responde OK (envío realmente correcto), nunca al hacer clic en el botón.
 *
 * Los mismos momentos se notifican al píxel de OpenAI Ads (anuncios en
 * ChatGPT), que solo existe en la página si hay consentimiento de marketing
 * (ver components/analytics/openai-pixel.tsx). `lead_created` es la conversión
 * de solicitud de evaluación de flota confirmada.
 */

/**
 * Llama al píxel de OpenAI si está cargado. Nunca lanza: un fallo de un script
 * de terceros no puede romper el envío de un formulario.
 */
function measureOpenAI(...args: unknown[]) {
  try {
    window.oaiq?.('measure', ...args);
  } catch {
    // sin píxel o con el píxel roto, el lead sigue su curso
  }
}

export interface LeadUserData {
  email?: string;
  phone?: string;
}

/**
 * Normaliza un teléfono español a E.164 (+34XXXXXXXXX), el formato que las
 * conversiones mejoradas de Google esperan. Si no puede normalizar con
 * confianza, devuelve undefined: mejor no enviar nada que enviar basura.
 */
function toE164Spain(phone?: string): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+') && cleaned.length >= 9) return cleaned;
  if (cleaned.startsWith('00') && cleaned.length >= 11) return `+${cleaned.slice(2)}`;
  if (/^[6789]\d{8}$/.test(cleaned)) return `+34${cleaned}`;
  return undefined;
}

/**
 * `userData` alimenta las conversiones mejoradas de Google Ads: GTM lee
 * `user_data.email` / `user_data.phone_number` con la variable "Datos
 * proporcionados por el usuario" y los envía hasheados (SHA-256) a Google.
 * Solo se emite tras un envío de formulario correcto, nunca antes.
 */
export function pushFormSuccess(formName: string, userData?: LeadUserData) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const email = userData?.email?.trim().toLowerCase() || undefined;
  const phoneNumber = toE164Spain(userData?.phone);
  window.dataLayer.push({
    event: 'form_success',
    form_name: formName,
    lead_source: 'landing_vision360ia',
    ...(email || phoneNumber
      ? {
          user_data: {
            ...(email ? { email } : {}),
            ...(phoneNumber ? { phone_number: phoneNumber } : {}),
          },
        }
      : {}),
  });
  measureOpenAI('lead_created', { type: 'customer_action' });
}
