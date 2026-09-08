export type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemeOption = {
  value: ThemeMode;
  label: string;
};

export const enum ThemeAppBarColors {
  LIGHT = '#ddd6ff',
  DARK = '#1a162f', // #0f0324
}

export type SettingsConfig = {
  theme: ThemeMode;
};
