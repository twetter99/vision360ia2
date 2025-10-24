'use client';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '../ui/button';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LanguageBanner() {
  const {
    suggestedLanguage,
    setLanguage,
    translations,
    showBanner,
    setShowBanner,
  } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showBanner) {
      // Delay showing the banner slightly to avoid layout shifts on load
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showBanner]);

  if (!isVisible) {
    return null;
  }

  const handleConfirm = () => {
    if (suggestedLanguage) {
      setLanguage(suggestedLanguage);
    }
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };
  
  const t = translations.languageBanner;
  
  const bannerText = t.suggestion.replace('{lang}', t.languages[suggestedLanguage || 'es']);


  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
      <div className="rounded-lg bg-background p-4 shadow-lg border">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className='flex-grow'>
                <h4 className="font-semibold text-foreground">{t.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {bannerText}
                </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleDismiss}>
              {t.dismiss}
            </Button>
            <Button size="sm" onClick={handleConfirm} className='bg-accent text-accent-foreground hover:bg-accent/90'>
              {t.confirm}
            </Button>
          </div>
      </div>
    </div>
  );
}
