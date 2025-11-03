"use client";

import { useState } from "react";
import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import type { Translation } from "@/lib/translations";


const vehicleTypes = [
  "Turismo",
  "SUV/4x4",
  "Furgoneta",
  "Camión",
  "Autobús",
  "Maquinaria Industrial",
  "Motocicleta",
  "Otro",
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  [key: string]: string;
}

export function ThreatAnalysis({
  translations: initialTranslations,
}: {
  translations: Translation["es"];
}) {
  const { translations } = useLanguage();
  const t =
    translations.aiAnalysisSection || initialTranslations.aiAnalysisSection;

  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formLoadTime] = useState(() => Math.floor(Date.now() / 1000));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormState('submitting');
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string || '',
      vehicleType: formData.get('vehicleType') as string,
      location: formData.get('location') as string || '',
      specificConcerns: formData.get('specificConcerns') as string || '',
      website: '', // honeypot
      formLoadTime: formLoadTime,
      pageUrl: window.location.href,
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
    };

    try {
    const response = await fetch('/api/form/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });      const result = await response.json();

      if (response.ok && result.ok) {
        setFormState('success');
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        // Error de validación
        if (result.field && result.error) {
          setErrors({ [result.field]: result.error });
        }
        setFormState('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('error');
      setErrors({ general: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.' });
    }
  };

  return (
    <SectionWrapper
      id="ai-analysis"
      className="bg-gradient-to-b from-background to-muted/20"
    >
      <SectionHeading
        eyebrow="Contacto Directo"
        title="Solicita tu Consultoría Personalizada"
        description="Rellena tus datos y uno de nuestros expertos analizará tu caso para darte una solución a medida. Nos pondremos en contacto contigo en menos de 24 horas."
      />

      <div className="mx-auto max-w-3xl">
        {formState === 'success' ? (
          <Card className="p-12 text-center border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 shadow-xl">
            <CardContent className="p-0 space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>

              <div className="space-y-3">
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">
                  ¡Gracias! Hemos recibido tu solicitud.
                </h3>
                <p className="text-lg text-green-700 dark:text-green-300 max-w-xl mx-auto">
                  Un experto de nuestro equipo se pondrá en contacto contigo muy pronto.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="p-8 shadow-xl border-2 border-primary/20">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo honeypot (oculto para anti-spam) */}
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                
                {/* Error general */}
                {errors.general && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{errors.general}</p>
                  </div>
                )}

                {/* Nombre Completo */}
                <div>
                  <label htmlFor="name" className="block text-base font-semibold mb-2">
                    Nombre Completo <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Juan Pérez García"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Profesional */}
                  <div>
                    <label htmlFor="email" className="block text-base font-semibold mb-2">
                      Email Profesional <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                  </div>

                  {/* Empresa */}
                  <div>
                    <label htmlFor="company" className="block text-base font-semibold mb-2">
                      Empresa
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Tu Empresa S.L."
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.company && <p className="mt-1 text-sm text-destructive">{errors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tipo de Vehículo */}
                  <div>
                    <label htmlFor="vehicleType" className="block text-base font-semibold mb-2">
                      Tipo de Vehículo <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Selecciona el tipo</option>
                      {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.vehicleType && <p className="mt-1 text-sm text-destructive">{errors.vehicleType}</p>}
                  </div>

                  {/* Ubicación Principal */}
                  <div>
                    <label htmlFor="location" className="block text-base font-semibold mb-2">
                      Ubicación Principal
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Madrid, Barcelona..."
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.location && <p className="mt-1 text-sm text-destructive">{errors.location}</p>}
                  </div>
                </div>

                {/* Preocupaciones Específicas */}
                <div>
                  <label htmlFor="specificConcerns" className="block text-base font-semibold mb-2">
                    Preocupaciones Específicas o Comentarios
                  </label>
                  <textarea
                    id="specificConcerns"
                    name="specificConcerns"
                    placeholder="Cuéntanos qué necesitas o qué problemas de seguridad quieres resolver..."
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                  {errors.specificConcerns && <p className="mt-1 text-sm text-destructive">{errors.specificConcerns}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={formState === 'submitting'}
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 text-lg font-semibold"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Solicitud
                    </>
                  )}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  🔒 Tus datos están protegidos. Los usaremos únicamente para
                  contactarte sobre tu consultoría.
                </p>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary mb-2">
              &lt; 24h
            </div>
            <p className="text-sm text-muted-foreground">
              Tiempo de respuesta
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <p className="text-sm text-muted-foreground">
              Consultoría gratuita
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl font-bold text-primary mb-2">0€</div>
            <p className="text-sm text-muted-foreground">Sin compromiso</p>
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
