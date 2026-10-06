/**
 * "¿Qué te interesa?": primera pregunta del formulario. Indica en qué punto de
 * compra está cada lead y adapta el botón de envío y el mensaje final.
 */
export const INTERESTS = [
  {
    value: "demo",
    label: "Ver una demo en vivo",
    submit: "QUIERO VER UNA DEMO",
    successEnding: "para organizar la demo en tu cochera o base.",
  },
  {
    value: "piloto",
    label: "Probarlo en un vehículo propio",
    submit: "QUIERO HACER UN PILOTO",
    successEnding: "para preparar el piloto en uno de tus vehículos.",
  },
  {
    value: "implantacion",
    label: "Hablar de equipar mi flota",
    submit: "HABLAR DE MI FLOTA",
    successEnding: "para hablar de cómo equipar tu flota.",
  },
] as const;

export type Interest = (typeof INTERESTS)[number]["value"];

export const INTEREST_VALUES = INTERESTS.map((i) => i.value) as [Interest, ...Interest[]];

export const DEFAULT_INTEREST: Interest = "demo";

export function interestInfo(value: Interest | undefined) {
  return INTERESTS.find((i) => i.value === value) ?? INTERESTS[0];
}

/** Los CTA de la página preseleccionan el interés al llevar al formulario. */
export const SELECT_INTEREST_EVENT = "ef:select-interest";

/** Anclas del formulario principal (las usan los CTA de la página). */
export const FORM_ANCHOR_ID = "evaluacion";
export const FIRST_FIELD_ID = "ef-company";
