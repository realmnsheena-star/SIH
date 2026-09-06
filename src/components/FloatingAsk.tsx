import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface FloatingAskProps {
  context?: string;
}

export function FloatingAsk({ context }: FloatingAskProps) {
  const location = useLocation();
  // Don't show on the ask page itself
  if (location.pathname === '/ask') return null;

  const query = context ? `?q=${encodeURIComponent(context)}` : '';
  return (
    <Link
      to={`/ask${query}`}
      className="fixed bottom-6 right-6 z-30 btn-primary shadow-glow rounded-full px-5 py-3.5 text-sm no-print"
      aria-label="Ask KHOJAI"
    >
      <Sparkles className="w-4 h-4" />
      <span className="hidden sm:inline">Ask KHOJAI</span>
    </Link>
  );
}
