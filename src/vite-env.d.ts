/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
  speechSynthesis: SpeechSynthesis;
}
