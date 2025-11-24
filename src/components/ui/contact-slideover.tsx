"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useContactSlideOver } from "@/context/contact-slideover-provider";

const vehicleTypeOptions = [
  { value: "urbano", label: "Autobuses urbanos" },
  { value: "interurbano", label: "Interurbanos / regionales" },
  { value: "tren-tranvia", label: "Trenes / tranvías" },
  { value: "camion-logistica", label: "Camiones / logística" },
  { value: "industrial", label: "Vehículos industriales / especiales" },
];

const mainInterestOptions = [
  { value: "vision360", label: "Visión 360º y reducción de incidentes" },
  { value: "seguridad-conductor", label: "Monitorización del conductor" },
  { value: "analitica", label: "Analítica de eventos e incidencias" },
  { value: "integracion", label: "Integración con sistemas existentes" },
  { value: "piloto", label: "Proyecto piloto / prueba de concepto" },
];

const projectHorizonOptions = [
  { value: "explorando", label: "Explorando opciones" },
  { value: "0-3", label: "0–3 meses" },
  { value: "3-6", label: "3–6 meses" },
  { value: "6+", label: "Más de 6 meses" },
];

const contactPreferenceOptions = [
  { value: "video", label: "Videollamada" },
  { value: "telefono", label: "Teléfono" },
  { value: "email", label: "Email" },
];

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Dirección de correo electrónico no válida."),
  company: z.string().optional(),
  role: z.string().optional(),
  phone: z.string().optional(),
  fleetSize: z.string().min(1, "Por favor, selecciona el tamaño de tu flota."),
  vehicleTypes: z.array(z.string()).optional(),
  mainInterest: z.string().optional(),
  projectHorizon: z.string().optional(),
  contactPreference: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debes aceptar la Política de Privacidad para continuar.",
    }),
  marketingOptIn: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSlideOver() {
  const { isOpen, closeContactSlideOver } = useContactSlideOver();
  const { translations } = useLanguage();
  const t = translations.contactSection;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      phone: "",
      fleetSize: "",
      vehicleTypes: [],
      mainInterest: "",
      projectHorizon: "",
      contactPreference: "",
      message: "",
      privacyAccepted: false,
      marketingOptIn: false,
    },
  });

  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));

  // Cargar script de reCAPTCHA v3 (solo en el cliente)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured');
      return;
    }

    // Verificar si el script ya está cargado
    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      return;
    }

    // Inyectar script de reCAPTCHA
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // No removemos el script para evitar problemas de recarga
    };
  }, []);

  // Bloquear scroll del body cuando el slide-over está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeContactSlideOver();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeContactSlideOver]);

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);

    try {
      // 🔐 OBTENER TOKEN DE RECAPTCHA v3 ANTES DE ENVIAR
      let recaptchaToken = '';
      
      if (typeof window !== 'undefined') {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) {
          try {
            // Esperar a que grecaptcha esté listo (máximo 5 segundos)
            const grecaptchaReady = await Promise.race([
              new Promise<boolean>((resolve) => {
                if (window.grecaptcha && window.grecaptcha.ready) {
                  window.grecaptcha.ready(() => resolve(true));
                } else {
                  resolve(false);
                }
              }),
              new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000))
            ]);
            
            if (grecaptchaReady && window.grecaptcha) {
              recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' });
              console.log('✅ reCAPTCHA token generado');
            } else {
              console.warn('⚠️ reCAPTCHA no está disponible, continuando sin token');
            }
          } catch (recaptchaError) {
            console.error('❌ reCAPTCHA error:', recaptchaError);
            // Continuar sin token en caso de error de reCAPTCHA
          }
        } else {
          console.warn('⚠️ NEXT_PUBLIC_RECAPTCHA_SITE_KEY no configurada');
        }
      }

      // Preparar datos completos para enviar
      const payload = {
        // Datos básicos de contacto
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        role: values.role || undefined,
        phone: values.phone || undefined,
        
        // Información de flota
        fleetSize: values.fleetSize || undefined,
        vehicleTypes: values.vehicleTypes && values.vehicleTypes.length > 0 
          ? values.vehicleTypes 
          : undefined,
        
        // Detalles del proyecto
        mainInterest: values.mainInterest || undefined,
        projectHorizon: values.projectHorizon || undefined,
        contactPreference: values.contactPreference || undefined,
        
        // Mensaje y legal
        message: values.message || undefined,
        privacyAccepted: values.privacyAccepted,
        marketingOptIn: values.marketingOptIn || false,
        
        // Metadata
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        formLoadTime,
        token: recaptchaToken, // 🔐 Token de reCAPTCHA
      };

      console.log('📤 Enviando formulario completo:', payload);

      const response = await fetch("/api/form/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostrar el mensaje específico del servidor
        const errorMessage = data.message || data.error || "Error al enviar el formulario";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return; // Salir sin lanzar excepción
      }

      toast({
        title: "Solicitud recibida",
        description:
          "Un ingeniero de Vision360IA analizará tu caso en menos de 24h.",
      });
      form.reset();
      closeContactSlideOver();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error de conexión",
        description:
          "Por favor, inténtalo de nuevo o escríbenos a info@vision360ia.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay con backdrop blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeContactSlideOver}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl md:max-w-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="slideover-title"
      >
        <div
          className="h-full bg-white/90 backdrop-blur-xl rounded-l-3xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border border-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 py-6 md:px-8 md:py-7 border-b border-slate-200 bg-gradient-to-br from-slate-50/90 via-white to-slate-100/80">
            <button
              onClick={closeContactSlideOver}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>

            <div className="md:pr-16">
              <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.16em] mb-2">
                {t.eyebrow}
              </p>
              <h2
                id="slideover-title"
                className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3"
              >
                {t.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Cuéntanos cómo es tu flota y en una sesión técnica de 20–30
                minutos un ingeniero de WINFIN te propondrá la arquitectura
                Vision360IA más eficiente para tu operación.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] md:text-xs text-slate-500">
                <span className="px-2.5 py-1 rounded-full bg-white/80 border border-slate-200">
                  +2.000 vehículos equipados
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/80 border border-slate-200">
                  Integradores: Indra, GMV, Etra
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/80 border border-slate-200">
                  Operadores: EMT Madrid, CRTM, ATM…
                </span>
              </div>
            </div>
          </div>

          {/* Form content - scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Bloque 1 · Datos de contacto */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    1. Datos de contacto
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Nombre */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.form.name}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t.form.namePlaceholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.form.email}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t.form.emailPlaceholder}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Empresa */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre de tu operador / empresa"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Rol */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo / rol</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ej.: Director de Operaciones, CTO, Responsable de Flota…"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Teléfono */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Teléfono (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Para coordinar más rápido la sesión técnica"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Bloque 2 · Sobre tu flota */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    2. Sobre tu flota
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Tamaño de flota */}
                    <FormField
                      control={form.control}
                      name="fleetSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tamaño de flota *</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">Selecciona…</option>
                              <option value="1-20">1–20 vehículos</option>
                              <option value="21-100">21–100 vehículos</option>
                              <option value="101-300">
                                101–300 vehículos
                              </option>
                              <option value="300+">Más de 300 vehículos</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Interés principal */}
                    <FormField
                      control={form.control}
                      name="mainInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interés principal</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">Selecciona…</option>
                              {mainInterestOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Tipo de vehículos */}
                    <FormField
                      control={form.control}
                      name="vehicleTypes"
                      render={({ field }) => {
                        const value = field.value || [];
                        return (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Tipo de vehículos</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {vehicleTypeOptions.map((opt) => {
                                  const checked = value.includes(opt.value);
                                  return (
                                    <label
                                      key={opt.value}
                                      className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:border-slate-400 transition-colors cursor-pointer"
                                    >
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300"
                                        value={opt.value}
                                        checked={checked}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            field.onChange([
                                              ...value,
                                              opt.value,
                                            ]);
                                          } else {
                                            field.onChange(
                                              value.filter(
                                                (v: string) =>
                                                  v !== opt.value
                                              )
                                            );
                                          }
                                        }}
                                      />
                                      <span>{opt.label}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Bloque 3 · Contexto del proyecto */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    3. Tu proyecto
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Horizonte del proyecto */}
                    <FormField
                      control={form.control}
                      name="projectHorizon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horizonte del proyecto</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">Selecciona…</option>
                              {projectHorizonOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Preferencia de contacto */}
                    <FormField
                      control={form.control}
                      name="contactPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferencia de contacto</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">Selecciona…</option>
                              {contactPreferenceOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mensaje */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>{t.form.message}</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder={
                                t.form.messagePlaceholder ??
                                "Cuéntanos brevemente la situación actual, retos y objetivos del proyecto…"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Bloque 4 · Legal */}
                <div className="space-y-3">
                  {/* Privacidad obligatoria */}
                  <FormField
                    control={form.control}
                    name="privacyAccepted"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="mt-1 h-4 w-4 rounded border-slate-300"
                            />
                          </FormControl>
                          <div className="space-y-1 text-xs sm:text-sm">
                            <FormLabel className="font-medium text-slate-800">
                              He leído y acepto la Política de Privacidad
                            </FormLabel>
                            <p className="text-slate-500">
                              Trataremos tus datos únicamente para responder a
                              tu consulta sobre Vision360IA y gestionar la
                              sesión técnica. Puedes ejercer tus derechos en
                              cualquier momento.
                            </p>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Marketing opcional */}
                  <FormField
                    control={form.control}
                    name="marketingOptIn"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="mt-1 h-4 w-4 rounded border-slate-300"
                            />
                          </FormControl>
                          <p>
                            Quiero recibir casos de éxito y contenido técnico
                            sobre Vision360IA y proyectos de seguridad en
                            flotas.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Footer con botón */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Enviar y agendar sesión técnica
                  </Button>
                  <p className="mt-3 text-xs text-center text-slate-500">
                    Tus datos están protegidos. Sin spam. Solo hablamos de
                    tecnología y casos reales en flotas como la tuya.
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
