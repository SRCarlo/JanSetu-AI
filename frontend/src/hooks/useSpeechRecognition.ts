/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

interface UseSpeechRecognitionProps {
  language: string;

  onTranscript: (
    transcript: string
  ) => void;
}

const languageMap: Record<string, string> = {
  Marathi: "mr-IN",
  Hindi: "hi-IN",
  English: "en-IN",
};

export function useSpeechRecognition({
  language,
  onTranscript,
}: UseSpeechRecognitionProps) {
  const recognitionRef =
    useRef<SpeechRecognition | null>(null);

  const [isListening, setIsListening] =
    useState(false);

  const [supported, setSupported] =
    useState(true);

  const [speechError, setSpeechError] =
    useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang =
      languageMap[language] || "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError("");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);

      if (
        event.error ===
        "not-allowed"
      ) {
        setSpeechError(
          "Microphone permission was denied."
        );
      } else if (
        event.error ===
        "no-speech"
      ) {
        setSpeechError(
          "No speech was detected. Please try again."
        );
      } else {
        setSpeechError(
          "Unable to recognize speech. Please try again."
        );
      }
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        transcript +=
          event.results[i][0].transcript;
      }

      onTranscript(
        transcript.trim()
      );
    };

    recognitionRef.current =
      recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [language, onTranscript]);

  function startListening() {
    if (!recognitionRef.current) {
      setSpeechError(
        "Speech recognition is not supported in this browser."
      );

      return;
    }

    setSpeechError("");

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.warn(
        "Speech recognition could not start:",
        error
      );
    }
  }

  function stopListening() {
    recognitionRef.current?.stop();

    setIsListening(false);
  }

  function toggleListening() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }

  return {
    isListening,
    supported,
    speechError,
    startListening,
    stopListening,
    toggleListening,
  };
}