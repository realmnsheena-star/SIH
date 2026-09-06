import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/types/khojai';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'HI' },
  { code: 'kn', label: 'KN' },
];

export function LanguageSelector({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label="Language selector">
      <Globe className="w-3.5 h-3.5 text-slate-500 mr-1" />
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLanguage(l.code)}
          aria-label={`Switch language to ${l.label}`}
          aria-pressed={language === l.code}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
            language === l.code
              ? 'bg-cyan/15 text-cyan'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
