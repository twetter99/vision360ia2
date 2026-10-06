"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bus, Check, Eye, Loader2, MessagesSquare } from "lucide-react";

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
  INTERESTS,
  INTEREST_VALUES,
  SELECT_INTEREST_EVENT,
  interestInfo,
  type Interest,
} from "./interest";
import { PROVINCES } from "./provinces";

/**
 * Formulario de la landing /evaluacion-flota (tráfico de OpenAI/ChatGPT Ads).
 *
 * - Copia adaptada de QuickLeadForm: los formularios existentes no se tocan.
 * - MISMO endpoint PHP (/api/form/contacto.php) y misma cualificación de flota
 *   (FLEET_SIZE_OPTIONS = lista blanca del servidor, flotas desde 5 vehículos).
 * - El PHP no tiene campos de interés, provincia, tipo de vehículo ni origen: viajan dentro
 *   de `message`. `pageUrl` lleva la URL de llegada con UTM y oppref.
 * - Turnstile y honeypots PROPIOS (ids _ef_*), compatibles con el slideover.
 * - Se abre por pasos: primero solo "¿Por dónde quieres empezar?" (3 tarjetas,
 *   ninguna marcada); al elegir, se despliegan los campos.
 * - Medición: `lead_option_select` en cada elección de opción; `lead_form_start` con la primera interacción real (no con un foco puesto por código); `form_success` + `lead_created`
 *   (vía pushFormSuccess) solo si el PHP confirma el envío real. Antes se deja
 *   `lead_interest` en el dataLayer para poder segmentar la conversión en GTM.
 * - El texto de éxito NO contiene "Solicitud recibida": un listener de GTM
 *   que lee ese texto en pantalla duplicaría la conversión.
 */

const FORM_NAME = "vision360ia_evaluacion_flota";

const INTEREST_ICONS: Record<Interest, typeof Eye> = {
  demo: Eye,
  piloto: Bus,
  implantacion: MessagesSquare,
};

const VEHICLE_TYPE_OPTIONS = [
  "Autobuses / autocares",
  "Camiones",
  "Vehículos municipales",
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
  const successRef = useRef<HTMLDivElement | null>(null);
  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));
  const attribution = useLandingAttribution();

  const isTurnstileRequired = process.env.NODE_ENV === "production";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    // Sin interés marcado: los campos se despliegan al elegir una opción.
    defaultValues: {
      company: "",
      name: "",
      email: "",
      vehicleType: "",
      privacyAccepted: false,
    },
  });
  const interestValue = form.watch("interest");
  const isOpen = Boolean(interestValue);
  const selectedInterest = interestInfo(interestValue);

  // Los CTA de la página ("Quiero probarlo en un vehículo"…) preseleccionan el interés.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const value = (event as CustomEvent<Interest>).detail;
      if (INTEREST_VALUES.includes(value)) form.setValue("interest", value, { shouldDirty: true });
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
    // El widget vive dentro de los campos: solo se pinta cuando están desplegados.
    if (!isTurnstileRequired || !turnstileWanted || !isOpen) return;
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
  }, [turnstileWanted, isOpen]);

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
    successRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    successRef.current.focus({ preventScroll: true });
  }, [sentInterest]);

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
    if (isTurnstileRequired && !turnstileToken) {
      setSubmitError("Completa la comprobación antispam antes de enviar.");
      return;
    }
    setSubmitError(null);
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

      if (!response.ok || !data) {
        setSubmitError(
          data?.message ||
            data?.error ||
            "No hemos podido enviar la solicitud. Inténtalo de nuevo o escríbenos a info@vision360ia.com",
        );
        resetTurnstile();
        return;
      }

      // Envío real confirmado por el PHP (incluye `message`). Un {ok:true} sin
      // mensaje es un descarte silencioso del antispam: no se cuenta como lead.
      if (data.ok && data.message) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ lead_interest: values.interest });
        pushFormSuccess(FORM_NAME, { email: values.email });
      }
      setSentInterest(values.interest);
    } catch {
      setSubmitError("Error de conexión. Inténtalo de nuevo o escríbenos a info@vision360ia.com");
      resetTurnstile();
    } finally {
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
      className="min-w-0 scroll-mt-16 rounded-2xl border border-slate-200 bg-white p-3 shadow-[var(--shadow-soft)] sm:scroll-mt-6 sm:rounded-[1.75rem] sm:p-6"
    >
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          onChangeCapture={handleFormStart}
          onInputCapture={handleFormStart}
          onFocusCapture={wantTurnstile}
          onPointerDownCapture={wantTurnstile}
          className="space-y-3"
          noValidate
          aria-label="Solicitud de evaluación de flota"
        >
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <fieldset>
                  <legend className="mb-2 text-[15px] font-semibold leading-none text-slate-950">¿Por dónde quieres empezar?</legend>
                  <div className="grid gap-2">
                    {INTERESTS.map((option) => {
                      const checked = field.value === option.value;
                      const Icon = INTEREST_ICONS[option.value];
                      return (
                        <label
                          key={option.value}
                          htmlFor={`ef-interest-${option.value}`}
                          className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-[15px] font-medium leading-snug transition-colors [text-wrap:balance] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/50 md:min-h-[52px] ${
                            checked
                              ? "border-primary bg-primary/[0.06] text-slate-950 ring-1 ring-primary"
                              : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            id={`ef-interest-${option.value}`}
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={checked}
                            onChange={() => {
                              field.onChange(option.value);
                              pushOptionSelect(option.value);
                            }}
                            onBlur={field.onBlur}
                            ref={checked || !field.value ? field.ref : undefined}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                              checked ? "bg-primary text-white" : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">{option.label}</span>
                          {checked ? <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> : null}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <FormMessage />
              </FormItem>
            )}
          />
          {isOpen ? (
            <div className="ef-reveal space-y-3">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={FIRST_FIELD_ID}>Empresa *</FormLabel>
                  <FormControl>
                    <Input id={FIRST_FIELD_ID} className="h-12 md:h-11" autoComplete="organization" autoCapitalize="words" enterKeyHint="next" placeholder="Nombre de tu empresa" {...field} />
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
                    <Input id="ef-name" className="h-12 md:h-11" autoComplete="name" autoCapitalize="words" enterKeyHint="next" placeholder="Tu nombre" {...field} />
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
                    <Input id="ef-email" className="h-12 md:h-11" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" enterKeyHint="next" placeholder="nombre@empresa.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
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
                  <FormItem>
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
                      />
                    </FormControl>
                    <label htmlFor="ef-privacy" className="text-xs leading-relaxed text-slate-600">
                      He leído y acepto la{" "}
                      <Link href="/privacidad" className="underline underline-offset-2 hover:text-slate-950" target="_blank">
                        Política de Privacidad
                      </Link>
                    </label>
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
              <p className="text-sm text-red-600" role="alert">
                {submitError}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-auto min-h-[52px] w-full whitespace-normal rounded-full bg-accent px-4 py-3 text-[15px] font-semibold leading-tight tracking-[0.02em] text-slate-950 shadow-[0_16px_36px_rgba(245,158,11,0.22)] [text-wrap:balance] hover:bg-accent/90 min-[380px]:text-base min-[380px]:tracking-[0.04em]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Enviando…
                </>
              ) : (
                selectedInterest.submit
              )}
            </Button>
            </div>
          ) : null}
          <p className="text-center text-xs leading-relaxed text-slate-500">
            Sin compromiso · Respuesta en 24-48 h · Flotas desde 5 vehículos
          </p>
        </form>
      </Form>
    </div>
  );
}
