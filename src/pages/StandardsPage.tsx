import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Tag, Info } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { VoiceTextInput } from '@/components/VoiceTextInput';
import { StandardCard } from '@/components/StandardCard';
import { EmptyState } from '@/components/states/EmptyState';
import { filterStandards, getCategories, getTags } from '@/services/standardsService';
import { KHOJAI_DISCLAIMER } from '@/data/prototype-data';

export function StandardsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('product') ?? '');
  const [category, setCategory] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  useSeo({
    title: 'Standards \u2014 KHOJAI',
    description: 'Search and explore potentially relevant Indian Standards by product, keyword or category.',
  });

  useEffect(() => {
    const p = searchParams.get('product');
    if (p) setQuery(p);
  }, [searchParams]);

  const categories = useMemo(() => getCategories(), []);
  const tags = useMemo(() => getTags(), []);

  const results = useMemo(
    () => filterStandards({ query, category: category || undefined, tag: tag || undefined }),
    [query, category, tag]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="section-title mb-2">Standards</h1>
        <p className="muted">Search by product, standard, keyword or describe what you\u2019re building.</p>
      </div>

      {/* Guidance notice */}
      <div className="rounded-xl bg-cyan/5 border border-cyan/15 p-4 mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed">
            KHOJAI provides guidance to help you understand BIS requirements. Always verify the latest standard, amendments and certification requirements on the official BIS website.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <VoiceTextInput
          value={query}
          onChange={setQuery}
          placeholder="Search by product, standard, keyword or describe what you\u2019re building\u2026"
          multiline
          ariaLabel="Standards search"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Filter className="w-3.5 h-3.5" /> Filters:
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-ink-850 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:border-cyan/50 focus:outline-none"
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="bg-ink-850 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:border-cyan/50 focus:outline-none"
          aria-label="Filter by tag"
        >
          <option value="">All tags</option>
          {tags.map((tg) => (
            <option key={tg} value={tg}>{tg}</option>
          ))}
        </select>

        {(category || tag || query) && (
          <button
            onClick={() => { setCategory(''); setTag(''); setQuery(''); }}
            className="text-xs text-slate-400 hover:text-cyan"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="text-sm muted mb-4">
        {results.length} standard{results.length !== 1 ? 's' : ''} found
      </p>

      {results.length === 0 ? (
        <EmptyState message="No standards match your search. Try a different product description or keyword." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((s) => (
            <StandardCard key={s.id} standard={s} />
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
