import { deletePhrase as deletePhraseDb, updatePhrase, createPhrase } from '../db';
import { phraseListStore } from '../store/list.svelte';
import type { Phrase, PhraseCreateData } from '../types';
import { validatePhraseCreate, validatePhraseUpdate } from '../validation';

export async function savePhrase(data: PhraseCreateData | Phrase) {
  if ('_id' in data) {
    validatePhraseUpdate(data);

    const id = await updatePhrase(data);

    await phraseListStore.load(id);

    return id;
  } else {
    validatePhraseCreate(data);

    return await createPhrase(data);
  }
}

export function deletePhrase(phraseId: string) {
  return deletePhraseDb(phraseId);
}
