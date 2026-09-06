import { AlertTriangle } from 'lucide-react';

export function ErrorState({ message = 'Something went wrong.', className = '' }: { message?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 text-error ${className}`}>
      <AlertTriangle className="w-8 h-8" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
