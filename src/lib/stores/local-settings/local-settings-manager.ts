import validateJson from '$lib/helpers/validators/vaidate-json';
import { browser } from '$app/environment';
import { Themes } from './types';
import { generateCookieName } from '$lib/helpers/cookie-maker';

export const USER_LOCAL_SETTINGS = generateCookieName('USER_LOCAL_SETTINGS');

export type LocalSettings = {
  theme: number;
  lastOpenBook?: string;
};

const defaultLocalSettings: LocalSettings = {
  theme: Themes.SYSTEM,
  lastOpenBook: undefined,
};

export function getLocalSettings() {
  if (!browser) {
    return defaultLocalSettings;
  }

  const cookieRaw = localStorage.getItem(USER_LOCAL_SETTINGS) || '{}';
  const validateItem = validateJson(cookieRaw);

  if (!validateItem) {
    console.error('getLocalSettings: Invalid JSON cookie');

    return defaultLocalSettings;
  }

  const cookieTyped = JSON.parse(cookieRaw) as Partial<LocalSettings>;

  const newLocalSettings: LocalSettings = {
    ...defaultLocalSettings,
    ...cookieTyped,
  };

  return newLocalSettings;
}

export function updateLocalSettings(update: Partial<LocalSettings>) {
  if (!browser) {
    return;
  }

  const currentLocalSettings = getLocalSettings();

  const newLocalSettings: LocalSettings = {
    ...currentLocalSettings,
    ...update,
  };

  const validateItem = validateJson(JSON.stringify(newLocalSettings));

  if (!validateItem) {
    throw 'updateLocalSettings: Invalid JSON';
  }

  const jsonData = JSON.stringify(newLocalSettings);

  localStorage.setItem(USER_LOCAL_SETTINGS, jsonData);
}
