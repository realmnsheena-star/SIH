import { Library } from 'lucide-react';
import type { StandardSource } from '@/types/khojai';
import { SourceCard } from './SourceCard';

export function SourcePanel({ sources, className = '' }: { sources: StandardSource[]; className?: string }) {
  if (sources.length === 0) {
    return (
      <div className={`card p-4 ${className}`}>
        <div className="flex items-center gap-2 text-slate-400">
          <Library className="w-4 h-4" />
          <span className="text-sm">Source unavailable</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500 font-medium">
        <Library className="w-3.5 h-3.5" />
        Sources & provenance
      </div>
      {sources.map((s) => (
        <SourceCard key={s.id} source={s} />
      ))}
    </div>
  );
}
