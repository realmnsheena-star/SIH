import { ShieldCheck } from 'lucide-react';

export function VerificationNotice({ label = 'Verify with BIS', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`chip-verify ${className}`}>
      <ShieldCheck className="w-3 h-3" />
      {label}
    </div>
  );
}
