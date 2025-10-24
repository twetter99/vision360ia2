import { findImage } from './placeholder-images';
// This file is a fallback and the components should use the useLanguage hook instead.

// All data is now sourced from translations.ts
// This file can be removed once all components are refactored to use the useLanguage hook.

export const heroData = {
  image: findImage('hero'),
};
