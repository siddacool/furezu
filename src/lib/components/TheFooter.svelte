<script lang="ts">
  import { useDeveloperModeStore } from '$lib/stores/local-settings/developer-mode.svelte';
  import Box from './Box.svelte';
  import Chip from './ui-framework/FormattedInfo/Chip.svelte';
</script>

<footer>
  <Box>
    <section>
      <a href="/">Home</a>
      <a href="/library">Library</a>
      <a href="/settings">Settings</a>

      {#if useDeveloperModeStore.developerMode}
        <a href="/settings/developer-options"><Chip size="small">Developer mode</Chip></a>
      {/if}
    </section>
  </Box>
</footer>

<style lang="scss">
  footer {
    margin-top: auto;
    padding: 0 16px;
    padding-bottom: 32px;
  }

  section {
    display: flex;
    align-items: center;
    min-height: 25px;
  }

  a {
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    color: var(--color-primary-600);
    margin: 0 8px;

    &:hover {
      color: var(--color-primary-700);
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
</style>
