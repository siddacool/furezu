import Dexie, { type Table } from 'dexie';
import type { Book } from '../books/types';
import type { Phrase } from '../phrases/types';

export class MySubClassedDexie extends Dexie {
  books!: Table<Book>;
  phrases!: Table<Phrase>;

  constructor() {
    super('myDatabase');
    this.version(2).stores({
      books: '++id, _id',
      phrases: '++id, _id, bookId',
    });
  }
}

export const db = new MySubClassedDexie();
