import { browser } from '$app/environment';
import type { Voice } from './get-voices';

export function speak(voice: Voice, textToRead: string, callback: (reading: boolean) => void) {
  if (!browser) {
    console.log(`Sorry, your browser doesn't support text to speech!`);

    return;
  }

  if (!('speechSynthesis' in window)) {
    console.log(`Sorry, your browser doesn't support text to speech!`);

    return;
  }

  if (!voice || !textToRead) {
    console.log('Missing: voice/translation');

    return;
  }

  const sayIt = new SpeechSynthesisUtterance();

  sayIt.text = textToRead;
  sayIt.voice = voice.model;

  window.speechSynthesis.speak(sayIt);

  sayIt.onstart = () => {
    callback(true);
  };

  sayIt.onend = () => {
    callback(false);
  };
}
