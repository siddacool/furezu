import { getLocalSettings, updateLocalSettings } from './local-settings-manager';

const localSettings = getLocalSettings();

function createLastOpenBookStore() {
  let lastOpenBook: string | undefined = $state(localSettings.lastOpenBook);

  return {
    get lastOpenBook() {
      return lastOpenBook;
    },
    update: (value: string | undefined) => {
      lastOpenBook = value;

      updateLocalSettings({ lastOpenBook: value });
    },
  };
}

export const useLastOpenBookStore = createLastOpenBookStore();
