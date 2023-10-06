import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type VoiceList = {
  name: string;
  language: string;
  model: SpeechSynthesisVoice;
};

const voicesPromise = (): Promise<SpeechSynthesisVoice[] | undefined> => {
  return new Promise((resolve) => {
    const maxTrials = 20;
    let trial = 0;

    const interval = setInterval(() => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      trial += 1;

      if (trial > maxTrials) {
        clearInterval(interval);

        resolve(undefined);
      }

      if (voices.length) {
        clearInterval(interval);

        resolve(voices);
      }
    }, 50);
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

      console.log(voiceList);

      update(() => voiceList);
    },
  };
}

export const voiceList = createVoiceList();
