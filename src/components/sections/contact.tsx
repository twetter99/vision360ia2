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
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    console.log(values);
    toast({
      title: t.toast.title,
      description: t.toast.description,
    });
    form.reset();
  }

  return (
    <SectionWrapper id="contact">
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
