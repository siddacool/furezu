import type { Preview } from '@storybook/svelte';
import { themes } from '@storybook/theming';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

import '../src/lib/components/GlobalContainer/styles/index.scss';
import './global-style.scss';

polyfillCountryFlagEmojis();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Set the initial theme
      current: 'light',
      // Override the default dark theme
      dark: { ...themes.normal },
      // Override the default light theme
      light: { ...themes.normal },
      stylePreview: true,
      darkClass: 'THEME_IS_DARK',
      lightClass: 'THEME_IS_LIGHT',
    },
  },
};

export default preview;
