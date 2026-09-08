import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Phrase, PhraseCreateData } from '../types';

export function listPhrase(bookId: string) {
  return db.phrases.where({ bookId }).toArray();
}

export async function getPhraseById(phraseId: string) {
  const phrase = await db.phrases.where({ _id: phraseId }).first();

  if (!phrase) {
    throw new Error('Phrase not found');
  }

  return phrase;
}

export async function createPhrase(data: PhraseCreateData) {
  const newId = nanoid();

  const now = new Date();

  await db.phrases.add({
    _id: newId,
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return newId;
}

export async function updatePhrase(data: Phrase) {
  await db.phrases.update(data.id, {
    ...data,
    updatedAt: new Date(),
  });

  return data._id;
}

export async function deletePhrase(phraseId: string) {
  const phrase = await getPhraseById(phraseId);

  await db.phrases.delete(phrase.id);

  return phraseId;
}
