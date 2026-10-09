"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { pushFormSuccess } from "@/lib/analytics";
import { FLEET_SIZE_OPTIONS } from "@/lib/contact";

import { buildAttributionNote, useLandingAttribution } from "./attribution";
import { HomeLink } from "./home-link";
import {
  FIRST_FIELD_ID,
  FORM_ANCHOR_ID,
  DEFAULT_INTEREST,
  INTERESTS,
  INTEREST_VALUES,
  SELECT_INTEREST_EVENT,
  interestInfo,
  type Interest,
} from "./interest";
import { PROVINCES } from "./provinces";
import { getLandingVariant } from "./variants";

/**
 * Formulario de la landing /evaluacion-flota (tráfico de OpenAI/ChatGPT Ads).
 *
 * - Copia adaptada de QuickLeadForm: los formularios existentes no se tocan.
 * - MISMO endpoint PHP (/api/form/contacto.php) y misma cualificación de flota
 *   (FLEET_SIZE_OPTIONS = lista blanca del servidor, flotas desde 5 vehículos).
 * - El PHP no tiene campos de interés, provincia, tipo de vehículo ni origen: viajan dentro
 *   de `message`. `pageUrl` lleva la URL de llegada con UTM y oppref.
 * - Turnstile y honeypots PROPIOS (ids _ef_*), compatibles con el slideover.
 * - Todos los campos están visibles; demo es el interés inicial. Una variante
 *   permitida de utm_content puede preseleccionar otro interés, hasta que el
 *   visitante elija mediante los radios o un CTA.
 * - Medición: `lead_option_select` en cada elección de opción; `lead_form_start` con la primera interacción real (no con un foco puesto por código); `form_success` + `lead_created`
 *   (vía pushFormSuccess) solo si el PHP confirma el envío real. Antes se deja
 *   `lead_interest` en el dataLayer para poder segmentar la conversión en GTM.
 * - El texto de éxito NO contiene "Solicitud recibida": un listener de GTM
 *   que lee ese texto en pantalla duplicaría la conversión.
 */

const FORM_NAME = "vision360ia_evaluacion_flota";

const VEHICLE_TYPE_OPTIONS = [
  "Autobuses / autocares",
  "Camiones",
  "Vehículos municipales",
  "Vehículos industriales",
  "Furgonetas",
  "Otro",
] as const;

// Mismos límites que el servidor, que mide en bytes (strlen).
const byteLength = (value: string) => new TextEncoder().encode(value).length;

const schema = z.object({
  interest: z.enum(INTEREST_VALUES, { message: "Indica qué te interesa." }),
  company: z
    .string()
    .trim()
    .min(1, "Indica el nombre de tu empresa.")
    .max(200, "El nombre de la empresa es demasiado largo."),
  name: z
    .string()
    .trim()
    .min(2, "Indica tu nombre.")
    .refine((v) => byteLength(v) <= 120, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .email("Introduce un email válido.")
    .refine((v) => byteLength(v) <= 200, "El email es demasiado largo."),
  flota: z.enum(FLEET_SIZE_OPTIONS, { message: "Selecciona el tamaño de tu flota." }),
  // Vamos a las instalaciones del cliente: la provincia es obligatoria.
  province: z.enum(PROVINCES, { message: "Selecciona tu provincia." }),
  vehicleType: z.union([z.enum(VEHICLE_TYPE_OPTIONS), z.literal("")]).optional(),
  privacyAccepted: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar la Política de Privacidad para continuar.",
  }),
});

type FormData = z.infer<typeof schema>;

// 48 px de alto en móvil (objetivo táctil de Android), 44 px desde md.
const selectClassName =
  "flex h-12 md:h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

export function FleetEvaluationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentInterest, setSentInterest] = useState<Interest | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const startedRef = useRef(false);
  const humanInterestRef = useRef(false);
  const submittingRef = useRef(false);
  const completedRef = useRef(false);
  const successRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));
  const attribution = useLandingAttribution();

  const isTurnstileRequired = process.env.NODE_ENV === "production";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      interest: DEFAULT_INTEREST,
      company: "",
      name: "",
      email: "",
      vehicleType: "",
      privacyAccepted: false,
    },
  });
  const interestValue = form.watch("interest");
  const selectedInterest = interestInfo(interestValue);

  useEffect(() => {
    if (humanInterestRef.current) return;
    const variant = getLandingVariant(attribution?.params.utm_content);
    form.setValue("interest", variant.interest, { shouldDirty: false });
  }, [attribution?.params.utm_content, form]);

  // Los CTA de la página ("Quiero probarlo en un vehículo"…) preseleccionan el interés.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const value = (event as CustomEvent<Interest>).detail;
      if (INTEREST_VALUES.includes(value)) {
        humanInterestRef.current = true;
        form.setValue("interest", value, { shouldDirty: true });
      }
    };
    window.addEventListener(SELECT_INTEREST_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_INTEREST_EVENT, onSelect);
  }, [form]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  // Turnstile se carga con la primera interacción con el formulario o a los
  // 2,5 s de llegar (lo que ocurra antes): no compite con la carga inicial en
  // móviles Android de gama media y está listo antes de terminar de rellenar.
  const [turnstileWanted, setTurnstileWanted] = useState(false);
  const wantTurnstile = () => setTurnstileWanted(true);
  useEffect(() => {
    if (!isTurnstileRequired) return;
    const timer = window.setTimeout(wantTurnstile, 2500);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carga/render de Turnstile (widget propio; reutiliza el script si ya existe).
  useEffect(() => {
    if (!isTurnstileRequired || !turnstileWanted) return;
    if (!siteKey) {
      setTurnstileError("No hemos podido cargar la comprobación antispam. Recarga la página e inténtalo de nuevo.");
      return;
    }

    const render = () => {
      if (!widgetContainerRef.current || widgetIdRef.current) return;
      if (typeof window === "undefined" || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
        sitekey: siteKey,
        size: "flexible",
        theme: "light",
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileError(null);
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileError("No hemos podido validar la comprobación antispam. Recarga la página e inténtalo de nuevo.");
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileError("La comprobación antispam ha caducado. Vuelve a validarla antes de enviar.");
        },
      });
    };

    if (typeof window !== "undefined" && window.turnstile) {
      render();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile="true"]');
    if (existing) {
      existing.addEventListener("load", render, { once: true });
      return () => existing.removeEventListener("load", render);
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "true";
    script.addEventListener("load", render, { once: true });
    script.addEventListener(
      "error",
      () => setTurnstileError("No hemos podido cargar la comprobación antispam. Recarga la página e inténtalo de nuevo."),
      { once: true },
    );
    document.head.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnstileWanted]);

  // Al desmontar (envío correcto o navegación), retira el widget de Turnstile.
  useEffect(
    () => () => {
      if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    },
    [],
  );

  // Tras el envío, el aviso de éxito queda a la vista (en móvil es más corto que el formulario).
  useEffect(() => {
    if (!sentInterest || !successRef.current) return;
    successRef.current.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    successRef.current.focus({ preventScroll: true });
  }, [sentInterest]);

  useEffect(() => {
    if (submitError) errorRef.current?.focus();
  }, [submitError]);

  // Etapa "inicio de formulario": una sola vez, con la primera interacción real
  // (escribir o elegir). Los focos puestos por código (CTA, errores de
  // validación) no cuentan.
  const handleFormStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_form_start",
      form_name: FORM_NAME,
      page_path: window.location.pathname,
    });
  };

  // Qué opción elige cada visitante, aunque luego no termine el formulario.
  const pushOptionSelect = (value: Interest) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_option_select",
      form_name: FORM_NAME,
      lead_interest: value,
    });
  };

  async function onSubmit(values: FormData) {
    if (submittingRef.current || completedRef.current) return;
    if (isTurnstileRequired && !turnstileToken) {
      setSubmitError("Completa la comprobación antispam antes de enviar.");
      return;
    }
    setSubmitError(null);
    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Honeypots propios de este formulario (ids _ef_*).
      const honeypotFields = {
        website: (document.getElementById("_ef_fax") as HTMLInputElement)?.value || "",
        address: (document.getElementById("_ef_title") as HTMLInputElement)?.value || "",
        url: (document.getElementById("_ef_org") as HTMLInputElement)?.value || "",
      };

      const message = [
        `Interés: ${interestInfo(values.interest).label}.`,
        `Tamaño de flota: ${values.flota}.`,
        `Provincia: ${values.province}.`,
        `Tipo principal de vehículo: ${values.vehicleType || "no indicado"}.`,
        "",
        "Solicitud de evaluación de flota desde la landing /evaluacion-flota.",
        buildAttributionNote(attribution),
      ].join("\n");

      const payload = {
        name: values.name,
        email: values.email,
        company: values.company,
        fleetSize: values.flota,
        message,
        privacyAccepted: values.privacyAccepted,
        pageUrl: attribution?.landingUrl || window.location.href,
        formLoadTime,
        token: turnstileToken,
        ...honeypotFields,
      };

      const response = await fetch("/api/form/contacto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      const confirmed = data?.ok === true && typeof data.message === "string" && data.message.trim().length > 0;
      if (!response.ok || !confirmed) {
        setSubmitError(
          (typeof data?.message === "string" && data.message.trim() ? data.message : null) ||
            (typeof data?.error === "string" && data.error.trim() ? data.error : null) ||
            "No hemos podido enviar la solicitud. Inténtalo de nuevo o escríbenos a info@vision360ia.com",
        );
        resetTurnstile();
        return;
      }

      // Envío real confirmado por el PHP (incluye `message`). Un {ok:true} sin
      // mensaje es un descarte silencioso del antispam: no se cuenta como lead.
      completedRef.current = true;
      setSentInterest(values.interest);
      // A third-party tracking failure must not turn a received lead into an
      // error or invite a duplicate submission. Keep telemetry independent.
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ lead_interest: values.interest });
        pushFormSuccess(FORM_NAME);
      } catch {
        // The server has already confirmed reception; keep the success state.
      }
    } catch {
      setSubmitError("Error de conexión. Inténtalo de nuevo o escríbenos a info@vision360ia.com");
      resetTurnstile();
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  if (sentInterest) {
    return (
      <div
        id={FORM_ANCHOR_ID}
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-labelledby="ef-success-title"
        className="flex min-h-[340px] scroll-mt-16 flex-col items-center justify-center rounded-[1.75rem] border border-emerald-200 bg-white p-8 text-center shadow-[var(--shadow-soft)] outline-none"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 id="ef-success-title" className="mt-5 font-headline text-2xl font-semibold tracking-[-0.02em] text-slate-950">
          Gracias, hablamos pronto
        </h2>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-slate-600">
          Revisamos tu caso y te contactamos en 24-48 h{" "}
          {interestInfo(sentInterest).successEnding}
        </p>
        <HomeLink className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-semibold tracking-[0.04em] text-slate-900 transition-colors hover:bg-slate-50">
          CONOCER VISION360IA
        </HomeLink>
      </div>
    );
  }

  return (
    <div
      id={FORM_ANCHOR_ID}
      className="ef-formcard"
      aria-labelledby="ef-form-title"
      tabIndex={-1}
    >
      <p className="ef-form-kicker">Demos y pilotos para flotas</p>
      <h2 id="ef-form-title" className="ef-form-title">Veamos cómo encaja en tu flota</h2>
      <p id="ef-form-explain" className="ef-form-explain">
        Déjanos tus datos y organizamos el siguiente paso contigo. Sin compromiso.
      </p>
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          onChangeCapture={handleFormStart}
          onInputCapture={handleFormStart}
          onFocusCapture={wantTurnstile}
          onPointerDownCapture={wantTurnstile}
          className="space-y-4"
          noValidate
          aria-label="Solicitud de evaluación de flota"
          aria-describedby="ef-form-explain ef-form-terms"
          aria-busy={isSubmitting}
        >
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold text-slate-800">Me interesa</legend>
                  <div className="ef-interest-grid">
                    {INTERESTS.map((option) => {
                      const checked = field.value === option.value;
                      return (
                        <label
                          key={option.value}
                          htmlFor={`ef-interest-${option.value}`}
                          className="ef-interest-option"
                          data-selected={checked}
                        >
                          <input
                            id={`ef-interest-${option.value}`}
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={checked}
                            onChange={() => {
                              humanInterestRef.current = true;
                              field.onChange(option.value);
                              pushOptionSelect(option.value);
                            }}
                            onBlur={field.onBlur}
                            ref={checked || !field.value ? field.ref : undefined}
                            className="h-4 w-4 shrink-0 accent-blue-700"
                          />
                          <span>{option.shortLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <FormMessage />
              </FormItem>
            )}
          />
            <div className="ef-fields">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="ef-field-full">
                  <FormLabel htmlFor={FIRST_FIELD_ID}>Empresa *</FormLabel>
                  <FormControl>
                    <Input id={FIRST_FIELD_ID} className="h-12 md:h-11" autoComplete="organization" autoCapitalize="words" enterKeyHint="next" placeholder="Nombre de tu empresa" aria-required="true" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="ef-name">Nombre *</FormLabel>
                  <FormControl>
                    <Input id="ef-name" className="h-12 md:h-11" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder="Tu nombre" aria-required="true" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="ef-email">Email profesional *</FormLabel>
                  <FormControl>
                    <Input id="ef-email" className="h-12 md:h-11" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" enterKeyHint="next" placeholder="nombre@empresa.com" aria-required="true" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="flota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="ef-flota">Tamaño de flota *</FormLabel>
                    <FormControl>
                      <select
                        id="ef-flota"
                        className={selectClassName}
                        aria-required="true"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      >
                        <option value="" disabled>
                          Selecciona…
                        </option>
                        {FLEET_SIZE_OPTIONS.map((opcion) => (
                          <option key={opcion} value={opcion}>
                            {opcion}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="ef-provincia">Provincia *</FormLabel>
                    <FormControl>
                      <select
                        id="ef-provincia"
                        className={selectClassName}
                        aria-required="true"
                        autoComplete="address-level2"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      >
                        <option value="" disabled>
                          Selecciona…
                        </option>
                        {PROVINCES.map((provincia) => (
                          <option key={provincia} value={provincia}>
                            {provincia}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem className="ef-field-full">
                    <FormLabel htmlFor="ef-vehiculo">
                      Tipo principal de vehículo <span className="font-normal text-slate-500">(opcional)</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        id="ef-vehiculo"
                        className={selectClassName}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      >
                        <option value="">Selecciona…</option>
                        {VEHICLE_TYPE_OPTIONS.map((opcion) => (
                          <option key={opcion} value={opcion}>
                            {opcion}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="privacyAccepted"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5">
                    <FormControl>
                      <input
                        id="ef-privacy"
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300"
                        aria-required="true"
                      />
                    </FormControl>
                    {/* Todo el texto marca la casilla; el enlace a la política va aparte
                        para que un toque en el texto no abra otra pestaña en el móvil. */}
                    <label htmlFor="ef-privacy" className="min-w-0 flex-1 text-xs leading-relaxed text-slate-600">
                      He leído y acepto la política de privacidad
                    </label>
                    <Link
                      href="/privacidad"
                      target="_blank"
                      className="-my-1 shrink-0 py-1 text-xs font-medium text-slate-700 underline underline-offset-2 hover:text-slate-950"
                    >
                      Leer
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Honeypots invisibles, ids propios (_ef_*) para no chocar con otros formularios */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="_ef_fax">Fax number</label>
              <input type="text" id="_ef_fax" name="fax_number" autoComplete="nope" tabIndex={-1} />
              <label htmlFor="_ef_title">Title</label>
              <input type="text" id="_ef_title" name="job_title_2" autoComplete="nope" tabIndex={-1} />
              <label htmlFor="_ef_org">Organization</label>
              <input type="text" id="_ef_org" name="org_url" autoComplete="nope" tabIndex={-1} />
            </div>

            {isTurnstileRequired ? <div ref={widgetContainerRef} className="min-h-[65px]" /> : null}
            {turnstileError ? (
              <p className="text-sm text-red-600" role="alert">
                {turnstileError}
              </p>
            ) : null}
            {submitError ? (
              <p id="ef-submit-error" ref={errorRef} tabIndex={-1} className="text-sm text-red-600 outline-none" role="alert">
                {submitError}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="ef-form-submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Enviando…
                </>
              ) : (
                selectedInterest.submit
              )}
            </Button>
          <p id="ef-form-terms" className="text-center text-xs leading-relaxed text-slate-500">
            Sin compromiso · Respuesta en 24-48 h · Flotas desde 5 vehículos
          </p>
        </form>
      </Form>
    </div>
  );
}
