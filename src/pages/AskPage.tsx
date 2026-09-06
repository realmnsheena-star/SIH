import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Send, User, HelpCircle } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { VoiceTextInput } from '@/components/VoiceTextInput';
import { ProvenanceBadge } from '@/components/trust/ProvenanceBadge';
import { VerificationNotice } from '@/components/trust/VerificationNotice';
import { SourcePanel } from '@/components/trust/SourcePanel';
import { sendMessage, createInitialContext, QUICK_QUESTIONS } from '@/services/chatService';
import type { ChatMessage, ChatContext } from '@/types/khojai';

export function AskPage() {
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('q') ?? '');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [context, setContext] = useState<ChatContext>(createInitialContext());
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: 'Ask KHOJAI \u2014 Indian Standards & BIS Services',
    description: 'Ask KHOJAI about Indian Standards, BIS services, testing laboratories and your product.',
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');
    setLoading(true);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const result = await sendMessage(content, context);
    setContext(result.updatedContext);
    setMessages((prev) => [...prev, result.message]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="section-title mb-1">Ask KHOJAI</h1>
        <p className="muted">Ask about Indian Standards, BIS services or your product.</p>
      </div>

      {/* Quick questions */}
      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-3">Quick questions</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="card card-hover p-3 text-left text-sm text-slate-300 hover:text-cyan flex items-start gap-2"
              >
                <HelpCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat area */}
      <div ref={scrollRef} className="space-y-4 mb-4 max-h-[55vh] overflow-y-auto pr-1">
        {messages.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-500 text-sm">
            Start a conversation by asking a question or describing your product.
          </div>
        )}
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Sparkles className="w-4 h-4 text-cyan animate-pulse" />
            KHOJAI is thinking\u2026
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-ink-950/80 backdrop-blur-md pt-2 pb-1">
        <VoiceTextInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSend()}
          placeholder="Ask anything about your product\u2026"
          showSubmit
          submitLabel="Send"
          ariaLabel="Ask KHOJAI a question"
        />
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        isUser ? 'bg-ink-700 text-slate-300' : 'bg-cyan/10 text-cyan'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>
      <div className={`max-w-[80%] ${isUser ? 'items-end' : ''}`}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-medium text-cyan">KHOJAI</span>
            {message.isGuidance && <ProvenanceBadge label="Guidance" />}
          </div>
        )}
        <div className={`rounded-2xl p-4 text-sm whitespace-pre-wrap leading-relaxed ${
          isUser ? 'bg-ink-700 text-slate-100' : 'bg-ink-850/80 border border-white/5 text-slate-200'
        }`}>
          {message.content}
        </div>
        {!isUser && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-wrap items-center gap-2">
              {message.verification === 'verify-with-bis' && <VerificationNotice />}
              {message.verification === 'verified' && <VerificationNotice label="Official BIS resource" />}
            </div>
            {message.clarificationQuestions && message.clarificationQuestions.length > 0 && (
              <div className="rounded-lg bg-warm/5 border border-warm/15 p-3">
                <p className="text-xs text-warm mb-1.5">Clarification questions:</p>
                <ul className="space-y-1">
                  {message.clarificationQuestions.map((q, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-warm">\u2022</span> {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {message.sources && message.sources.length > 0 && (
              <SourcePanel sources={message.sources} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
