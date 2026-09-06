import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { FOOTER_DISCLAIMER } from '@/data/prototype-data';

const FOOTER_LINKS = [
  { to: '/', key: 'nav.home' },
  { to: '/standards', key: 'nav.standards' },
  { to: '/ask', key: 'nav.ask' },
  { to: '/bis-services', key: 'nav.bis' },
  { to: '/testing-labs', key: 'nav.labs' },
  { to: '/compliance', key: 'nav.compliance' },
  { to: '/resources', key: 'nav.resources' },
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/5 bg-ink-950/80 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="relative w-8 h-8 rounded-lg bg-ink-800 border border-cyan/20 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan" />
              </div>
              <span className="font-display font-bold text-white text-lg">KHOJAI</span>
            </div>
            <p className="text-sm text-cyan/70 font-medium mb-1">Ask. Discover. Comply.</p>
            <p className="text-xs muted max-w-xs">
              A guidance tool to help you navigate BIS compliance requirements.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-3">Navigation</p>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-300 hover:text-cyan transition-colors">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-3">Trust Center</p>
            <Link to="/resources" className="text-sm text-slate-300 hover:text-cyan transition-colors block mb-2">
              How KHOJAI works
            </Link>
            <Link to="/resources" className="text-sm text-slate-300 hover:text-cyan transition-colors block mb-2">
              Data provenance & guidance
            </Link>
            <Link to="/resources" className="text-sm text-slate-300 hover:text-cyan transition-colors block">
              Disclaimer
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex items-start gap-2 rounded-xl bg-warm/5 border border-warm/15 p-4">
            <p className="text-xs text-warm/90 leading-relaxed">{FOOTER_DISCLAIMER}</p>
          </div>
          <p className="mt-4 text-xs text-slate-600">
            KHOJAI is not an official BIS product and is not affiliated with the Bureau of Indian Standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
