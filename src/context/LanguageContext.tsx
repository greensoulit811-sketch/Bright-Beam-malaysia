import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSettings } from '@/hooks/useDatabase';
import { translations, Language } from '@/lib/translations';
import { useLocation } from 'react-router-dom';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  t: (key) => key,
  isRTL: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { data: settings } = useSettings();
  const location = useLocation();
  const language = ((settings as any)?.language || 'en') as Language;
  const isAdminRoute = location.pathname.startsWith('/admin');
  // RTL only applies to frontend, never admin
  const isRTL = language === 'ar' && !isAdminRoute;

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  useEffect(() => {
    // Only set RTL on frontend pages, admin always stays LTR
    if (isAdminRoute) {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isAdminRoute]);

  return (
    <LanguageContext.Provider value={{ language, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
