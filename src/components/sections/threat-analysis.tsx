"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getRecommendations } from "@/app/actions";
import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Zap, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { Textarea } from "../ui/textarea";
import type { PersonalizedSecurityRecommendationsOutput } from "@/ai/flows/personalized-security-recommendations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const formSchema = z.object({
  vehicleType: z.string().min(2, "Vehicle type is required."),
  vehicleMake: z.string().min(2, "Vehicle make is required."),
  vehicleModel: z.string().min(2, "Vehicle model is required."),
  vehicleYear: z.coerce.number().min(1900, "Invalid year.").max(new Date().getFullYear() + 1, "Invalid year."),
  location: z.string().min(2, "Location is required."),
  specificConcerns: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ThreatAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedSecurityRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleType: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: new Date().getFullYear(),
      location: "",
      specificConcerns: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getRecommendations(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  }

  return (
    <SectionWrapper id="ai-analysis">
      <SectionHeading
        eyebrow="AI-Powered Analysis"
        title="Get Your Personalized Security Report"
        description="Our intelligent threat analysis tool assesses risks for your specific vehicle and location to provide tailored security recommendations."
      />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="vehicleType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <FormControl><Input placeholder="e.g. SUV" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="vehicleMake" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl><Input placeholder="e.g. Toyota" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="vehicleModel" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl><Input placeholder="e.g. RAV4" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="vehicleYear" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl><Input type="number" placeholder="e.g. 2023" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (City, State)</FormLabel>
                    <FormControl><Input placeholder="e.g. San Francisco, CA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="specificConcerns" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Concerns (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="e.g. Break-ins, theft of catalytic converter" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />}
                  Analyze Threats
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed p-8 lg:min-h-full">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
              <h3 className="font-headline text-xl font-semibold">Analyzing your vehicle...</h3>
              <p>Our AI is crafting your personalized report.</p>
            </div>
          )}
          {error && (
            <div className="text-center text-destructive">
              <AlertTriangle className="mx-auto mb-4 h-12 w-12" />
              <h3 className="font-headline text-xl font-semibold">Analysis Failed</h3>
              <p>{error}</p>
            </div>
          )}
          {!isLoading && !error && !result && (
             <div className="text-center text-muted-foreground">
                <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary/50" />
                <h3 className="font-headline text-xl font-semibold text-foreground">Your Report Awaits</h3>
                <p>Fill out the form to get started.</p>
            </div>
          )}
          {result && (
            <div className="w-full">
              <h3 className="mb-4 font-headline text-2xl font-bold">Your Security Report</h3>
              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-headline text-lg hover:no-underline"><AlertTriangle className="mr-2 h-5 w-5 text-destructive" />Threat Analysis</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground whitespace-pre-wrap">
                    {result.threatAnalysis}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-headline text-lg hover:no-underline"><ShieldCheck className="mr-2 h-5 w-5 text-primary" />Recommendations</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 pl-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-3">
                          <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-3">
                  <AccordionTrigger className="font-headline text-lg hover:no-underline"><Sparkles className="mr-2 h-5 w-5 text-accent" />Reasoning</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground whitespace-pre-wrap">
                    {result.reasoning}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
