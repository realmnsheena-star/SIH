import { Inbox } from 'lucide-react';

export function EmptyState({ message = 'No results found.', className = '' }: { message?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 text-slate-400 ${className}`}>
      <Inbox className="w-8 h-8 text-slate-600" />
      <span className="text-sm">{message}</span>
    </div>
  );
}
