import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const THEME_COOKIE = 'THEME';

export const enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

function getInitialTheme() {
  if (!browser) {
    return Theme.LIGHT;
  }

  const theme = localStorage.getItem(THEME_COOKIE);

  if (theme === Theme.DARK) {
    return Theme.DARK;
  } else {
    return Theme.LIGHT;
  }
}

function setThemeToLocalStorage(theme: Theme) {
  if (!browser) {
    return;
  }

  if (theme === Theme.LIGHT) {
    localStorage.setItem(THEME_COOKIE, Theme.LIGHT);
  } else if (theme === Theme.DARK) {
    localStorage.setItem(THEME_COOKIE, Theme.DARK);
  }
}

function createTheme() {
  const { subscribe, update } = writable<Theme>(getInitialTheme());

  return {
    subscribe,
    toggle() {
      update((currentTheme) => {
        const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        setThemeToLocalStorage(newTheme);

        return newTheme;
      });
    },
  };
}

export const theme = createTheme();
