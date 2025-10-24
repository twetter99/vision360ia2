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
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
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
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="Get In Touch"
        title="We'd Love to Hear From You"
        description="Have questions or need a custom quote? Fill out the form below and a member of our team will get back to you."
      />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl><Textarea rows={5} placeholder="How can we help you?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
              </Button>            
            </form>
          </Form>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
