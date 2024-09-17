<script lang="ts">
  import GlobalStyles from '$lib/components/GlobalStyles.svelte';
  import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

  polyfillCountryFlagEmojis();
</script>

<GlobalStyles>
  <main>
    <slot />
  </main>
</GlobalStyles>
