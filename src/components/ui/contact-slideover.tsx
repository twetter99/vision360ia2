"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useContactSlideOver } from "@/context/contact-slideover-provider";

export function ContactSlideOver() {
  const { isOpen, closeContactSlideOver } = useContactSlideOver();
  const { translations } = useLanguage();
  const t = translations.contactSection;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    email: z.string().email("Dirección de correo electrónico no válida."),
    company: z.string().optional(),
    fleetSize: z.string().min(1, "Por favor, selecciona el tamaño de tu flota."),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", fleetSize: "", message: "" },
  });

  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));

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
      const response = await fetch("/api/form/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          vehicleType: values.fleetSize,
          specificConcerns: values.message,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          formLoadTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar");
      }

      toast({
        title: "Solicitud recibida",
        description: "Un ingeniero de Vision360IA analizará tu caso en menos de 24h.",
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
      {/* Overlay con backdrop blur */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeContactSlideOver}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-lg md:max-w-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="slideover-title"
      >
        <div
          className="h-full bg-white rounded-l-3xl shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 py-6 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            <button
              onClick={closeContactSlideOver}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
            <div className="pr-10">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
                {t.eyebrow}
              </p>
              <h2 id="slideover-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {t.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cuéntanos tu caso y un ingeniero de WINFIN revisará tu flota y te propondrá la
                arquitectura Vision360IA ideal.
              </p>
            </div>
          </div>

          {/* Form content - scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Nombre */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.form.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.form.namePlaceholder} {...field} />
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
                        <Input type="email" placeholder={t.form.emailPlaceholder} {...field} />
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
                      <FormLabel>Empresa (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tamaño de flota */}
                <FormField
                  control={form.control}
                  name="fleetSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamaño de Flota *</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Selecciona...</option>
                          <option value="1-5 vehículos">1-5 vehículos</option>
                          <option value="6-20 vehículos">6-20 vehículos</option>
                          <option value="21-50 vehículos">21-50 vehículos</option>
                          <option value="51-100 vehículos">51-100 vehículos</option>
                          <option value="101-500 vehículos">101-500 vehículos</option>
                          <option value="500+ vehículos">500+ vehículos</option>
                          <option value="Consulta General">Consulta General</option>
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
                    <FormItem>
                      <FormLabel>{t.form.message}</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder={t.form.messagePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Footer con botón */}
                <div className="pt-4">
                  <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enviar y agendar sesión técnica
                  </Button>
                  <p className="mt-3 text-xs text-center text-slate-500">
                    Tus datos están protegidos. Sin spam.
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
