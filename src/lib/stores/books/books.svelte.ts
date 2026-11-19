import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Book } from './types';
import { usePhrasesStore } from '../phrases/phrases.svelte';
import { getMoment } from '$lib/helpers/time';
import type { Phrase } from '../phrases/types';
import { useGroupsStore } from '../groups/groups.svelte';

async function getBook(idToFind: string) { return db.books.where({ _id: idToFind }).first(); }

function createBooksStore() {
  let books: Book[] = $state([]);
  let fetching = $state(false);
  let mounted = $state(false);
  let curruntlyEditing: string | undefined = $state(undefined);
  let createMode = $state(false);
  let searchFilter: string | undefined = $state(undefined);
  let importing = $state(false);

  return {
    get books() { return books; }, get fetching() { return fetching; }, get mounted() { return mounted; },
    get curruntlyEditing() { return curruntlyEditing; }, get createMode() { return createMode; },
    get searchFilter() { return searchFilter; }, get importing() { return importing; },
    async init() {
      try { fetching = true; books = await db.books?.toArray(); }
      catch (e) { console.error(e); }
      finally { fetching = false; mounted = true; }
    },
    startCreateMode() { createMode = true; },
    startEditing(id: string) { curruntlyEditing = id; },
    clearEditing() { curruntlyEditing = undefined; createMode = false; },
    async add(name: string) {
      try {
        fetching = true;
        await db.books.add({ _id: nanoid(), name: name.trim(), createdAt: new Date(), updatedAt: new Date() });
        books = await db.books?.toArray();
      } catch (e) { console.error(e); } finally { fetching = false; }
    },
    async update(idToUpdate: string, name: string) {
      try {
        fetching = true;
        const target = await getBook(idToUpdate);
        if (!target) throw Error('BooksStore:update: Book is missing');
        await db.books.update(target.id, { name: name.trim(), updatedAt: new Date() });
        books = await db.books?.toArray();
      } catch (e) { console.error(e); } finally { fetching = false; }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;
        const target = await getBook(idToDelete);
        if (!target) throw Error('BooksStore:delete: Book is missing');
        await db.books.delete(target.id);
        books = await db.books?.toArray();
        await usePhrasesStore.deleteAllPharsesFromBook(idToDelete);
        await useGroupsStore.deleteAllGroupsFromBook(idToDelete);
      } catch (e) { console.error(e); } finally { fetching = false; }
    },
    async importData(booksToUpdate: Book[], importedAt: Date) {
      try {
        fetching = true; importing = true;
        const newBooks: Book[] = [];
        booksToUpdate.forEach((item) => {
          const { id: _id, voice: _voice, ...rest } = item as Book & { voice?: string };
          void _id; void _voice;
          const decorated: Book = { ...rest, importedAt };
          const index = books.findIndex((current) => current._id === item._id);
          if (index < 0) { newBooks.push(decorated); return; }
          if (!getMoment(item.updatedAt).isBefore(getMoment(books[index].updatedAt))) {
            newBooks.push({ ...books[index], ...decorated });
          }
        });
        await db.books.bulkPut(newBooks);
        books = await db.books?.toArray();
      } catch (e) { console.error(e); } finally { fetching = false; importing = false; }
    },
    async duplicate(id: string) {
      const target = books.find((item) => item._id === id);
      if (!target) return;
      const cloned: Book = { ...target, id: undefined, _id: nanoid(), createdAt: new Date(), updatedAt: new Date() };
      await db.books.add(cloned);
      books = await db.books?.toArray();
      const phrases = usePhrasesStore.phrases.filter((item) => item.bookId === target._id);
      const clones: Phrase[] = phrases.map((item) => ({ ...item, id: undefined, _id: nanoid(), createdAt: new Date(), updatedAt: new Date(), bookId: cloned._id }));
      await usePhrasesStore.importData(clones, new Date());
    },
    updateSearchFilter(value: string | undefined) { searchFilter = value; },
  };
}

export const useBooksStore = createBooksStore();
