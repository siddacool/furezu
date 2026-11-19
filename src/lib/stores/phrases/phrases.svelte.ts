import { nanoid } from 'nanoid';
import { db } from '../db';
import type { CreatePhrase, Phrase } from './types';
import { getMoment } from '$lib/helpers/time';

export async function getPharse(idToFind: string) {
  const phrase = await db.phrases.where({ _id: idToFind }).first();
  return phrase;
}

function createPhrasesStore() {
  let phrases: Phrase[] = $state([]);
  let fetching = $state(false);
  let mounted = $state(false);
  let curruntlyEditing: string | undefined = $state(undefined);
  let activeGroup: string | undefined = $state(undefined);
  let createMode = $state(false);
  let searchFilter: string | undefined = $state(undefined);
  let importing = $state(false);
  let sortingMode = $state(false);
  let dragging = $state(false);

  return {
    get phrases() { return phrases; },
    get fetching() { return fetching; },
    get mounted() { return mounted; },
    get curruntlyEditing() { return curruntlyEditing; },
    get createMode() { return createMode; },
    get searchFilter() { return searchFilter; },
    get importing() { return importing; },
    get activeGroup() { return activeGroup; },
    get sortingMode() { return sortingMode; },
    get dragging() { return dragging; },
    async init() {
      try {
        fetching = true;
        const pureData = await db.phrases?.toArray();
        const unordered = pureData.filter((item) => !item.order);
        const ordered = pureData.filter((item) => item.order).sort((a, b) => {
          const aOrder = a.order || '9999_9999';
          const bOrder = b.order || '9999_9999';
          const [aGroupNo, aItemIndexInGroup] = aOrder.split('_');
          const [bGroupNo, bItemIndexInGroup] = bOrder.split('_');
          if (aGroupNo !== bGroupNo) return Number(aGroupNo) - Number(bGroupNo);
          return Number(aItemIndexInGroup) - Number(bItemIndexInGroup);
        });
        phrases = [...ordered, ...unordered];
      } catch (e) {
        console.error(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    startCreateMode(groupId?: string) { createMode = true; activeGroup = groupId; },
    startEditing(id: string) { curruntlyEditing = id; },
    clearEditing() { curruntlyEditing = undefined; createMode = false; activeGroup = undefined; },
    async add(bookId: string, data: CreatePhrase) {
      try {
        fetching = true;
        await db.phrases.add({
          _id: nanoid(), bookId, meaning: data.meaning, phrase: data.phrase,
          pronunciation: data.pronunciation?.trim() || undefined,
          groupId: data.groupId, createdAt: new Date(), updatedAt: new Date(),
        });
        phrases = await db.phrases?.toArray();
      } catch (e) { console.error(e); }
      finally { fetching = false; }
    },
    async update(idToUpdate: string, data: Partial<CreatePhrase>) {
      try {
        fetching = true;
        const target = await getPharse(idToUpdate);
        if (!target) throw Error('PharseStore:update: Phrase is missing');
        const cleaned = { ...data };
        if ('pronunciation' in cleaned) cleaned.pronunciation = cleaned.pronunciation?.trim() || undefined;
        await db.phrases.update(target.id, { ...cleaned, pronounciation: undefined, updatedAt: new Date() });
        phrases = await db.phrases?.toArray();
      } catch (e) { console.error(e); }
      finally { fetching = false; }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;
        const target = await getPharse(idToDelete);
        if (!target) throw Error('PharseStore:delete: Phrase is missing');
        await db.phrases.delete(target.id);
        phrases = await db.phrases?.toArray();
      } catch (e) { console.error(e); }
      finally { fetching = false; }
    },
    async deleteAllPharsesFromBook(bookId: string) {
      const related = await db.phrases?.where({ bookId }).toArray();
      await db.phrases.bulkDelete(related.map((item) => item.id));
      phrases = await db.phrases?.toArray();
    },
    async importData(phrasesToUpdate: Phrase[], importedAt: Date) {
      try {
        fetching = true; importing = true;
        const newPhrases: Phrase[] = [];
        phrasesToUpdate.forEach((itemToUpdate) => {
          const { id, pronounciation, translation: _translation, ...rest } = itemToUpdate;
          void _translation;
          const decorated: Phrase = {
            ...rest,
            pronunciation: rest.pronunciation?.trim() || pronounciation?.trim() || undefined,
            importedAt,
          };
          const targetIndex = phrases.findIndex((item) => item._id === itemToUpdate._id);
          if (targetIndex < 0) { newPhrases.push(decorated); return; }
          const updatedAt = getMoment(itemToUpdate.updatedAt);
          const previous = getMoment(phrases[targetIndex].updatedAt);
          if (!updatedAt.isBefore(previous)) newPhrases.push({ ...phrases[targetIndex], ...decorated });
        });
        await db.phrases.bulkPut(newPhrases);
        phrases = await db.phrases?.toArray();
      } catch (e) { console.error(e); }
      finally { fetching = false; importing = false; }
    },
    async duplicate(id: string) {
      const target = phrases.find((item) => item._id === id);
      if (!target) return;
      await db.phrases.add({ ...target, id: undefined, _id: nanoid(), createdAt: new Date(), updatedAt: new Date() });
      phrases = await db.phrases?.toArray();
    },
    async order(phrasesToUpdateRaw: Phrase[], groupIndexNumber: number) {
      const values = JSON.parse(JSON.stringify(phrasesToUpdateRaw));
      values.forEach((item: Phrase, index: number) => { item.order = `${groupIndexNumber}_${index}`; });
      await db.phrases.bulkPut(values);
    },
    updateSortingMode(value: boolean) { sortingMode = value; },
    updateDragging(value: boolean) { dragging = value; },
    updateSearchFilter(value: string | undefined) { searchFilter = value; },
  };
}

export const usePhrasesStore = createPhrasesStore();
