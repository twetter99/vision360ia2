import { findImage } from './placeholder-images';
import { translations } from './translations';

// This file now acts as a bridge and uses the translations from translations.ts
// We are exporting data for the default language (Spanish) for any components that might still be using it directly.
// The long-term goal should be to refactor all components to use the `useLanguage` hook.

const esTranslations = translations.es;

export const heroData = {
  image: findImage('hero'),
  ...esTranslations.hero,
};

export const navigationLinks = esTranslations.navigationLinks;
export const products = esTranslations.products;
export const solutions = esTranslations.solutions;
export const newsArticles = esTranslations.newsArticles;
export const testimonials = esTranslations.testimonials;
export const faqs = esTranslations.faqs;
