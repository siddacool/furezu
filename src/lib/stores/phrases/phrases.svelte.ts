import { nanoid } from 'nanoid';
import { db } from '../db';
import type { CreatePhrase, Phrase } from './types';

export async function getPharse(idToFind: string) {
  try {
    const phrase = await db.phrases.where({ _id: idToFind }).first();

    return Promise.resolve(phrase);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createPhrasesStore() {
  let phrases: Phrase[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);
  let curruntlyEditing: string | undefined = $state(undefined);
  let createMode: boolean = $state(false);

  return {
    get phrases() {
      return phrases;
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
    async init() {
      try {
        fetching = true;

        phrases = await db.phrases?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    reset() {
      fetching = false;
      mounted = false;
      curruntlyEditing = undefined;
      createMode = false;
      phrases = [];
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
    async add(bookId: string, data: CreatePhrase) {
      try {
        fetching = true;

        await db.phrases.add({
          _id: nanoid(),
          bookId: bookId,
          meaning: data.meaning,
          phrase: data.phrase,
          pronounciation: data.pronounciation,
          translation: data.translation,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        phrases = await db.phrases?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, data: Partial<CreatePhrase>) {
      try {
        fetching = true;

        const targetPharse = await getPharse(idToUpdate);

        if (!targetPharse) {
          throw Error('PharseStore:update: Pharse is missing');
        }

        await db.books.update(targetPharse.id, {
          ...data,
          updatedAt: new Date(),
        });

        phrases = await db.phrases?.toArray();

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

        const targetPharse = await getPharse(idToDelete);

        if (!targetPharse) {
          throw Error('PharseStore:delete: Book is missing');
        }

        // It's not removed but hidden
        await db.phrases.update(targetPharse.id, {
          hidden: true,
          updatedAt: new Date(),
        });

        phrases = await db.phrases?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async deleteAllPharsesFromBook(bookId: string) {
      try {
        fetching = true;

        const relatedPharses = await db.phrases?.where({ bookId }).toArray();
        const relatedPharsesKeys = relatedPharses.map((pharse) => pharse.id);

        await db.phrases.bulkDelete(relatedPharsesKeys);

        phrases = await db.phrases?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const usePhrasesStore = createPhrasesStore();
