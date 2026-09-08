import { getBookById } from '../db';
import type { Book } from '../types';

function createBookDetailStore() {
  let book = $state<Book | undefined>(undefined);

  return {
    get book() {
      return book;
    },
    async load(id: string) {
      const generalBook = await getBookById(id);

      book = generalBook;
    },
  };
}

export const bookDetailStore = createBookDetailStore();
