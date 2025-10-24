'use client';
import Image from 'next/image';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Translation } from '@/lib/translations';

export function News({ translations: initialTranslations }: { translations: Translation['es'] }) {
  const { translations } = useLanguage();
  const t = translations.newsSection || initialTranslations.newsSection;
  const newsArticles = translations.newsArticles || initialTranslations.newsArticles;

  return (
    <SectionWrapper id="news" className="bg-card">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((article) => (
          <Card key={article.id} className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="p-0">
              <Link href="#" className="block overflow-hidden">
                <Image
                  src={article.image.imageUrl}
                  alt={article.image.description}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={article.image.imageHint}
                />
              </Link>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-6">
              <p className="mb-2 text-sm text-muted-foreground">{article.date}</p>
              <CardTitle className="mb-3 flex-1 font-headline text-xl">
                <Link href="#" className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </CardTitle>
              <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
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
        ))}
      </div>
    </SectionWrapper>
  );
}
