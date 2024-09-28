import { getLocalSettings, updateLocalSettings } from './local-settings-manager';

const localSettings = getLocalSettings();

function createDeveloperModeStore() {
  let developerMode: boolean = $state(localSettings.developerMode);

  return {
    get developerMode() {
      return developerMode;
    },
    updateDeveloperMode: (value: boolean) => {
      developerMode = value;

      updateLocalSettings({ developerMode: value });
    },
  };
}

export const useDeveloperModeStore = createDeveloperModeStore();
