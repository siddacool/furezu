<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { useDeveloperModeStore } from '$lib/stores/local-settings/developer-mode.svelte';
  import Download from './Download.svelte';
  import Duplicate from './Duplicate.svelte';

  interface AdvancedProps {
    book: Book;
  }

  const { book }: AdvancedProps = $props();
</script>

{#if useDeveloperModeStore.developerMode}
  <div class="advanced-options">
    <Download {book} />
    <Duplicate {book} />
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
