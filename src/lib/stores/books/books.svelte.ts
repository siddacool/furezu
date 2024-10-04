import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Book } from './types';
import { usePhrasesStore } from '../phrases/phrases.svelte';
import { getMoment } from '$lib/helpers/time';
import { useVoicesStore } from '../voices/voices.svelte';
import type { Phrase } from '../phrases/types';
import { useGroupsStore } from '../groups/groups.svelte';

async function getBook(idToFind: string) {
  try {
    const book = await db.books.where({ _id: idToFind }).first();

    return Promise.resolve(book);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createBooksStore() {
  let books: Book[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);
  let curruntlyEditing: string | undefined = $state(undefined);
  let createMode: boolean = $state(false);
  let searchFilter: string | undefined = $state(undefined);
  let importing: boolean = $state(false);

  return {
    get books() {
      return books;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    get curruntlyEditing() {
      return curruntlyEditing;
    },
    get createMode() {
      return createMode;
    },
    get searchFilter() {
      return searchFilter;
    },
    get importing() {
      return importing;
    },
    async init() {
      try {
        fetching = true;

        books = await db.books?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    startCreateMode() {
      createMode = true;
    },
    startEditing(id: string) {
      curruntlyEditing = id;
    },
    clearEditing() {
      curruntlyEditing = undefined;
      createMode = false;
    },
    async add(name: string, voice?: string) {
      try {
        fetching = true;

        await db.books.add({
          _id: nanoid(),
          name: name.trim(),
          voice: voice?.trim(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        books = await db.books?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, name: string, voice?: string) {
      try {
        fetching = true;

        const targetBook = await getBook(idToUpdate);

        if (!targetBook) {
          throw Error('BooksStore:update: Book is missing');
        }

        await db.books.update(targetBook.id, {
          name: name.trim(),
          voice: voice?.trim(),
          updatedAt: new Date(),
        });

        books = await db.books?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;

        const targetBook = await getBook(idToDelete);

        if (!targetBook) {
          throw Error('BooksStore:delete: Book is missing');
        }

        await db.books.delete(targetBook.id);

        books = await db.books?.toArray();

        await usePhrasesStore.deleteAllPharsesFromBook(idToDelete);
        await useGroupsStore.deleteAllGroupsFromBook(idToDelete);

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async importData(booksToUpdate: Book[], importedAt: Date) {
      try {
        fetching = true;
        importing = true;

        const newBooks: Book[] = [];

        const voices = useVoicesStore.voices;

        booksToUpdate.forEach((itemToUpdate) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, voice, ...restItemProps } = itemToUpdate;

          const decoratedItem: Book = { ...restItemProps, importedAt };

          const isVoiceFound = voices.some((item) => item.value === voice);

          if (isVoiceFound || !voice) {
            decoratedItem.voice = voice;
          }

          const targetIndex = books.findIndex((item) => item._id === itemToUpdate._id);

          if (targetIndex < 0) {
            // New
            newBooks.push(decoratedItem);
            return;
          }

          // update
          const updatedAt = getMoment(itemToUpdate.updatedAt);
          const updatedAtPrevious = getMoment(books[targetIndex].updatedAt);

          if (updatedAt.isBefore(updatedAtPrevious)) {
            return;
          }

          // Update approved
          newBooks.push({
            ...books[targetIndex],
            ...decoratedItem,
          });
        });

        await db.books.bulkPut(newBooks);

        books = await db.books?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        importing = false;
      }
    },
    async duplicate(id: string) {
      try {
        fetching = true;

        const targetBook = books.find((item) => item._id === id);

        if (!targetBook) {
          return;
        }

        const clonedBook: Book = {
          ...targetBook,
          id: undefined,
          _id: nanoid(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.books.add(clonedBook);

        books = await db.books?.toArray();

        const phrases = usePhrasesStore.phrases.filter((item) => item.bookId === targetBook._id);

        const clonePhrases: Phrase[] = phrases.map((item) =>
          Object.assign(item, {
            id: undefined,
            _id: nanoid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            bookId: clonedBook._id,
          }),
        );

        await usePhrasesStore.importData(clonePhrases, new Date());

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    updateSearchFilter(value: string | undefined) {
      searchFilter = value;
    },
  };
}

export const useBooksStore = createBooksStore();
