<script lang="ts">
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { AppColorSchemes } from '$lib/stores/local-settings/types';

  $effect(() => {
    const bodyContainer = document.querySelector('body');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (bodyContainer) {
      bodyContainer.dataset.theme = useThemeStore.colorScheme;
    }

    if (metaThemeColor) {
      if (useThemeStore.colorScheme === AppColorSchemes.DARK) {
        metaThemeColor.setAttribute('content', '#0e1012');
      } else {
        metaThemeColor.setAttribute('content', '#fafafa');
      }
    }
  });
</script>
