import { browser } from '$app/environment';

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

    const voices = await voicesPromise();

    return Promise.resolve(voices);
  } catch (e) {
    console.error(e);

    return Promise.resolve(undefined);
  }
}
