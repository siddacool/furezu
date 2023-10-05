import { db } from './db';
import { nanoid } from 'nanoid';

export interface CreatePhrase {
  bookId: string;
  meaning: string;
  phrase: string;
  pronounciation?: string;
  translation?: string;
  description?: string;
}

export interface EditPharse {
  meaning: string;
  phrase: string;
  pronounciation?: string;
  translation?: string;
  description?: string;
}

export async function createPharse(config: CreatePhrase) {
  try {
    await db.phrases.add({
      _id: nanoid(),
      bookId: config.bookId,
      meaning: config.meaning,
      phrase: config.phrase,
      pronounciation: config.pronounciation,
      translation: config.translation,
      description: config.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getPharse(phraseId: string) {
  try {
    const phrase = await db.phrases.where({ _id: phraseId }).first();

    return Promise.resolve(phrase);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function editPharse(pharseId: string, config: EditPharse) {
  try {
    const phraseData = await getPharse(pharseId);

    if (!phraseData?.id) {
      throw Error('editPharse: phraseData missing');
    }

    await db.phrases.update(phraseData.id, {
      ...config,
      updatedAt: new Date(),
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function removePharse(pharseId: string) {
  try {
    const phraseData = await getPharse(pharseId);

    if (!phraseData?.id) {
      throw Error('removePharse: phraseData missing');
    }

    await db.phrases.delete(phraseData.id);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
