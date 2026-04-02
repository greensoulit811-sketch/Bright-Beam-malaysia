import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 hover-neon transition-colors duration-300 text-foreground text-xs font-body tracking-wide uppercase"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span>{language === 'en' ? 'عربي' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
