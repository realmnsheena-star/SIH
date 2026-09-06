import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Search, ArrowRight, Mic, Brain, FileCheck, ShieldCheck, Users, GraduationCap, Package, Lightbulb, Wrench, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSeo } from '@/hooks/useSeo';
import { VoiceTextInput } from '@/components/VoiceTextInput';
import { ProvenanceBadge } from '@/components/trust/ProvenanceBadge';
import { analyzeProduct } from '@/services/productAnalysisService';
import type { ProductAnalysis } from '@/types/khojai';

const EXAMPLE = 'I want to manufacture a children\u2019s educational toy.';

const STEPS = [
  { num: '01', title: 'Describe', desc: 'Tell KHOJAI what you\u2019re building.', icon: Mic },
  { num: '02', title: 'Discover', desc: 'Find potentially relevant standards.', icon: Search },
  { num: '03', title: 'Understand', desc: 'Get plain-language explanations.', icon: BookOpen },
  { num: '04', title: 'Comply', desc: 'Follow a structured compliance journey.', icon: FileCheck },
];

const AUDIENCES = [
  { icon: Package, title: 'Manufacturers', desc: 'Understand what standards may apply before you produce.' },
  { icon: Lightbulb, title: 'Entrepreneurs', desc: 'Get a head start on compliance for a new product idea.' },
  { icon: Users, title: 'Consumers', desc: 'Learn what safety standards a product category may involve.' },
  { icon: GraduationCap, title: 'Students & Researchers', desc: 'Explore standards, BIS services and testing pathways.' },
];

export function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [demoResult, setDemoResult] = useState<ProductAnalysis | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);

  useSeo({
    title: 'KHOJAI \u2014 Ask. Discover. Comply.',
    description:
      'Describe your product, explore potentially relevant standards, understand BIS services and follow a structured compliance journey.',
  });

  const handleAnalyze = () => {
    const desc = input.trim() || EXAMPLE;
    navigate(`/compliance?product=${encodeURIComponent(desc)}`);
  };

  const handleExplore = () => {
    navigate(`/standards${input.trim() ? `?product=${encodeURIComponent(input.trim())}` : ''}`);
  };

  const runDemo = () => {
    setDemoLoading(true);
    setDemoResult(null);
    setTimeout(() => {
      const result = analyzeProduct({ name: 'Children\u2019s educational toy', description: EXAMPLE });
      setDemoResult(result);
      setDemoLoading(false);
    }, 700);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 chip bg-cyan/10 text-cyan border-cyan/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                {t('hero.tagline')}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {t('hero.headline')}
              </h1>
              <p className="mt-5 text-lg muted max-w-xl leading-relaxed">{t('hero.description')}</p>

              <div className="mt-8">
                <VoiceTextInput
                  value={input}
                  onChange={setInput}
                  onSubmit={handleAnalyze}
                  placeholder={t('hero.inputPlaceholder')}
                  showSubmit={false}
                  multiline
                  ariaLabel="Product description input"
                />
                <div className="flex flex-wrap gap-3 mt-4">
                  <button onClick={handleAnalyze} className="btn-primary">
                    <Sparkles className="w-4 h-4" />
                    {t('hero.analyze')}
                  </button>
                  <button onClick={handleExplore} className="btn-secondary">
                    <Search className="w-4 h-4" />
                    {t('hero.explore')}
                  </button>
                </div>
              </div>
            </div>

            {/* KHOJAI Intelligence demo panel */}
            <div className="glass-strong rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan" />
                  <h2 className="font-display font-semibold text-white">KHOJAI Intelligence</h2>
                </div>
                <ProvenanceBadge label="Guidance" />
              </div>
              <p className="text-xs muted mb-4">
                Try an example: <span className="text-slate-300 italic">\u201c{EXAMPLE}\u201d</span>
              </p>
              <button onClick={runDemo} className="btn-secondary w-full text-sm mb-4" disabled={demoLoading}>
                <Sparkles className="w-4 h-4" />
                Run demo
              </button>

              {demoLoading && (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 rounded-lg bg-ink-800/60 animate-pulse" />
                  ))}
                </div>
              )}

              {demoResult && !demoLoading && (
                <div className="space-y-3">
                  <DemoRow icon={Package} label="Product understood" value={demoResult.productProfile.name} />
                  <DemoRow icon={Search} label="Standards discovered" value={`${demoResult.standards.length} potentially relevant`} />
                  <DemoRow icon={ShieldCheck} label="BIS resources" value={`${demoResult.services.length} official resources`} />
                  <DemoRow icon={FileCheck} label="Compliance roadmap" value={`${demoResult.complianceSteps.length} steps`} />
                  <div className="flex items-center gap-2 pt-2">
                    <ProvenanceBadge label="Guidance" />
                  </div>
                  <Link to="/compliance" className="inline-flex items-center gap-1 text-sm text-cyan hover:text-cyan-glow pt-1">
                    See full roadmap <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {!demoResult && !demoLoading && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  Click \u201cRun demo\u201d to see how KHOJAI processes a product.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How KHOJAI Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="section-title text-center mb-2">How KHOJAI Works</h2>
        <p className="text-center muted mb-10 max-w-2xl mx-auto">A simple four-step journey from idea to compliance.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div key={step.num} className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs text-slate-500">{step.num}</span>
              </div>
              <h3 className="font-display font-semibold text-white mb-1">{step.title}</h3>
              <p className="text-sm muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who It Helps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="section-title text-center mb-10">Who It Helps</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AUDIENCES.map((a) => (
            <div key={a.title} className="card card-hover p-6">
              <div className="w-10 h-10 rounded-xl bg-warm/10 flex items-center justify-center text-warm mb-4">
                <a.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-white mb-1">{a.title}</h3>
              <p className="text-sm muted">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-strong rounded-2xl p-8 sm:p-12 text-center">
          <Wrench className="w-8 h-8 text-cyan mx-auto mb-4" />
          <h2 className="section-title mb-3">Ready to explore standards for your product?</h2>
          <p className="muted max-w-xl mx-auto mb-6">
            Describe what you\u2019re building and KHOJAI will show potentially relevant standards, BIS resources and a compliance roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/ask" className="btn-primary">
              <Sparkles className="w-4 h-4" />
              Ask KHOJAI
            </Link>
            <Link to="/standards" className="btn-secondary">
              <Search className="w-4 h-4" />
              Browse Standards
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function DemoRow({ icon: Icon, label, value }: { icon: typeof Mic; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-ink-800/40 border border-white/5 p-3">
      <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-slate-100 truncate">{value}</p>
      </div>
    </div>
  );
}
