import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Tag, ExternalLink, ShieldCheck } from 'lucide-react';
import type { Standard } from '@/types/khojai';
import { ProvenanceBadge } from './trust/ProvenanceBadge';
import { VerificationNotice } from './trust/VerificationNotice';

interface StandardCardProps {
  standard: Standard;
  showLink?: boolean;
  className?: string;
}

export function StandardCard({ standard, showLink = true, className = '' }: StandardCardProps) {
  return (
    <div className={`card card-hover p-5 flex flex-col gap-3 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs muted mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span className="font-mono">{standard.code}</span>
          </div>
          <h3 className="font-display font-semibold text-white leading-snug">{standard.title}</h3>
        </div>
        <ProvenanceBadge label="Guidance" />
      </div>

      <p className="text-sm muted line-clamp-3">{standard.summary}</p>

      {standard.applicability && (
        <p className="text-xs text-slate-400">
          <span className="text-slate-500">Applicability: </span>
          {standard.applicability}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {standard.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="chip bg-white/5 text-slate-400 border-white/10">
            <Tag className="w-2.5 h-2.5" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-1">
        <VerificationNotice label="Verify with BIS" />
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        {standard.bisUrl && (
          <a
            href={standard.bisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-cyan hover:text-cyan-glow"
          >
            View on Official BIS <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {showLink && (
          <Link
            to={`/standards/${standard.id}`}
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan"
          >
            View details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
