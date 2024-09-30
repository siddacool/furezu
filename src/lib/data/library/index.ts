import { browser } from '$app/environment';
import type { LibraryData } from '$lib/stores/library/types';

export async function getLibrary() {
  try {
    if (!browser) {
      return Promise.resolve([]);
    }

    const importedBooks = import.meta.glob('./books/*.json.book');

    const library: LibraryData[] = [];

    for (const path in importedBooks) {
      const module = await importedBooks[path]();
      const book = module as LibraryData;

      library.push(book);
    }

    return Promise.resolve(library);
  } catch (e) {
    return Promise.reject(e);
  }
}
