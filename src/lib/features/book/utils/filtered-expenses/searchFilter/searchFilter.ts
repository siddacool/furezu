import type { Book } from '$lib/features/book/types';

export function searchFilter(query: string, expenses: Book[]): Book[] {
  const search = query.trim().toLowerCase();

  if (!search) {
    return expenses;
  }

  const results: Book[] = [];

  for (let i = 0, len = expenses.length; i < len; i++) {
    const expense = expenses[i];

    if (expense.name.toLowerCase().includes(search)) {
      results.push(expense);
    }
  }

  return results;
}
