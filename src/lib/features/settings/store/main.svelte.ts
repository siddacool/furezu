import { getLocalStoreData } from '$lib/utils/storage';
import type { ThemeMode } from '../types';
import { LOCAL_STORE_SETTINGS_CONFIG } from '../const';

export type SettingsConfig = {
  theme: ThemeMode;
};

const defaultStorageData: SettingsConfig = {
  theme: 'auto',
};

const dataFromStorage = getLocalStoreData<SettingsConfig>('local', LOCAL_STORE_SETTINGS_CONFIG);

function createSettingsStore() {
  let settings: SettingsConfig = $state({ ...defaultStorageData, ...dataFromStorage });

  return {
    get settings() {
      return settings;
    },
    update(value: SettingsConfig) {
      settings = value;
    },
  };
}

export const settingsStore = createSettingsStore();
