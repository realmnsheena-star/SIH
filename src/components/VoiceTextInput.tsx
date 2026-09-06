import { useRef, useState, useCallback, useEffect } from 'react';
import { Mic, MicOff, X, Send } from 'lucide-react';
import type { VoiceState } from '@/types/khojai';
import { useLanguage } from '@/context/LanguageContext';
import { createVoiceController, isVoiceSupported } from '@/services/voiceInputService';

interface VoiceTextInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  submitLabel?: string;
  showSubmit?: boolean;
  showClear?: boolean;
  multiline?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function VoiceTextInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type or speak…',
  submitLabel,
  showSubmit = false,
  showClear = true,
  multiline = false,
  ariaLabel = 'Text input with voice support',
  className = '',
}: VoiceTextInputProps) {
  const { language } = useLanguage();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [unsupportedNotice, setUnsupportedNotice] = useState(false);
  const controllerRef = useRef(createVoiceController());
  const supported = isVoiceSupported();

  useEffect(() => {
    if (!supported && voiceState === 'idle') {
      // don't show notice until user tries
    }
  }, [supported, voiceState]);

  const handleMic = useCallback(() => {
    if (!supported) {
      setVoiceState('unsupported');
      setUnsupportedNotice(true);
      return;
    }
    if (voiceState === 'listening') {
      controllerRef.current.stop();
      setVoiceState('idle');
      return;
    }
    setUnsupportedNotice(false);
    controllerRef.current.start(
      language,
      (text, _isFinal) => {
        onChange(text);
      },
      (state) => {
        setVoiceState(state);
        if (state === 'unsupported') setUnsupportedNotice(true);
      }
    );
  }, [supported, voiceState, language, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && onSubmit && !multiline) {
      e.preventDefault();
      onSubmit();
    }
  };

  const micLabel =
    voiceState === 'listening'
      ? 'Listening…'
      : voiceState === 'permission-denied'
      ? 'Microphone permission denied'
      : 'Start voice input';

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          {multiline ? (
            <textarea
              className="input pr-12 resize-none min-h-[120px]"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              aria-label={ariaLabel}
            />
          ) : (
            <input
              type="text"
              className="input pr-12"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-label={ariaLabel}
            />
          )}
          <button
            type="button"
            onClick={handleMic}
            aria-label={micLabel}
            title={micLabel}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
              voiceState === 'listening'
                ? 'bg-cyan/20 text-cyan animate-pulse'
                : 'text-slate-400 hover:text-cyan hover:bg-white/5'
            }`}
          >
            {voiceState === 'listening' ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {showClear && value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear input"
            className="btn-ghost"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {showSubmit && onSubmit && (
          <button
            type="button"
            onClick={onSubmit}
            className="btn-primary"
            disabled={!value.trim()}
          >
            {submitLabel ?? 'Submit'}
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>

      {voiceState === 'listening' && (
        <p className="mt-2 text-xs text-cyan flex items-center gap-1.5">
          <Mic className="w-3 h-3" /> Listening…
        </p>
      )}

      {unsupportedNotice && (
        <p className="mt-2 text-xs text-warm flex items-center gap-1.5">
          <MicOff className="w-3 h-3" />
          Voice input isn't supported in this browser. You can type instead.
        </p>
      )}

      {voiceState === 'permission-denied' && (
        <p className="mt-2 text-xs text-error flex items-center gap-1.5">
          <MicOff className="w-3 h-3" />
          Microphone permission was denied. Please allow microphone access and try again.
        </p>
      )}
    </div>
  );
}
