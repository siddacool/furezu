<script lang="ts">
  import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';

  polyfillCountryFlagEmojis();
</script>

<main>
  <slot />
</main>

<style lang="scss">
  :global(:root) {
    --font-family-main: 'Twemoji Country Flags', 'Montserrat', 'Roboto', 'Segoe UI', 'San Francisco',
      sans-serif;
  }

  :global([data-theme='DARK']) {
    color-scheme: dark;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    font-family: var(--font-family-main);
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
