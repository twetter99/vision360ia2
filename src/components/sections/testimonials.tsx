import Image from "next/image";
import { testimonials } from "@/lib/data";
import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <SectionHeading
        eyebrow="Lo que Dicen Nuestros Clientes"
        title="Con la Confianza de Conductores y Gestores de Flotas"
        description="No te fíes solo de nuestra palabra. Esto es lo que nuestros clientes satisfechos tienen que decir sobre Vision360ia."
      />
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full max-w-6xl"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="flex h-full flex-col">
                  <CardContent className="flex flex-1 flex-col justify-between p-6">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="flex-1 text-base italic text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.author} data-ai-hint={testimonial.avatar.imageHint} />
                        <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 md:-left-12" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 md:-right-12" />
      </Carousel>
    </SectionWrapper>
  );
}
