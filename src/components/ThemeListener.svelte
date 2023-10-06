<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';
  import { Theme, theme } from '~/stores/theme';

  const unsubscribe = theme.subscribe((activeTheme) => {
    if (!browser) {
      return;
    }

    const bodyTag = document.querySelector('body');
    const themeColor = document.querySelector(`meta[name="theme-color"]`);
    const isdarkTheme = activeTheme === Theme.DARK;

    bodyTag?.setAttribute('data-theme', activeTheme);

    if (isdarkTheme) {
      themeColor?.setAttribute('content', '#000');
    } else {
      themeColor?.setAttribute('content', '#18223f');
    }
  });

  onDestroy(unsubscribe);
</script>
