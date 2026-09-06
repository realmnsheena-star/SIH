import { ExternalLink, FlaskConical, Search } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { BIS_LINKS, KHOJAI_DISCLAIMER } from '@/data/prototype-data';

const TESTING_STEPS = [
  { num: '01', title: 'Identify applicable standard', desc: 'Determine which Indian Standard applies to your product.' },
  { num: '02', title: 'Identify required test parameters', desc: 'Review the standard to understand what testing is required.' },
  { num: '03', title: 'Find an appropriate BIS-recognised/empanelled laboratory', desc: 'Search the official BIS directory for recognised laboratories.' },
  { num: '04', title: 'Conduct required testing', desc: 'Submit your product for testing according to the applicable procedure.' },
  { num: '05', title: 'Obtain and retain test evidence/report', desc: 'Keep the test report as conformity evidence.' },
  { num: '06', title: 'Review conformity and address gaps', desc: 'Review results and address any non-conformities before proceeding.' },
];

export function TestingLabsPage() {
  useSeo({
    title: 'Testing Labs \u2014 KHOJAI',
    description: 'Understand the testing pathway and find BIS-recognised laboratories through official BIS resources.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-2">Testing Labs</h1>
        <p className="muted">Understand the testing pathway and find BIS-recognised laboratories through official BIS resources.</p>
      </div>

      {/* Guidance notice */}
      <div className="rounded-xl bg-cyan/5 border border-cyan/15 p-4 mb-8">
        <div className="flex items-start gap-2">
          <FlaskConical className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed">
            KHOJAI does not maintain its own laboratory database. To find BIS-recognised/empanelled laboratories, use the official BIS Directory. Always verify laboratory recognition status directly with BIS.
          </p>
        </div>
      </div>

      {/* Testing path steps */}
      <div className="mb-8">
        <h2 className="font-display font-semibold text-white mb-4">Testing Path</h2>
        <div className="space-y-3">
          {TESTING_STEPS.map((step) => (
            <div key={step.num} className="card p-5 flex items-start gap-4">
              <div className="shrink-0">
                <span className="font-mono text-xs text-cyan bg-cyan/10 rounded-lg px-2.5 py-1.5">{step.num}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-white text-sm mb-1">{step.title}</h3>
                <p className="text-sm muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Find BIS Laboratories button */}
      <div className="card p-6 text-center mb-8">
        <h2 className="font-display font-semibold text-white mb-2">Find BIS-Recognised Laboratories</h2>
        <p className="text-sm muted mb-4 max-w-xl mx-auto">
          Search the official BIS Directory for recognised and empanelled testing laboratories. Verify recognition status directly with BIS.
        </p>
        <a
          href={BIS_LINKS.directory}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <ExternalLink className="w-4 h-4" />
          Find BIS Laboratories
        </a>
      </div>

      {/* Additional BIS resources */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-5">
          <h3 className="font-display font-semibold text-white text-sm mb-2">BIS Know Your Standard</h3>
          <p className="text-sm muted mb-3">Search for standards and access related laboratory information.</p>
          <a href={BIS_LINKS.knowYourStandard} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-cyan hover:text-cyan-glow">
            <Search className="w-3.5 h-3.5" /> Open BIS Know Your Standard <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="card p-5">
          <h3 className="font-display font-semibold text-white text-sm mb-2">BIS Online Application Portal</h3>
          <p className="text-sm muted mb-3">Apply for BIS services through the official online portal (manakonline).</p>
          <a href={BIS_LINKS.manakonline} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-cyan hover:text-cyan-glow">
            <ExternalLink className="w-3.5 h-3.5" /> Open manakonline.in <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 rounded-lg bg-warm/5 border border-warm/10 p-4">
        <p className="text-xs text-slate-400 leading-relaxed">{KHOJAI_DISCLAIMER}</p>
      </div>
    </div>
  );
}
