import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

const NAV_ITEMS = [
  { to: '/', key: 'nav.home' },
  { to: '/standards', key: 'nav.standards' },
  { to: '/ask', key: 'nav.ask' },
  { to: '/bis-services', key: 'nav.bis' },
  { to: '/testing-labs', key: 'nav.labs' },
  { to: '/compliance', key: 'nav.compliance' },
  { to: '/resources', key: 'nav.resources' },
];

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/5 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="KHOJAI home">
            <div className="relative w-9 h-9 rounded-xl bg-ink-800 border border-cyan/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-2 border-cyan" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-warm" />
            </div>
            <div className="leading-none">
              <span className="font-display font-bold text-white text-lg tracking-tight">KHOJAI</span>
              <span className="block text-[10px] text-cyan/70 font-medium tracking-wide">Ask. Discover. Comply.</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-cyan bg-cyan/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <Link to="/ask" className="btn-primary text-sm">
              <Sparkles className="w-4 h-4" />
              {t('nav.ask')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden border-t border-white/5 bg-ink-900/95 backdrop-blur-md no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? 'text-cyan bg-cyan/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5">
              <LanguageSelector />
              <Link to="/ask" onClick={() => setOpen(false)} className="btn-primary text-sm">
                <Sparkles className="w-4 h-4" />
                {t('nav.ask')}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
