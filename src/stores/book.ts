import { db } from './db';
import { nanoid } from 'nanoid';

export async function createBook(bookName: string, voice?: string | undefined) {
  try {
    await db.books.add({
      _id: nanoid(),
      name: bookName,
      voice,
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

export async function editBook(bookId: string, bookName: string, voice?: string | undefined) {
  try {
    const bookData = await getBook(bookId);

    if (!bookData?.id) {
      throw Error('editBook: bookData missing');
    }

    await db.books.update(bookData.id, {
      name: bookName,
      voice,
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

    const relatedPharses = await db.phrases?.where({ bookId }).toArray();
    const relatedPharsesKeys = relatedPharses.map((pharse) => pharse.id);

    await db.phrases.bulkDelete(relatedPharsesKeys);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
