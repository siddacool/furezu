import { deleteBook as deleteBookDb, updateBook, createBook, getBookById } from '../db';
import type { Book, BookCreateData } from '../types';
import { validateBookCreate, validateBookUpdate } from '../validation';
import { bookDetailStore } from '../store/detail.svelte';

export async function saveBook(data: BookCreateData | Book) {
  if ('_id' in data) {
    const { name = '', ...restData } = data;
    const newData = {
      name: name.trim(),
      ...restData,
    };

    validateBookUpdate(newData);

    const id = await updateBook(newData);

    await bookDetailStore.load(id);

    return id;
  } else {
    const { name = '', ...restData } = data;

    const newData = {
      name: name.trim(),
      ...restData,
    };

    validateBookCreate(newData);

    return await createBook(newData);
  }
}

export function deleteBook(bookId: string) {
  return deleteBookDb(bookId);
}

async function updateBookFields(id: string, data: Partial<Book>) {
  const expense = await getBookById(id);

  return saveBook({
    ...expense,
    ...data,
  });
}

export function archiveBook(id: string) {
  return updateBookFields(id, { archived: true });
}

export function unarchiveExpense(id: string) {
  return updateBookFields(id, { archived: false });
}
