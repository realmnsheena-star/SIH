import type { ConfidenceLevel } from '@/types/khojai';

const config: Record<ConfidenceLevel, { label: string; cls: string; dot: string }> = {
  high: { label: 'High confidence', cls: 'bg-success/10 text-success border-success/20', dot: 'bg-success' },
  medium: { label: 'Medium confidence', cls: 'bg-cyan/10 text-cyan border-cyan/20', dot: 'bg-cyan' },
  low: { label: 'Low confidence', cls: 'bg-warm/10 text-warm border-warm/20', dot: 'bg-warm' },
  unknown: { label: 'Unknown confidence', cls: 'bg-slate-500/10 text-slate-400 border-slate-500/20', dot: 'bg-slate-500' },
};

export function ConfidenceBadge({ level, className = '' }: { level: ConfidenceLevel; className?: string }) {
  const c = config[level];
  return (
    <span className={`chip ${c.cls} ${className}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
