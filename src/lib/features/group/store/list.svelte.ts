import { listGroups } from '../db';
import type { Group } from '../types';

function createGroupListStore() {
  let groups = $state<Group[]>([]);

  return {
    get groups() {
      return groups;
    },
    async load(bookId: string) {
      const generalBooks = await listGroups(bookId);

      groups = generalBooks;
    },
  };
}

export const groupListStore = createGroupListStore();
