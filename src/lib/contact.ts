/**
 * Cualificación compartida por los dos formularios: proyectos para empresas
 * con flotas de al menos 5 vehículos. El rango se envía como fleetSize y se
 * incluye también en el mensaje que recibe el equipo.
 */
export const FLEET_SIZE_OPTIONS = [
  '5–10 vehículos',
  '11–50 vehículos',
  '51–200 vehículos',
  'Más de 200 vehículos',
] as const;
