import { getLocalStoreData } from '$lib/utils/storage';
import type { BookFilters } from '../types/filters';

const dataFromStorage = getLocalStoreData<BookFilters>('session', 'BookFilters');

function createBookFiltersStore() {
  let filters = $state(dataFromStorage || {});

  return {
    get filters() {
      return filters;
    },
    update(value: BookFilters) {
      filters = { ...value };
    },
  };
}

export const bookFiltersStore = createBookFiltersStore();
