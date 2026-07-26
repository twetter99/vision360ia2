/**
 * Eventos de analítica hacia Google Tag Manager (GTM-NNR2F4HG).
 *
 * CONTRATO DE TRACKING (no romper): el evento `form_success` dispara la
 * conversión de Google Ads vía GTM. Debe emitirse SOLO cuando el endpoint PHP
 * responde OK (envío realmente correcto), nunca al hacer clic en el botón.
 */

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
}

/**
 * Clic en un canal de contacto directo (llamada o WhatsApp).
 *
 * A diferencia de `form_success`, aquí SÍ se emite en el clic: en llamadas y
 * WhatsApp no existe un "éxito confirmado" que esperar. Por eso en Google Ads
 * estas conversiones deben configurarse como SECUNDARIAS (form_success sigue
 * siendo la conversión principal que optimiza la puja).
 */
export function pushContactClick(channel: 'phone' | 'whatsapp') {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: channel === 'phone' ? 'phone_click' : 'whatsapp_click',
    contact_source: window.location.pathname,
    lead_source: 'landing_vision360ia',
  });
}
