import { Compass } from 'lucide-react';

export function ProvenanceBadge({ label = 'Guidance', className = '' }: { label?: string; className?: string }) {
  return (
    <span className={`chip-guidance ${className}`}>
      <Compass className="w-3 h-3" />
      {label}
    </span>
  );
}
