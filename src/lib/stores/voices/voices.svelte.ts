import { browser } from '$app/environment';
import { getVoices, type Voice } from './get-voices';

function createVoicesStore() {
  let voices: Voice[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);
  let speaking: boolean = $state(false);
  let speakingPhraseId: string | undefined = $state(undefined);

  return {
    get voices() {
      return voices;
    },
    get speaking() {
      return speaking;
    },
    get speakingPhraseId() {
      return speakingPhraseId;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    async init() {
      try {
        fetching = true;

        voices = await getVoices();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    speak(phraseId: string, voiceName: string, textToRead: string) {
      try {
        if (speaking) {
          throw `Already speaking`;
        }

        speaking = true;
        speakingPhraseId = phraseId;

        if (!browser) {
          throw `Sorry, your browser doesn't support text to speech!`;
        }

        if (!('speechSynthesis' in window)) {
          throw `Sorry, your browser doesn't support text to speech!`;
        }

        const voice = this.voices.find((voice) => voice.value === voiceName);

        if (!voice || !textToRead) {
          throw 'Missing: voice/translation';
        }

        const sayIt = new SpeechSynthesisUtterance();

        sayIt.text = textToRead;
        sayIt.voice = voice.model;

        window.speechSynthesis.speak(sayIt);

        sayIt.onend = () => {
          speaking = false;
          speakingPhraseId = undefined;
        };
      } catch (e) {
        console.log(e);
        speaking = false;
        speakingPhraseId = undefined;
      }
    },
  };
}

export const useVoicesStore = createVoicesStore();
