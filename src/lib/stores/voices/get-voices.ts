import { browser } from '$app/environment';
import { isoLanguages } from './iso-languages';

export type Voice = {
  value: string;
  label: string;
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

    const res = await voicesPromise();

    const voicesRaw = res || [];
    const voices: Voice[] = [];

    for (let index = 0; index < voicesRaw.length; index++) {
      const item = voicesRaw[index];
      const langCode = item.lang.split('-')[0] || '';
      const language = isoLanguages[langCode];

      voices.push({
        value: item.name,
        label: language ? `${item.name} (${language})` : item.name,
        model: item,
      });
    }

    return Promise.resolve(voices);
  } catch (e) {
    console.error(e);

    return Promise.resolve([]);
  }
}
