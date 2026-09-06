import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Loader2, Pencil, Search, AlertTriangle } from 'lucide-react';
import type { ProductProfile } from '@/types/khojai';
import { generateVisualization } from '@/services/productImageService';
import { ProvenanceBadge } from './trust/ProvenanceBadge';

interface ProductVisualizationCardProps {
  profile: ProductProfile;
  onEdit?: () => void;
  className?: string;
}

type State = 'initial' | 'generating' | 'generated' | 'error';

export function ProductVisualizationCard({ profile, onEdit, className = '' }: ProductVisualizationCardProps) {
  const [state, setState] = useState<State>('initial');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    setState('generating');
    const t = setTimeout(() => {
      try {
        const viz = generateVisualization(profile);
        setImageUrl(viz.imageUrl);
        setState('generated');
      } catch {
        setState('error');
      }
    }, 600);
    return () => clearTimeout(t);
  }, [profile]);

  return (
    <div className={`card p-5 flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-white flex items-center gap-2">
          <Image className="w-4 h-4 text-cyan" />
          Product Visualization
        </h3>
        <ProvenanceBadge label="Concept" />
      </div>

      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-ink-850 border border-white/5 flex items-center justify-center">
        {state === 'initial' || state === 'generating' ? (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-cyan" />
            <span className="text-xs">Generating visualization…</span>
          </div>
        ) : state === 'error' ? (
          <div className="flex flex-col items-center gap-2 text-error">
            <AlertTriangle className="w-6 h-6" />
            <span className="text-xs">Could not generate visualization.</span>
          </div>
        ) : (
          <img src={imageUrl} alt={`Concept visualization of ${profile.name}`} className="w-full h-full object-cover" />
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-100">{profile.name}</p>
        <p className="text-xs muted mt-1">{profile.interpretedCategory}</p>
      </div>

      {profile.characteristics.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-2">Product characteristics</p>
          <ul className="space-y-1">
            {profile.characteristics.map((c, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-cyan mt-0.5">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-slate-500 italic">
        Concept visualization only — not a technical drawing or certification evidence.
      </p>

      <div className="flex gap-2 pt-1">
        <Link to={`/standards?product=${encodeURIComponent(profile.name)}`} className="btn-primary flex-1 text-sm">
          <Search className="w-4 h-4" />
          Find Relevant Standards
        </Link>
        {onEdit && (
          <button type="button" onClick={onEdit} className="btn-secondary text-sm">
            <Pencil className="w-4 h-4" />
            Edit Description
          </button>
        )}
      </div>
    </div>
  );
}
