"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Phone } from "lucide-react";

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
import { PhoneCtaLink, WhatsAppCtaLink, WhatsAppIcon } from "@/components/shared/contact-channel-links";

/**
 * Formulario corto de captación para landings de campaña (CRO).
 *
 * - Solo 4 campos (nombre, email, teléfono, tamaño de flota) + privacidad.
 * - Envía al MISMO endpoint PHP que el slideover (/api/form/contacto.php), sin
 *   tocarlo: el "Tamaño de flota" viaja dentro del campo `message`.
 * - Turnstile y honeypots PROPIOS (ids _qf_*) para no chocar con el slideover
 *   si ambos conviven en la misma página.
 * - Al éxito real (PHP responde OK): aviso de éxito + dataLayer `form_success`
 *   (conversión de Google Ads vía GTM). Nunca en el clic.
 */

const FLOTA_OPCIONES = [
  "1–10 vehículos",
  "11–50 vehículos",
  "51–200 vehículos",
  "Más de 200 vehículos",
] as const;

const quickSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Dirección de correo electrónico no válida."),
  phone: z.string().optional(),
  flota: z.enum(FLOTA_OPCIONES, { message: "Indica el tamaño aproximado de tu flota." }),
  privacyAccepted: z.boolean().refine((v) => v === true, {
    message: "Debes aceptar la Política de Privacidad para continuar.",
  }),
});

type QuickFormData = z.infer<typeof quickSchema>;

export function QuickLeadForm({ whatsappTopic }: { whatsappTopic?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));

  const isTurnstileRequired = process.env.NODE_ENV === "production";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const form = useForm<QuickFormData>({
    resolver: zodResolver(quickSchema),
    defaultValues: { name: "", email: "", phone: "", privacyAccepted: false },
  });

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  // Carga/render de Turnstile (widget propio, independiente del slideover).
  useEffect(() => {
    if (!isTurnstileRequired) return;
    if (!siteKey) {
      setTurnstileError("Falta configurar Cloudflare Turnstile para este entorno.");
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
          setTurnstileError("No hemos podido validar la comprobación anti-spam. Recarga la página e inténtalo de nuevo.");
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileError("La comprobación anti-spam ha caducado. Vuelve a validarla antes de enviar.");
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
      () => setTurnstileError("No hemos podido cargar la verificación anti-spam. Recarga la página e inténtalo de nuevo."),
      { once: true },
    );
    document.head.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: QuickFormData) {
    if (isTurnstileRequired && !turnstileToken) {
      setSubmitError("Completa la comprobación anti-spam antes de enviar.");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // Honeypots propios de este formulario (ids _qf_*).
      const honeypotFields = {
        website: (document.getElementById("_qf_fax") as HTMLInputElement)?.value || "",
        address: (document.getElementById("_qf_title") as HTMLInputElement)?.value || "",
        url: (document.getElementById("_qf_org") as HTMLInputElement)?.value || "",
      };

      // "Tamaño de flota" viaja dentro de message: llega al email del lead sin
      // tocar el endpoint PHP (que exige message >= 10 caracteres).
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        company: undefined,
        message: `Tamaño de flota: ${values.flota}.\n\nSolicitud rápida de información desde la landing.`,
        privacyAccepted: values.privacyAccepted,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        formLoadTime,
        token: turnstileToken,
        ...honeypotFields,
      };

      const response = await fetch("/api/form/contacto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.message || data.error || "Error al enviar el formulario. Inténtalo de nuevo.");
        resetTurnstile();
        return;
      }

      // Conversión de Google Ads (vía GTM): SOLO con respuesta OK del PHP.
      pushFormSuccess("vision360ia_contact_quick");
      setIsSent(true);
    } catch {
      setSubmitError("Error de conexión. Inténtalo de nuevo o escríbenos a info@vision360ia.com");
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSent) {
    return (
      <div
        role="status"
        className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-[1.75rem] border border-emerald-200 bg-emerald-50/70 p-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-headline text-xl font-semibold text-slate-950">¡Solicitud recibida!</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Te responderemos en 24-48 h por correo o teléfono con la evaluación para tu flota.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-5 md:p-6">
      <h3 className="font-headline text-lg font-semibold tracking-[-0.01em] text-slate-950 md:text-xl">
        Pide tu evaluación técnica gratuita
      </h3>
      <p className="mt-1 text-sm text-slate-500">Respuesta en 24-48 h. Sin compromiso.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-3.5" noValidate>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="qf-name">Nombre *</FormLabel>
                <FormControl>
                  <Input id="qf-name" autoComplete="name" placeholder="Tu nombre" {...field} />
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
                <FormLabel htmlFor="qf-email">Email *</FormLabel>
                <FormControl>
                  <Input id="qf-email" type="email" autoComplete="email" placeholder="tu@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="qf-phone">Teléfono</FormLabel>
                <FormControl>
                  <Input id="qf-phone" type="tel" autoComplete="tel" placeholder="+34…" {...field} />
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
                <FormLabel htmlFor="qf-flota">Tamaño de flota *</FormLabel>
                <FormControl>
                  <select
                    id="qf-flota"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  >
                    <option value="" disabled>
                      Selecciona…
                    </option>
                    {FLOTA_OPCIONES.map((opcion) => (
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
            name="privacyAccepted"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
                  <FormControl>
                    <input
                      id="qf-privacy"
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300"
                    />
                  </FormControl>
                  <label htmlFor="qf-privacy" className="text-xs leading-relaxed text-slate-600">
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

          {/* Honeypots invisibles, ids propios (_qf_*) para no chocar con el slideover */}
          <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="_qf_fax">Fax number</label>
            <input type="text" id="_qf_fax" name="fax_number" autoComplete="nope" tabIndex={-1} />
            <label htmlFor="_qf_title">Title</label>
            <input type="text" id="_qf_title" name="job_title_2" autoComplete="nope" tabIndex={-1} />
            <label htmlFor="_qf_org">Organization</label>
            <input type="text" id="_qf_org" name="org_url" autoComplete="nope" tabIndex={-1} />
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
            className="min-h-[50px] w-full rounded-full bg-accent text-base font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.22)] hover:bg-accent/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando…
              </>
            ) : (
              "Solicitar evaluación gratuita"
            )}
          </Button>

          {/* Los gestores de flota llaman o escriben: vía directa (no emite form_success) */}
          <div className="grid gap-2 sm:grid-cols-2">
            <PhoneCtaLink className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950">
              <Phone className="h-4 w-4" />
              649 567 837
            </PhoneCtaLink>
            <WhatsAppCtaLink
              topic={whatsappTopic}
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border border-emerald-300 bg-white px-5 text-sm font-semibold text-emerald-800 transition-colors hover:border-emerald-400 hover:bg-emerald-50"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </WhatsAppCtaLink>
          </div>
        </form>
      </Form>
    </div>
  );
}
