import { listBook } from '../db';
import type { Book } from '../types';
import { getFilteredBooks } from '../utils/filtered-expenses';
import { bookFiltersStore } from './filters.svelte';

function createBookListStore() {
  let books = $state<Book[]>([]);
  const booksFiltred = $derived(getFilteredBooks(bookFiltersStore.filters, books));
  const booksActive = $derived(booksFiltred.filter((item) => !item.archived));

  return {
    get books() {
      return books;
    },
    get booksFiltred() {
      return booksFiltred;
    },
    get booksActive() {
      return booksActive;
    },
    async load() {
      const generalBooks = await listBook();

      books = generalBooks;
    },
  };
}

export const bookListStore = createBookListStore();
