<script lang="ts">
  import { getSystemTheme, useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { AppColorSchemes, Themes } from '$lib/stores/local-settings/types';

  const sytemTheme = getSystemTheme();

  $effect(() => {
    const bodyContainer = document.querySelector('body');

    if (bodyContainer) {
      if (useThemeStore.theme === Themes.SYSTEM) {
        bodyContainer.dataset.theme = sytemTheme;
      } else if (useThemeStore.theme === Themes.DARK) {
        bodyContainer.dataset.theme = AppColorSchemes.DARK;
      } else {
        bodyContainer.dataset.theme = AppColorSchemes.LIGHT;
      }
    }
  });
</script>
