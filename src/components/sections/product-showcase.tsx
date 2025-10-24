import Image from "next/image";
import { products } from "@/lib/data";
import { SectionWrapper } from "../shared/section-wrapper";
import { SectionHeading } from "../shared/section-heading";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";

export function ProductShowcase() {
  return (
    <SectionWrapper id="products">
      <SectionHeading
        eyebrow="Our Products"
        title="State-of-the-Art Security Hardware"
        description="Explore our range of premium security products, designed for reliability and performance."
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CardHeader className="p-0">
              <div className="aspect-h-2 aspect-w-3">
                <Image
                  src={product.image.imageUrl}
                  alt={product.image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={product.image.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6">
              <Badge variant="secondary" className="mb-2 w-fit">{product.price}</Badge>
              <CardTitle className="mb-2 font-headline text-xl">{product.name}</CardTitle>
              <p className="flex-1 text-muted-foreground">{product.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
