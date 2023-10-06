import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type VoiceList = {
  name: string;
  language: string;
  model: SpeechSynthesisVoice;
};

const voicesPromise = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    speechSynthesis.addEventListener('voiceschanged', () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      resolve(voices);
    });
  });
};

export async function getVoices() {
  try {
    if (!browser) {
      throw Error('Not browser');
    }

    if (!('speechSynthesis' in window)) {
      throw Error(`Sorry, your browser doesn't support text to speech!`);
    }

    const voices = await voicesPromise();

    return Promise.resolve(voices);
  } catch (e) {
    console.error(e);

    return Promise.resolve(undefined);
  }
}

function createVoiceList() {
  const { subscribe, update } = writable<VoiceList[]>([]);

  return {
    subscribe,
    async mount() {
      const voices = await getVoices();

      const voiceList: VoiceList[] = [];

      voices?.forEach((voice) => {
        voiceList.push({
          name: voice.name,
          language: voice.lang,
          model: voice,
        });
      });

      update(() => voiceList);
    },
  };
}

export const voiceList = createVoiceList();
