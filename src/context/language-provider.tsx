
'use client';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
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
    // This effect runs only on the client
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['es', 'ca', 'eu'].includes(storedLang)) {
      setLanguageState(storedLang);
      setIsInitialized(true);
      return;
    }

    const browserLang = navigator.language.split('-')[0];
    let detectedLang: Language | null = null;
    if (browserLang === 'ca') {
      detectedLang = 'ca';
    } else if (browserLang === 'eu') {
      detectedLang = 'eu';
    } else if (browserLang === 'es') {
      detectedLang = 'es';
    }

    if (detectedLang && detectedLang !== 'es' && !storedLang) {
      setSuggestedLanguage(detectedLang);
      setShowBanner(true);
    }
    
    setIsInitialized(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    setShowBanner(false);
  }, []);

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

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
