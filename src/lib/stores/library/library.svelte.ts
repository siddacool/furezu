import { fetchApi } from '$lib/helpers/api';
import type { LibraryData } from './types';

function createLibraryStore() {
  let data: LibraryData[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);

  return {
    get data() {
      return data;
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

        data = await fetchApi<LibraryData[]>('GET', 'https://furezu-api.deno.dev/library');

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

export const useLibraryStore = createLibraryStore();
