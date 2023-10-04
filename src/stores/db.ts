import Dexie, { type Table } from 'dexie';

export interface Book {
  id?: number;
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Phrase {
  id?: number;
  _id: string;
  bookId: string;
  meaning: string;
  phrase: string;
  pronounciation?: string;
  translation?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MySubClassedDexie extends Dexie {
  books!: Table<Book>;
  phrases!: Table<Phrase>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      books: '++id, _id',
      phrases: '++id, _id, bookId',
    });
  }
}

export const db = new MySubClassedDexie();
