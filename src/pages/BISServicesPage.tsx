import { useMemo } from 'react';
import { Users, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { listServices, getServiceCategories } from '@/services/bisService';
import { SourcePanel } from '@/components/trust/SourcePanel';
import { EmptyState } from '@/components/states/EmptyState';
import { KHOJAI_DISCLAIMER } from '@/data/prototype-data';

export function BISServicesPage() {
  useSeo({
    title: 'BIS Services \u2014 KHOJAI',
    description: 'Explore official BIS resources including Know Your Standard, Product Certification, Compulsory Certification, Licence applications and laboratory services.',
  });

  const services = useMemo(() => listServices(), []);
  const categories = useMemo(() => getServiceCategories(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-2">BIS Services</h1>
        <p className="muted">Official BIS resources to help you navigate standards, certification and compliance.</p>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <span key={c} className="chip bg-cyan/5 text-cyan/90 border-cyan/15">{c}</span>
        ))}
      </div>

      {services.length === 0 ? (
        <EmptyState message="No BIS resources available." />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className="card p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display font-semibold text-white">{s.name}</h2>
                <span className="chip bg-cyan/10 text-cyan border-cyan/20 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  Official BIS resource
                </span>
              </div>
              <p className="text-sm muted">{s.description}</p>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-2">Who it may help</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.whoItHelps.map((w) => (
                    <span key={w} className="chip bg-white/5 text-slate-300 border-white/10">
                      <Users className="w-2.5 h-2.5" /> {w}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-2">Process information</p>
                <ul className="space-y-1.5">
                  {s.processInfo.map((p, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={s.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm mt-1"
              >
                <ExternalLink className="w-4 h-4" />
                {s.actionLabel}
              </a>

              <SourcePanel sources={s.sources} />
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-10 rounded-lg bg-warm/5 border border-warm/10 p-4">
        <p className="text-xs text-slate-400 leading-relaxed">{KHOJAI_DISCLAIMER}</p>
      </div>
    </div>
  );
}
