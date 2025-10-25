
'use client';
import Image from 'next/image';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';
import { AnimatedSection } from '../shared/animated-section';
import type { NewsArticle } from '@/services/cms';

export function News({ newsArticles, translations: initialTranslations }: { newsArticles: NewsArticle[], translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.newsSection || initialTranslations.newsSection;
  
  return (
    <SectionWrapper id="news" className="bg-card">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((article, index) => (
          <AnimatedSection key={article.id} animation="slide-up" delay={index * 0.1}>
            <Card className="group flex h-full flex-col overflow-hidden rounded-xl border-border/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <Link href="#" className="block overflow-hidden">
                  <div className="relative aspect-h-9 aspect-w-16">
                    <Image
                      src={article.image.imageUrl}
                      alt={article.image.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={article.image.imageHint}
                    />
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-6">
                <p className="mb-2 text-sm text-muted-foreground">{article.date}</p>
                <h3 className="mb-3 flex-1 font-headline text-xl font-bold">
                  <Link href="#" className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-3 text-justify">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href="#">
                    {t.readMore}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
