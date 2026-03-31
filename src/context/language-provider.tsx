
'use client';
import React, { createContext, ReactNode } from 'react';
import { translations, Translation } from '@/lib/translations';

type Language = 'es' | 'ca' | 'eu';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translation[Language];
  suggestedLanguage: Language | null;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

const noopSetLanguage = (_language: Language) => {};
const noopSetShowBanner = (_show: boolean) => {};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const value = {
    language: 'es' as Language,
    setLanguage: noopSetLanguage,
    translations: translations.es as Translation[Language],
    suggestedLanguage: null,
    showBanner: false,
    setShowBanner: noopSetShowBanner,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
