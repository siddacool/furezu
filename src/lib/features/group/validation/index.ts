import type { Group, GroupCreateData } from '../types';

export function validateGroupCreate(data: GroupCreateData) {
  if (!data.bookId) {
    throw new Error('bookId is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}

export function validateGroupUpdate(data: Group) {
  if (!data.bookId) {
    throw new Error('bookId is required.');
  }

  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }
}
