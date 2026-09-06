import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading…', className = '' }: { message?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-12 text-slate-400 ${className}`}>
      <Loader2 className="w-5 h-5 animate-spin text-cyan" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
