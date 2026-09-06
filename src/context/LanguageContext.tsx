import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language } from '@/types/khojai';

interface LanguageContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: string) => string;
}

// Translation-ready. English is the working language.
// Technical BIS content is NOT translated — only UI strings.
const STRINGS: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.standards': 'Standards',
    'nav.ask': 'Ask KHOJAI',
    'nav.bis': 'BIS Services',
    'nav.labs': 'Testing Labs',
    'nav.compliance': 'Compliance',
    'nav.resources': 'Resources',
    'hero.tagline': 'Ask. Discover. Comply.',
    'hero.headline': 'Understand Indian Standards. Build with confidence.',
    'hero.description':
      'Describe your product, explore potentially relevant standards, understand BIS services and follow a structured compliance journey.',
    'hero.inputPlaceholder': "Describe what you're building…",
    'hero.analyze': 'Analyze Product',
    'hero.explore': 'Explore Standards',
    'common.guidance': 'Guidance',
    'common.verifyWithBis': 'Verify with BIS',
    'common.sourceUnavailable': 'Source unavailable',
    'common.officialBis': 'Official BIS resource',
  },
  hi: {
    'nav.home': 'होम',
    'nav.standards': 'मानक',
    'nav.ask': 'KHOJAI से पूछें',
    'nav.bis': 'BIS सेवाएँ',
    'nav.labs': 'परीक्षण प्रयोगशालाएँ',
    'nav.compliance': 'अनुपालन',
    'nav.resources': 'संसाधन',
    'hero.tagline': 'पूछें. खोजें. अनुपालन करें।',
    'hero.headline': 'भारतीय मानकों को समझें। आत्मविश्वास के साथ निर्माण करें।',
    'hero.description':
      'अपने उत्पाद का वर्णन करें, संभावित मानकों का पता लगाएँ, BIS सेवाओं को समझें और एक संरचित अनुपालन यात्रा का पालन करें।',
    'hero.inputPlaceholder': 'बताएँ कि आप क्या बना रहे हैं…',
    'hero.analyze': 'उत्पाद का विश्लेषण करें',
    'hero.explore': 'मानक देखें',
    'common.guidance': 'मार्गदर्शन',
    'common.verifyWithBis': 'BIS के साथ सत्यापित करें',
    'common.sourceUnavailable': 'स्रोत अनुपलब्ध',
    'common.officialBis': 'आधिकारिक BIS संसाधन',
  },
  kn: {
    'nav.home': 'ಮುಖಪುಟ',
    'nav.standards': 'ಮಾನದಂಡಗಳು',
    'nav.ask': 'KHOJAI ಗೆ ಕೇಳಿ',
    'nav.bis': 'BIS ಸೇವೆಗಳು',
    'nav.labs': 'ಪರೀಕ್ಷಣ ಪ್ರಯೋಗಾಲಯಗಳು',
    'nav.compliance': 'ಅನುವರ್ತನೆ',
    'nav.resources': 'ಸಂಪನ್ಮೂಲಗಳು',
    'hero.tagline': 'ಕೇಳಿ. ಪತ್ತೆ ಮಾಡಿ. ಅನುಸರಿಸಿ.',
    'hero.headline': 'ಭಾರತೀಯ ಮಾನದಂಡಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ನಿರ್ಮಿಸಿ.',
    'hero.description':
      'ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ವಿವರಿಸಿ, ಸಂಭಾವ್ಯ ಮಾನದಂಡಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, BIS ಸೇವೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ರಚನಾತ್ಮಕ ಅನುವರ್ತನೆ ಪಯಣವನ್ನು ಅನುಸರಿಸಿ.',
    'hero.inputPlaceholder': 'ನೀವು ನಿರ್ಮಿಸುತ್ತಿರುವುದನ್ನು ವಿವರಿಸಿ…',
    'hero.analyze': 'ಉತ್ಪನ್ನ ವಿಶ್ಲೇಷಿಸಿ',
    'hero.explore': 'ಮಾನದಂಡಗಳನ್ನು ನೋಡಿ',
    'common.guidance': 'ಮಾರ್ಗದರ್ಶನ',
    'common.verifyWithBis': 'BIS ನೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ',
    'common.sourceUnavailable': 'ಮೂಲ ಲಭ್ಯವಿಲ್ಲ',
    'common.officialBis': 'ಅಧಿಕೃತ BIS ಸಂಪನ್ಮೂಲ',
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback(
    (key: string) => {
      return STRINGS[language][key] ?? STRINGS.en[key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
