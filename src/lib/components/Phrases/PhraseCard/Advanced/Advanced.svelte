<script lang="ts">
  import { useDeveloperModeStore } from '$lib/stores/local-settings/developer-mode.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import Duplicate from './Duplicate.svelte';

  interface AdvancedProps {
    phrase: Phrase;
  }

  const { phrase }: AdvancedProps = $props();
</script>

{#if useDeveloperModeStore.developerMode}
  <div class="advanced-options">
    <Duplicate {phrase} />
  </div>
{/if}

<style lang="scss">
  div {
    margin-top: 10px;

    :global(button) {
      margin: 0 2px;
    }
  }
</style>
