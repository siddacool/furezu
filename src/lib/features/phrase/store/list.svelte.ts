import { listPhrase } from '../db';
import type { Phrase } from '../types';

function createPhraseListStore() {
  let phrases = $state<Phrase[]>([]);

  return {
    get phrases() {
      return phrases;
    },
    async load(bookId: string) {
      const generalBooks = await listPhrase(bookId);

      phrases = generalBooks;
    },
  };
}

export const phraseListStore = createPhraseListStore();
