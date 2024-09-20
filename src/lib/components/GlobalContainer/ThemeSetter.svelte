<script lang="ts">
  import { getSystemTheme, useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { AppColorSchemes, Themes } from '$lib/stores/local-settings/types';

  const sytemTheme = getSystemTheme();

  $effect(() => {
    const bodyContainer = document.querySelector('body');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (bodyContainer) {
      if (useThemeStore.theme === Themes.SYSTEM) {
        bodyContainer.dataset.theme = sytemTheme;
      } else if (useThemeStore.theme === Themes.DARK) {
        bodyContainer.dataset.theme = AppColorSchemes.DARK;
      } else {
        bodyContainer.dataset.theme = AppColorSchemes.LIGHT;
      }
    }

    if (metaThemeColor) {
      if (useThemeStore.theme === Themes.SYSTEM) {
        if (sytemTheme === AppColorSchemes.LIGHT) {
          metaThemeColor.setAttribute('content', '#ffffff');
        } else {
          metaThemeColor.setAttribute('content', '#0b0b43');
        }
      } else if (useThemeStore.theme === Themes.DARK) {
        metaThemeColor.setAttribute('content', '#0b0b43');
      } else {
        metaThemeColor.setAttribute('content', '#ffffff');
      }
    }
  });
</script>
