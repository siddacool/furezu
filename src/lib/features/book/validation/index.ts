import type { BookCreateData, Book } from '../types';

export function validateBookCreate(data: BookCreateData) {
  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}

export function validateBookUpdate(data: Book) {
  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}
