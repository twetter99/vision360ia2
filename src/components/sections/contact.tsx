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

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Dirección de correo electrónico no válida."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    console.log(values);
    toast({
      title: "¡Mensaje Enviado!",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });
    form.reset();
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="Ponte en Contacto"
        title="Nos Encantaría Saber de Ti"
        description="¿Tienes preguntas o necesitas un presupuesto personalizado? Rellena el siguiente formulario y un miembro de nuestro equipo se pondrá en contacto contigo."
      />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Correo Electrónico</FormLabel>
                    <FormControl><Input placeholder="tu@ejemplo.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu Mensaje</FormLabel>
                  <FormControl><Textarea rows={5} placeholder="¿Cómo podemos ayudarte?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Mensaje
              </Button>            
            </form>
          </Form>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
