import { db, type Phrase, type Book } from '~/stores/db';
import { getMoment } from './time';

export type SyncData = {
  books: Book[];
  phrases: Phrase[];
  exportedAt: number;
};

export async function exportBooks() {
  try {
    const books = (await db.books.toArray()) || [];
    const phrases = (await db.phrases.toArray()) || [];

    const data: SyncData = {
      books,
      phrases,
      exportedAt: Date.now(),
    };

    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function importBooks(syncData: SyncData | undefined) {
  try {
    if (!syncData) {
      return Promise.resolve();
    }

    const importedBooks = syncData.books;
    const importedPhrases = syncData.phrases;

    const oldBooks = (await db.books.toArray()) || [];
    const oldPhrases = (await db.phrases.toArray()) || [];

    const newBooks: Book[] = [];
    const newPhrases: Phrase[] = [];

    const updateBooks: Book[] = [];
    const updatePhrases: Phrase[] = [];

    importedBooks.forEach((importedBook) => {
      const matchOldBook = oldBooks.find((oldBook) => oldBook._id === importedBook._id);
      const alreadyExists = matchOldBook?._id ? true : false;

      if (alreadyExists) {
        const importedBookUpdatedAt = getMoment(importedBook.updatedAt);

        const oldBookUpdatedAt = getMoment(matchOldBook?.updatedAt);

        if (importedBookUpdatedAt.isAfter(oldBookUpdatedAt)) {
          const importedBookAdjusted = {
            ...importedBook,
            id: matchOldBook?.id,
          };

          updateBooks.push(importedBookAdjusted);
        }
      } else {
        delete importedBook.id;

        newBooks.push(importedBook);
      }
    });

    importedPhrases.forEach((importedPhrase) => {
      const matchOldPhrase = oldPhrases.find((oldPhrase) => oldPhrase._id === importedPhrase._id);
      const alreadyExists = matchOldPhrase?._id ? true : false;

      if (alreadyExists) {
        const importedPhraseUpdatedAt = getMoment(importedPhrase.updatedAt);

        const oldPhraseUpdatedAt = getMoment(matchOldPhrase?.updatedAt);

        if (importedPhraseUpdatedAt.isAfter(oldPhraseUpdatedAt)) {
          const importedPhraseAdjusted = {
            ...importedPhrase,
            id: matchOldPhrase?.id,
          };

          updatePhrases.push(importedPhraseAdjusted);
        }
      } else {
        delete importedPhrase.id;

        newPhrases.push(importedPhrase);
      }
    });

    if (newBooks.length) {
      await db.books.bulkAdd(newBooks);
    }

    if (newPhrases.length) {
      await db.phrases.bulkAdd(newPhrases);
    }

    if (updateBooks.length) {
      const updateBooksAdjusted = updateBooks.map(({ id, ...restPorops }) =>
        Object.assign({
          key: id,
          changes: {
            ...restPorops,
          },
        }),
      );

      await db.books.bulkUpdate(updateBooksAdjusted);
    }

    if (updatePhrases.length) {
      const updatePhrasesAdjusted = updatePhrases.map(({ id, ...restPorops }) =>
        Object.assign({
          key: id,
          changes: {
            ...restPorops,
          },
        }),
      );

      await db.phrases.bulkUpdate(updatePhrasesAdjusted);
    }

    console.log(`
      newBooks: ${newBooks.length}
      newPhrases: ${newPhrases.length}
      updateBooks: ${updateBooks.length}
      updatePhrases: ${updatePhrases.length}
    `);

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
}
