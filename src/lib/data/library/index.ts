import type { Book } from '$lib/stores/books/types';
import type { Phrase } from '$lib/stores/phrases/types';
import type { SyncData } from '$lib/types/sync';

export type LibraryBookData = {
  _id: string;
  book: Book;
  phrases: Phrase[];
  exportedAt: Date;
};

export async function getBooksFromLibrary() {
  try {
    const importedBooks = import.meta.glob('./books/*.json', { eager: true, import: 'default' });

    const books: LibraryBookData[] = [];

    for (const importedBook in importedBooks) {
      const syncData = importedBooks[importedBook] as SyncData;

      const book = syncData.books[0];

      books.push({
        _id: book._id,
        book,
        phrases: syncData.phrases,
        exportedAt: syncData.exportedAt,
      });
    }

    return Promise.resolve(books);
  } catch (e) {
    return Promise.reject(e);
  }
}
