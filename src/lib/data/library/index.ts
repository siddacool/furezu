import { browser } from '$app/environment';
import type { LibraryData } from '$lib/stores/library/types';
import type { SyncData } from '$lib/types/sync';

export async function getLibrary() {
  try {
    if (!browser) {
      return Promise.resolve([]);
    }

    const importedBooks = import.meta.glob('./books/*.json');

    const library: LibraryData[] = [];

    for (const path in importedBooks) {
      const module = await importedBooks[path]();
      const syncData = module as SyncData;

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
