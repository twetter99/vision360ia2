
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
    
    // 1. Leer la cookie 'lang' establecida por el middleware (geolocalización)
    const cookieLang = document.cookie
      .split('; ')
      .find(row => row.startsWith('lang='))
      ?.split('=')[1] as Language | undefined;

    // 2. Verificar si hay un idioma guardado en localStorage (preferencia explícita del usuario)
    const storedLang = localStorage.getItem('language') as Language | null;
    
    // 3. Si hay preferencia explícita en localStorage
    if (storedLang && ['es', 'ca', 'eu'].includes(storedLang)) {
      setLanguageState(storedLang);
      
      // Si el middleware detectó un idioma diferente al almacenado, sugerir cambio
      if (cookieLang && cookieLang !== storedLang && ['es', 'ca', 'eu'].includes(cookieLang)) {
        setSuggestedLanguage(cookieLang);
        setShowBanner(true);
      }
      
      setIsInitialized(true);
      return;
    }

    // 4. Si no hay preferencia explícita, usar la cookie del middleware
    if (cookieLang && ['es', 'ca', 'eu'].includes(cookieLang)) {
      setLanguageState(cookieLang);
      // Guardar en localStorage para futuras visitas
      localStorage.setItem('language', cookieLang);
      setIsInitialized(true);
      return;
    }

    // 5. Fallback al idioma del navegador (como última opción)
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
