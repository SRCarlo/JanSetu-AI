export {};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;

    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }

  interface SpeechRecognitionConstructor {
    new (): SpeechRecognition;
  }

  interface SpeechRecognition
    extends EventTarget {
    continuous: boolean;

    interimResults: boolean;

    lang: string;

    start(): void;

    stop(): void;

    abort(): void;

    onstart:
      | ((event: Event) => void)
      | null;

    onend:
      | ((event: Event) => void)
      | null;

    onerror:
      | ((event: SpeechRecognitionErrorEvent) => void)
      | null;

    onresult:
      | ((event: SpeechRecognitionEvent) => void)
      | null;
  }

  interface SpeechRecognitionEvent
    extends Event {
    readonly results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent
    extends Event {
    readonly error: string;
    readonly message: string;
  }
}