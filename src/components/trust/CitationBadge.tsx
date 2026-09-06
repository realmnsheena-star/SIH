import { Quote } from 'lucide-react';
import type { StandardSource } from '@/types/khojai';
import { getSourceLabel } from '@/services/sourceService';

export function CitationBadge({ source, className = '' }: { source: StandardSource; className?: string }) {
  return (
    <span className={`chip bg-cyan/5 text-cyan/90 border-cyan/15 ${className}`} title={source.reference}>
      <Quote className="w-3 h-3" />
      {getSourceLabel(source)}
    </span>
  );
}
