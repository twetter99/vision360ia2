'use client';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [suggestedLanguage, setSuggestedLanguage] = useState<Language | null>(
    null
  );
  const [showBanner, setShowBanner] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 1. Check for a stored language preference
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['es', 'ca', 'eu'].includes(storedLang)) {
      setLanguageState(storedLang);
      setIsInitialized(true);
      return;
    }

    // 2. Detect browser language
    const browserLang = navigator.language.split('-')[0];
    let detectedLang: Language | null = null;
    if (browserLang === 'ca') {
      detectedLang = 'ca';
    } else if (browserLang === 'eu') {
      detectedLang = 'eu';
    } else if (browserLang === 'es') {
      detectedLang = 'es';
    }

    // 3. Show banner if detected language is different from default ('es')
    if (detectedLang && detectedLang !== 'es') {
      setSuggestedLanguage(detectedLang);
      setShowBanner(true);
    }
    
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // When user manually selects a language, hide the banner
    setShowBanner(false);
  };

  const currentTranslations = useMemo(
    () => translations[language],
    [language]
  );
  
  const value = {
    language,
    setLanguage,
    translations: currentTranslations,
    suggestedLanguage,
    showBanner: isInitialized && showBanner,
    setShowBanner,
  };

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
