import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { heroData } from "@/lib/data";

export function Hero() {
  const heroImage = heroData.image;
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-6xl md:text-7xl">
            Unrivaled Vehicle Security,
            <br />
            Powered by AI
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/80 md:text-xl">
            Vision360ia delivers cutting-edge protection, giving you total peace of mind. Explore our smart security solutions today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-border/70 bg-background/50 backdrop-blur-sm hover:bg-background/80">
              Request a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
