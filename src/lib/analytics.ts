/**
 * Eventos de analítica hacia Google Tag Manager (GTM-NNR2F4HG).
 *
 * CONTRATO DE TRACKING (no romper): el evento `form_success` dispara la
 * conversión de Google Ads vía GTM. Debe emitirse SOLO cuando el endpoint PHP
 * responde OK (envío realmente correcto), nunca al hacer clic en el botón.
 */
export function pushFormSuccess(formName: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_success',
    form_name: formName,
    lead_source: 'landing_vision360ia',
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
