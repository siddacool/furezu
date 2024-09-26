import type { Book } from '../books/types';
import type { Phrase } from '../phrases/types';

export type LibraryData = {
  _id: string;
  book: Book;
  phrases: Phrase[];
  exportedAt: Date;
};
