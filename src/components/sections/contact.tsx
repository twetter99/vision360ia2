"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import type { Translation } from '@/lib/translations';

export function Contact({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.contactSection || initialTranslations.contactSection;

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

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    
    try {
      // Llamada al endpoint de Next.js
      const response = await fetch('/api/form/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          vehicleType: values.fleetSize, // Mapeamos fleetSize a vehicleType para el backend
          specificConcerns: values.message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          formLoadTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar');
      }

      toast({
        title: "Solicitud recibida",
        description: "Un ingeniero de Vision360IA analizará tu caso en menos de 24h.",
      });
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error de conexión",
        description: "Por favor, inténtalo de nuevo o escríbenos a info@vision360ia.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SectionWrapper id="contacto">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form.name}</FormLabel>
                    <FormControl><Input placeholder={t.form.namePlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.form.email}</FormLabel>
                    <FormControl><Input placeholder={t.form.emailPlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa (opcional)</FormLabel>
                    <FormControl><Input placeholder="Tu empresa" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="fleetSize" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamaño de Flota *</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                )} />
              </div>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.form.message}</FormLabel>
                  <FormControl><Textarea rows={5} placeholder={t.form.messagePlaceholder} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.form.sendButton}
              </Button>            
            </form>
          </Form>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
