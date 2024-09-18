import { getLocalSettings, updateLocalSettings } from './local-settings-manager';
import { AppColorSchemes, type Themes } from './types';
import { browser } from '$app/environment';

const localSettings = getLocalSettings();

function createThemeStore() {
  let theme: Themes = $state(localSettings.theme);

  return {
    get theme() {
      return theme;
    },
    setTheme: (value: Themes) => {
      theme = value;

      updateLocalSettings({ theme: value });
    },
  };
}

export const useThemeStore = createThemeStore();

export function getSystemTheme(): AppColorSchemes {
  if (!browser) {
    return AppColorSchemes.LIGHT;
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (mediaQuery.matches) {
    return AppColorSchemes.DARK;
  } else {
    return AppColorSchemes.LIGHT;
  }
}
