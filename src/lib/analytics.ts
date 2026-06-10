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
