import { getVoices, type Voice } from './get-voices';

function createVoicesStore() {
  let voices: Voice[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get voices() {
      return voices;
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
  };
}

export const useVoicesStore = createVoicesStore();
