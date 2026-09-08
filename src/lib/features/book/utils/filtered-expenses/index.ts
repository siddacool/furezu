import type { Book } from '../../types';
import type { BookFilters } from '../../types/filters';
import { searchFilter } from './searchFilter/searchFilter';

export function getFilteredBooks(filters: BookFilters, data: Book[]) {
  let result = data;

  if (filters.search) {
    result = searchFilter(filters.search, data);
  }

  return result;
}
