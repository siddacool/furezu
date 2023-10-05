import { db } from './db';
import { nanoid } from 'nanoid';

export async function createBook(bookName: string) {
  try {
    await db.books.add({
      _id: nanoid(),
      name: bookName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getBook(bookId: string) {
  try {
    const book = await db.books.where({ _id: bookId }).first();

    return Promise.resolve(book);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function editBook(bookId: string, bookName: string) {
  try {
    const bookData = await getBook(bookId);

    if (!bookData?.id) {
      throw Error('editBook: bookData missing');
    }

    await db.books.update(bookData.id, {
      name: bookName,
      updatedAt: new Date(),
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function removeBook(bookId: string) {
  try {
    const bookData = await getBook(bookId);

    if (!bookData?.id) {
      throw Error('removeBook: bookData missing');
    }

    await db.books.delete(bookData.id);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
