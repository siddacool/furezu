import type { Book } from '../books/types';
import type { Group } from '../groups/types';
import type { Phrase } from '../phrases/types';

export type LibraryData = {
  _id: string;
  book: Book;
  phrases: Phrase[];
  groups: Group[];
  exportedAt: Date;
};
