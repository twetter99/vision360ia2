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

// ✅ Schema simplificado: solo campos esenciales
const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Dirección de correo electrónico no válida."),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debes aceptar la Política de Privacidad para continuar.",
    }),
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
      phone: "",
      message: "",
      privacyAccepted: false,
    },
  });

  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));

  // Cargar script de reCAPTCHA v3 (solo en el cliente y en producción)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDevelopment = process.env.NODE_ENV === 'development' || 
                          window.location.hostname === 'localhost' ||
                          window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.warn('⚠️ Development mode: reCAPTCHA script not loaded (using dummy token)');
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured');
      return;
    }

    if (document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
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
      // 🔐 OBTENER TOKEN DE RECAPTCHA v3
      let recaptchaToken = '';
      
      if (typeof window !== 'undefined') {
        const isDevelopment = process.env.NODE_ENV === 'development' || 
                              window.location.hostname === 'localhost' ||
                              window.location.hostname === '127.0.0.1';
        
        if (isDevelopment) {
          recaptchaToken = 'dev-bypass-token';
        } else {
          const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
          if (siteKey) {
            try {
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
              }
            } catch (recaptchaError) {
              console.error('❌ reCAPTCHA error:', recaptchaError);
            }
          }
        }
      }

      // Preparar datos para enviar
      const payload = {
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        phone: values.phone || undefined,
        message: values.message,
        privacyAccepted: values.privacyAccepted,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        formLoadTime,
        token: recaptchaToken,
      };

      const response = await fetch("/api/form/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || "Error al enviar el formulario";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // 📄 DESCARGA AUTOMÁTICA DEL PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = '/pdf/Presentacion_V360.pdf';
      downloadLink.download = 'Vision360_Documentacion_Tecnica.pdf';
      downloadLink.click();

      toast({
        title: t.toast?.downloadSuccess?.title || "¡Documentación enviada!",
        description: t.toast?.downloadSuccess?.description || "Tu PDF se está descargando. Un ingeniero te contactará en menos de 24h.",
      });
      form.reset();
      closeContactSlideOver();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error de conexión",
        description: "Por favor, inténtalo de nuevo o escríbenos a info@vision360ia.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeContactSlideOver}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="slideover-title"
      >
        <div
          className="h-full bg-white/95 backdrop-blur-xl rounded-l-2xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border border-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 py-5 border-b border-slate-200 bg-gradient-to-br from-slate-50/90 via-white to-slate-100/80">
            <button
              onClick={closeContactSlideOver}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>

            <div className="pr-10">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.16em] mb-1">
                {t.eyebrow}
              </p>
              <h2
                id="slideover-title"
                className="text-xl font-semibold text-slate-900 mb-2"
              >
                {t.form.slideoverTitle || 'Descarga la documentación técnica'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.form.slideoverSubtitle || 'Completa el formulario y recibe el dossier completo con especificaciones.'}
              </p>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Nombre */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.name} *</FormLabel>
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
                      <FormLabel>{t.form.email} *</FormLabel>
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

                {/* Teléfono y Empresa en una fila */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.form.phone}</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+34..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.form.company}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tu empresa"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Mensaje */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.message} *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="¿Qué tipo de vehículos tienes? ¿Cuántos? ¿Qué problema quieres resolver?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Privacidad */}
                <FormField
                  control={form.control}
                  name="privacyAccepted"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300"
                          />
                        </FormControl>
                        <div className="text-xs text-slate-600">
                          <span>{t.form.privacyLabel} </span>
                          <a 
                            href="/privacidad" 
                            target="_blank" 
                            className="text-primary underline hover:no-underline"
                          >
                            {t.form.privacyLink}
                          </a>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Botón enviar */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full min-h-[48px] text-base font-semibold"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? t.form.submitting : "Enviar solicitud"}
                </Button>

                <p className="text-[11px] text-center text-slate-400">
                  Sin spam. Solo ingenieros hablando de tecnología.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
