import type { Book } from '$lib/stores/books/types';
import type { Phrase } from '$lib/stores/phrases/types';

export type SyncData = {
  books: Book[];
  phrases: Phrase[];
  exportedAt: Date;
};
