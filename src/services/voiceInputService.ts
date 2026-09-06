import type { VoiceState, Language } from '@/types/khojai';

// Browser Speech Recognition wrapper. Falls back gracefully when unsupported.
// No external voice APIs are used.

type SpeechRecognitionLike = {
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
  lang: string;
  interimResults: boolean;
  continuous: boolean;
};

function getRecognitionCtor(): any | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isVoiceSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export function languageToBcp47(lang: Language): string {
  switch (lang) {
    case 'hi':
      return 'hi-IN';
    case 'kn':
      return 'kn-IN';
    default:
      return 'en-IN';
  }
}

export interface VoiceController {
  start: (lang: Language, onResult: (text: string, isFinal: boolean) => void, onState: (s: VoiceState) => void) => void;
  stop: () => void;
}

export function createVoiceController(): VoiceController {
  let recognition: SpeechRecognitionLike | null = null;

  return {
    start(lang, onResult, onState) {
      const Ctor = getRecognitionCtor();
      if (!Ctor) {
        onState('unsupported');
        return;
      }
      try {
        recognition = new Ctor() as SpeechRecognitionLike;
        recognition.lang = languageToBcp47(lang);
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
          let text = '';
          let isFinal = false;
          for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
            if (event.results[i].isFinal) isFinal = true;
          }
          onResult(text, isFinal);
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            onState('permission-denied');
          } else {
            onState('idle');
          }
        };

        recognition.onend = () => {
          onState('idle');
        };

        recognition.start();
        onState('listening');
      } catch {
        onState('permission-denied');
      }
    },
    stop() {
      try {
        recognition?.stop();
      } catch {
        // ignore
      }
    },
  };
}
