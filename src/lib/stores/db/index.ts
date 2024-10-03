import Dexie, { type Table } from 'dexie';
import type { Book } from '../books/types';
import type { Phrase } from '../phrases/types';
import type { Group } from '../groups/types';

export class MySubClassedDexie extends Dexie {
  books!: Table<Book>;
  phrases!: Table<Phrase>;
  groups!: Table<Group>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      books: '++id, _id',
      phrases: '++id, _id, bookId',
      groups: '++id, _id, bookId',
    });
  }
}

export const db = new MySubClassedDexie();
