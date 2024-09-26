import type { LibraryData } from '$lib/stores/library/types';
import type { SyncData } from '$lib/types/sync';

export async function getBooksFromLibrary() {
  try {
    const importedBooks = import.meta.glob('./books/*.json', { eager: true, import: 'default' });

    const library: LibraryData[] = [];

    for (const importedBook in importedBooks) {
      const syncData = importedBooks[importedBook] as SyncData;

      const book = syncData.books[0];

      library.push({
        _id: book._id,
        book,
        phrases: syncData.phrases,
        exportedAt: syncData.exportedAt,
      });
    }

    return Promise.resolve(library);
  } catch (e) {
    return Promise.reject(e);
  }
}
