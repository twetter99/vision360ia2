'use client';
import Image from 'next/image';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';

export function ProductShowcase({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.productsSection || initialTranslations.productsSection;
  const products = translations.products || initialTranslations.products;

  return (
    <SectionWrapper id="products">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <AnimatedSection key={product.id} animation="slide-up" delay={index * 0.22}>
            <Card className="flex h-full flex-col overflow-hidden rounded-xl border-border/50 bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="aspect-h-9 aspect-w-16 relative">
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
                <h3 className="mb-3 font-headline text-xl font-bold text-primary">{product.name}</h3>
                <p className="flex-1 text-muted-foreground text-justify">{product.description}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-3 text-justify">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full group">
                  {t.addToCart}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
