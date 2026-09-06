import { FileText, ExternalLink } from 'lucide-react';
import type { StandardSource } from '@/types/khojai';
import { getSourceLabel } from '@/services/sourceService';

export function SourceCard({ source, className = '' }: { source: StandardSource; className?: string }) {
  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-cyan">
          <FileText className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-100 truncate">{source.title}</p>
          <p className="text-xs muted mt-0.5">{getSourceLabel(source)}</p>
          <p className="text-xs muted font-mono mt-1">{source.reference}</p>
          {source.section && <p className="text-xs muted mt-0.5">{source.section}</p>}
          {source.notes && <p className="text-xs muted mt-1 italic">{source.notes}</p>}
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-cyan hover:text-cyan-glow mt-2"
            >
              Open source <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
