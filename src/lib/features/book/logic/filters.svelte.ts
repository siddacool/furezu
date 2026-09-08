import { setLocalStoreData } from '$lib/utils/storage';
import { bookFiltersStore } from '../store/filters.svelte';
import type { BookFilters } from '../types/filters';

export function updateBookFilters(value: Partial<BookFilters>): BookFilters {
  const filters = {
    ...bookFiltersStore.filters,
    ...value,
  };

  setLocalStoreData<BookFilters>('session', 'BookFilters', filters);

  bookFiltersStore.update(filters);

  return filters;
}

export function clearBookFilters() {
  const filters: BookFilters = {
    search: '',
  };

  return updateBookFilters(filters);
}

export function updateBookSearchFilter(value: string): BookFilters {
  return updateBookFilters({
    search: value,
  });
}

export function clearExpenseSearchFilter(): BookFilters {
  return updateBookFilters({
    search: '',
  });
}
