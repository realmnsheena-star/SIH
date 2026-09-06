import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Tag, Layers, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { getStandardById, getRelatedStandards } from '@/services/standardsService';
import { getServicesForStandard } from '@/services/bisService';
import { ConfidenceBadge } from '@/components/trust/ConfidenceBadge';
import { ProvenanceBadge } from '@/components/trust/ProvenanceBadge';
import { VerificationNotice } from '@/components/trust/VerificationNotice';
import { SourcePanel } from '@/components/trust/SourcePanel';
import { EmptyState } from '@/components/states/EmptyState';
import { StandardCard } from '@/components/StandardCard';
import { KHOJAI_DISCLAIMER } from '@/data/prototype-data';

export function StandardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [showExplanation, setShowExplanation] = useState(false);

  const standard = useMemo(() => (id ? getStandardById(id) : undefined), [id]);

  useSeo({
    title: standard ? `${standard.title} \u2014 KHOJAI` : 'Standard not found \u2014 KHOJAI',
    description: standard?.summary,
  });

  if (!standard) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <EmptyState message="This standard was not found." />
        <Link to="/standards" className="btn-secondary mt-4">
          <ArrowLeft className="w-4 h-4" /> Back to Standards
        </Link>
      </div>
    );
  }

  const related = getRelatedStandards(standard.id);
  const services = getServicesForStandard(standard.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/standards" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Standards
      </Link>

      <div className="card p-6 sm:p-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> {standard.code}
          </span>
          <ProvenanceBadge label="Guidance" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">{standard.title}</h1>
        <p className="muted leading-relaxed mb-4">{standard.summary}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <VerificationNotice label="Verify with BIS" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-1">Category</p>
            <p className="text-sm text-slate-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan" /> {standard.category}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-1">Applicability</p>
            <p className="text-sm text-slate-200">{standard.applicability}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {standard.tags.map((tag) => (
            <span key={tag} className="chip bg-white/5 text-slate-400 border-white/10">
              <Tag className="w-2.5 h-2.5" /> {tag}
            </span>
          ))}
        </div>

        {standard.bisUrl && (
          <a
            href={standard.bisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View on Official BIS
          </a>
        )}

        <button
          onClick={() => setShowExplanation((v) => !v)}
          className="btn-secondary text-sm ml-2"
          aria-expanded={showExplanation}
        >
          <BookOpen className="w-4 h-4" />
          {showExplanation ? 'Hide explanation' : 'Explain this standard'}
        </button>

        {showExplanation && (
          <div className="mt-4 rounded-xl bg-ink-850/60 border border-cyan/15 p-5">
            <p className="text-xs uppercase tracking-wide text-cyan font-medium mb-2">Plain-language explanation</p>
            <p className="text-sm text-slate-200 leading-relaxed">{standard.plainLanguageExplanation}</p>
            <div className="mt-3">
              <ProvenanceBadge label="Guidance" />
            </div>
          </div>
        )}
      </div>

      {/* Related BIS services */}
      <div className="card p-5 mb-6">
        <h2 className="font-display font-semibold text-white mb-3 text-sm">Related BIS Resources</h2>
        {services.length === 0 ? (
          <p className="text-sm muted">No specific BIS resources linked. Visit the BIS Services page for all official resources.</p>
        ) : (
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to="/bis-services" className="text-sm text-cyan hover:text-cyan-glow flex items-center gap-1">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sources */}
      <SourcePanel sources={standard.sources} className="mb-6" />

      {/* Related standards */}
      {related.length > 0 && (
        <div>
          <h2 className="section-title mb-4">Related standards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {related.map((s) => (
              <StandardCard key={s.id} standard={s} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-10 rounded-lg bg-warm/5 border border-warm/10 p-4">
        <p className="text-xs text-slate-400 leading-relaxed">{KHOJAI_DISCLAIMER}</p>
      </div>
    </div>
  );
}
