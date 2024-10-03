import { getLocalSettings, updateLocalSettings } from './local-settings-manager';
import { AppColorSchemes, Themes } from './types';
import { browser } from '$app/environment';

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

const localSettings = getLocalSettings();

function createThemeStore() {
  let theme: Themes = $state(localSettings.theme);

  return {
    get theme() {
      return theme;
    },
    get colorScheme() {
      const sytemTheme = getSystemTheme();

      if (this.theme === Themes.SYSTEM) {
        return sytemTheme;
      } else if (useThemeStore.theme === Themes.DARK) {
        return AppColorSchemes.DARK;
      } else {
        return AppColorSchemes.LIGHT;
      }
    },
    setTheme: (value: Themes) => {
      theme = value;

      updateLocalSettings({ theme: value });
    },
  };
}

export const useThemeStore = createThemeStore();
