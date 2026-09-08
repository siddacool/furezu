import type { Book } from '$lib/features/book/types';
import type { Group } from '$lib/features/group/types';
import type { Phrase } from '$lib/features/phrase/types';
import { Dexie, type EntityTable } from 'dexie';

const db = new Dexie('furezu-v3') as Dexie & {
  books: EntityTable<
    Book,
    'id' // primary key "id" (for the typings only)
  >;
  phrases: EntityTable<
    Phrase,
    'id' // primary key "id" (for the typings only)
  >;
  groups: EntityTable<
    Group,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(3).stores({
  books: '++id, _id', // primary key "id" (for the runtime!)
  phrases: '++id, _id', // primary key "id" (for the runtime!)
  groups: '++id, _id', // primary key "id" (for the runtime!)
});

export { db };
