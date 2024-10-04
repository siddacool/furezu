import type { Book } from '$lib/stores/books/types';
import type { Group } from '$lib/stores/groups/types';
import type { Phrase } from '$lib/stores/phrases/types';

export type SyncData = {
  books: Book[];
  phrases: Phrase[];
  groups: Group[];
  exportedAt: Date;
};
