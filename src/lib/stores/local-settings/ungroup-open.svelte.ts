import { getLocalSettings, updateLocalSettings } from './local-settings-manager';

const localSettings = getLocalSettings();

function createUngroupOpenStore() {
  let ungroupOpen: boolean = $state(localSettings.ungroupOpen);

  return {
    get ungroupOpen() {
      return ungroupOpen;
    },
    updateUngroupOpen: (open: boolean) => {
      ungroupOpen = open;

      updateLocalSettings({ ungroupOpen: open });
    },
  };
}

export const useUngroupOpenStore = createUngroupOpenStore();
