/**
 * Datos de contacto comercial centralizados.
 *
 * Línea móvil dedicada a captación de leads (llamadas y WhatsApp).
 * Desde el 18/09/2026 WhatsApp es un canal secundario discreto (solo texto en
 * el footer y en el bloque CTA de las landings): traía pocos leads y de
 * autónomos. El protagonismo lo tiene "Contacta con nosotros" → formulario.
 * El fijo 914 520 406 se retiró de la web el 05/07/2026 (decisión del
 * usuario: a fijos no llama nadie). Si cambia el número, editar SOLO este
 * archivo y los teléfonos de structured-data.ts.
 */
export const LEAD_PHONE_DISPLAY = '649 567 837';
export const LEAD_PHONE_INTL_DISPLAY = '+34 649 567 837';
export const LEAD_PHONE_HREF = 'tel:+34649567837';

const WHATSAPP_NUMBER = '34649567837';

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensaje precargado del chat. El `topic` (nombre de la landing) da
 * atribución dentro del propio WhatsApp: se sabe de qué página viene el
 * lead sin preguntar.
 */
export function whatsappLeadMessage(topic?: string): string {
  return topic
    ? `Hola, acabo de ver vuestra página «${topic}» y me interesa para mi flota. ¿Me dais más información?`
    : 'Hola, acabo de ver vuestra web vision360ia.com y me interesa el sistema para mi flota. ¿Me dais más información?';
}

/**
 * Tamaño de flota: campo de cualificación de los dos formularios (slideover y
 * formulario corto de campaña). "1 vehículo" va aparte para distinguir a los
 * autónomos de los gestores de flota. Viaja dentro de `message` (el endpoint
 * PHP no tiene campo propio).
 */
export const FLEET_SIZE_OPTIONS = [
  '1 vehículo',
  '2–10 vehículos',
  '11–50 vehículos',
  '51–200 vehículos',
  'Más de 200 vehículos',
] as const;
