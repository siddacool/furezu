import { nanoid } from 'nanoid';
import { db } from '../db';
import type { CreatePhrase, Phrase } from './types';
import { getMoment } from '$lib/helpers/time';

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
  let activeGroup: string | undefined = $state(undefined);
  let createMode: boolean = $state(false);
  let searchFilter: string | undefined = $state(undefined);
  let importing: boolean = $state(false);

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
    get searchFilter() {
      return searchFilter;
    },
    get importing() {
      return importing;
    },
    get activeGroup() {
      return activeGroup;
    },
    async init() {
      try {
        fetching = true;

        const pureData = await db.phrases?.toArray();
        const unordered = pureData.filter((item) => !item.order);
        const ordered = pureData
          .filter((item) => item.order)
          .sort((a, b) => {
            // Handle missing order properties
            const aOrder = a.order || '9999_9999';
            const bOrder = b.order || '9999_9999';

            // Split the order strings into groupNo and itemIndexInGroup
            const [aGroupNo, aItemIndexInGroup] = aOrder.split('_');
            const [bGroupNo, bItemIndexInGroup] = bOrder.split('_');

            // Compare group numbers first
            if (aGroupNo !== bGroupNo) {
              return (aGroupNo as unknown as number) - (bGroupNo as unknown as number);
            }

            // If group numbers are equal, compare item indexes within the group
            return (
              (aItemIndexInGroup as unknown as number) - (bItemIndexInGroup as unknown as number)
            );
          });

        phrases = [...ordered, ...unordered];

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    startCreateMode(groupId?: string) {
      createMode = true;
      activeGroup = groupId;
    },
    startEditing(id: string) {
      curruntlyEditing = id;
    },
    clearEditing() {
      curruntlyEditing = undefined;
      createMode = false;
      activeGroup = undefined;
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
          groupId: data.groupId,
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

        await db.phrases.update(targetPharse.id, {
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
    async importData(phrasesToUpdate: Phrase[], importedAt: Date) {
      try {
        fetching = true;
        importing = true;

        const newPhrases: Phrase[] = [];

        phrasesToUpdate.forEach((itemToUpdate) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...restItemProps } = itemToUpdate;

          const decoratedItem: Phrase = { ...restItemProps, importedAt };

          // Update phrase data
          const targetIndex = phrases.findIndex((item) => item._id === itemToUpdate._id);

          if (targetIndex < 0) {
            // New
            newPhrases.push(decoratedItem);
            return;
          }

          // update
          const updatedAt = getMoment(itemToUpdate.updatedAt);
          const updatedAtPrevious = getMoment(phrases[targetIndex].updatedAt);

          if (updatedAt.isBefore(updatedAtPrevious)) {
            return;
          }

          // Update approved
          newPhrases.push({
            ...phrases[targetIndex],
            ...decoratedItem,
          });
        });

        await db.phrases.bulkPut(newPhrases);

        phrases = await db.phrases?.toArray();

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

        const targetPhrase = phrases.find((item) => item._id === id);

        if (!targetPhrase) {
          return;
        }

        const clonedPhrase: Phrase = {
          ...targetPhrase,
          id: undefined,
          _id: nanoid(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.phrases.add(clonedPhrase);

        phrases = await db.phrases?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async order(phrasesToUpdateRaw: Phrase[], groupIndexNumber: number) {
      try {
        const phrasesToUpdate = JSON.parse(JSON.stringify(phrasesToUpdateRaw));
        fetching = true;

        const newPhrases: Phrase[] = [];

        for (let index = 0; index < phrasesToUpdate.length; index++) {
          const phrase = phrasesToUpdate[index];

          phrase.order = `${groupIndexNumber}_${index}`;

          newPhrases.push(phrase);
        }

        await db.phrases.bulkPut(newPhrases);

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

export const usePhrasesStore = createPhrasesStore();
