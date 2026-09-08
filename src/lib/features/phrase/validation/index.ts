import type { Phrase, PhraseCreateData } from '../types';

export function validatePhraseCreate(data: PhraseCreateData) {
  if (!data.bookId) {
    throw new Error('bookId is required.');
  }

  if (!data.phrase.trim()) {
    throw new Error('Phrase is required.');
  }

  if (!data.meaning.trim()) {
    throw new Error('Meaning is required.');
  }
}

export function validatePhraseUpdate(data: Phrase) {
  if (!data.bookId) {
    throw new Error('bookId is required.');
  }

  if (!data.phrase.trim()) {
    throw new Error('Phrase is required.');
  }

  if (!data.meaning.trim()) {
    throw new Error('Meaning is required.');
  }
}
