import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Book, BookCreateData } from '../types';

export function listBook() {
  return db.books.toArray();
}

export async function getBookById(bookId: string) {
  const book = await db.books.where({ _id: bookId }).first();

  if (!book) {
    throw new Error('Book not found');
  }

  return book;
}

export async function createBook(data: BookCreateData) {
  const newExpenseId = nanoid();

  const now = new Date();

  await db.books.add({
    _id: newExpenseId,
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return newExpenseId;
}

export async function updateBook(data: Book) {
  await db.books.update(data.id, {
    ...data,
    updatedAt: new Date(),
  });

  return data._id;
}

export async function deleteBook(bookId: string) {
  const book = await getBookById(bookId);

  await db.books.delete(book.id);

  return bookId;
}
