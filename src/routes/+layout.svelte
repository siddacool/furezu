<script lang="ts">
  import LayoutRoot from '$lib/components/LayoutRoot.svelte';
  import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

  polyfillCountryFlagEmojis();
</script>

<LayoutRoot>
  <main>
    <slot />
  </main>
</LayoutRoot>
