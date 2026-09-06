import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Printer, Sparkles, CheckCircle2, Circle, Clock, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { VoiceTextInput } from '@/components/VoiceTextInput';
import { analyzeProduct } from '@/services/productAnalysisService';
import type { ProductAnalysis, ComplianceStep } from '@/types/khojai';
import { ProvenanceBadge } from '@/components/trust/ProvenanceBadge';
import { VerificationNotice } from '@/components/trust/VerificationNotice';
import { SourcePanel } from '@/components/trust/SourcePanel';
import { StandardCard } from '@/components/StandardCard';
import { EmptyState } from '@/components/states/EmptyState';
import { KHOJAI_DISCLAIMER, BIS_LINKS } from '@/data/prototype-data';

const STAGES = ['Planning', 'Design', 'Prototyping', 'Pre-launch', 'Post-launch'];

export function CompliancePage() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState(searchParams.get('product') ?? '');
  const [material, setMaterial] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  const [manufacturingStage, setManufacturingStage] = useState('');
  const [result, setResult] = useState<ProductAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useSeo({
    title: 'Compliance Roadmap \u2014 KHOJAI',
    description: 'Build a structured BIS compliance roadmap for your product with guidance on standards, testing and certification.',
  });

  useEffect(() => {
    const p = searchParams.get('product');
    if (p) setDescription(p);
  }, [searchParams]);

  const handleAnalyze = () => {
    if (!description.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = analyzeProduct({
        name: name.trim() || 'Described product',
        description: description.trim(),
        material: material.trim() || undefined,
        intendedUse: intendedUse.trim() || undefined,
        targetUsers: targetUsers.trim() || undefined,
        manufacturingStage: manufacturingStage || undefined,
      });
      setResult(r);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-2">Build Your Compliance Roadmap</h1>
        <p className="muted">Describe your product and KHOJAI will generate a BIS compliance guidance roadmap.</p>
      </div>

      {/* Form */}
      <div className="card p-6 mb-8 no-print">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="p-name">Product name</label>
            <input id="p-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Children\u2019s educational toy" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="p-material">Material</label>
            <input id="p-material" className="input" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="e.g. Wood, plastic" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="p-use">Intended use</label>
            <input id="p-use" className="input" value={intendedUse} onChange={(e) => setIntendedUse(e.target.value)} placeholder="e.g. Educational play" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="p-users">Target users</label>
            <input id="p-users" className="input" value={targetUsers} onChange={(e) => setTargetUsers(e.target.value)} placeholder="e.g. Children 3+ years" />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="p-stage">Manufacturing stage</label>
            <select id="p-stage" className="input" value={manufacturingStage} onChange={(e) => setManufacturingStage(e.target.value)}>
              <option value="">Select stage</option>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-1.5" htmlFor="p-desc">Product description</label>
          <VoiceTextInput
            value={description}
            onChange={setDescription}
            onSubmit={handleAnalyze}
            placeholder="Describe what you\u2019re building\u2026"
            multiline
            ariaLabel="Product description"
          />
        </div>
        <button onClick={handleAnalyze} className="btn-primary" disabled={!description.trim() || loading}>
          <Sparkles className="w-4 h-4" />
          {loading ? 'Analyzing\u2026' : 'Generate Roadmap'}
        </button>
      </div>

      {loading && (
        <div className="space-y-3 mb-8">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 rounded-xl bg-ink-850/60 animate-pulse" />)}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-6 print-block">
          {/* Header for print */}
          <div className="flex items-center justify-between no-print">
            <div className="flex flex-wrap items-center gap-2">
              <ProvenanceBadge label="Guidance" />
              <VerificationNotice />
            </div>
            <button onClick={() => window.print()} className="btn-secondary text-sm no-print">
              <Printer className="w-4 h-4" /> Print Roadmap
            </button>
          </div>

          {/* Print-only header */}
          <div className="hidden print:block mb-4">
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>KHOJAI Compliance Roadmap</h1>
            <p style={{ fontSize: 12, color: '#666' }}>Guidance analysis \u2014 must be verified against authoritative BIS sources.</p>
          </div>

          {/* Product interpretation */}
          <div className="card p-6">
            <h2 className="font-display font-semibold text-white mb-3">Product Interpretation</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Name</p>
                <p className="text-sm text-slate-100">{result.productProfile.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Category</p>
                <p className="text-sm text-slate-100">{result.productProfile.interpretedCategory}</p>
              </div>
            </div>
            {result.productProfile.characteristics.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 mb-2">Characteristics</p>
                <ul className="space-y-1">
                  {result.productProfile.characteristics.map((c, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-cyan">\u2022</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Roadmap steps */}
          <div>
            <h2 className="section-title mb-4">Compliance Roadmap</h2>
            <div className="space-y-3">
              {result.complianceSteps.map((step) => (
                <RoadmapStep key={step.id} step={step} />
              ))}
            </div>
          </div>

          {/* Testing path */}
          {result.testingPath.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display font-semibold text-white mb-3">Testing Path</h2>
              <ol className="space-y-2">
                {result.testingPath.map((p, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-cyan font-mono text-xs mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    {p}
                  </li>
                ))}
              </ol>
              <div className="mt-4">
                <a href={BIS_LINKS.directory} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                  <ExternalLink className="w-4 h-4" />
                  Find BIS Laboratories
                </a>
              </div>
            </div>
          )}

          {/* Standards */}
          {result.standards.length > 0 && (
            <div>
              <h2 className="section-title mb-4">Potentially Relevant Standards</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.standards.map((s) => <StandardCard key={s.id} standard={s} />)}
              </div>
            </div>
          )}

          {/* BIS services */}
          {result.services.length > 0 && (
            <div>
              <h2 className="section-title mb-4">Official BIS Resources</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.services.map((s) => (
                  <div key={s.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-semibold text-white text-sm">{s.name}</h3>
                      <ProvenanceBadge label="Official BIS" />
                    </div>
                    <p className="text-sm muted mb-3">{s.description}</p>
                    <a href={s.actionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-cyan hover:text-cyan-glow">
                      <ExternalLink className="w-3.5 h-3.5" /> {s.actionLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.standards.length === 0 && (
            <EmptyState message="No specific standards matched this product. Try a more detailed description, or search the BIS Know Your Standard portal." />
          )}

          {/* Provenance */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-cyan" />
              <p className="text-sm font-medium text-slate-100">Data Provenance</p>
            </div>
            <p className="text-xs muted">{result.provenance.label} \u2014 {result.provenance.notes}</p>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg bg-warm/5 border border-warm/10 p-4">
            <p className="text-xs text-slate-400 leading-relaxed">{KHOJAI_DISCLAIMER}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RoadmapStep({ step }: { step: ComplianceStep }) {
  const icon = step.status === 'complete' ? CheckCircle2 : step.status === 'in-progress' ? Clock : step.status === 'unknown' ? AlertCircle : Circle;
  const color = step.status === 'complete' ? 'text-success' : step.status === 'in-progress' ? 'text-cyan' : step.status === 'unknown' ? 'text-warm' : 'text-slate-500';
  const Icon = icon;
  return (
    <div className="card p-5 flex items-start gap-4">
      <div className={`shrink-0 ${color}`}>
        <Icon className="w-5 h-5 mt-0.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-slate-500">{String(step.order).padStart(2, '0')}</span>
          <h3 className="font-display font-semibold text-white text-sm">{step.title}</h3>
          {step.isGuidance && <ProvenanceBadge label="Guidance" />}
        </div>
        <p className="text-sm muted">{step.description}</p>
      </div>
    </div>
  );
}
