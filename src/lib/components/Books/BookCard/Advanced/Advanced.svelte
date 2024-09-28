<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { useDeveloperModeStore } from '$lib/stores/local-settings/developer-mode.svelte';
  import DownloadButton from './DownloadButton.svelte';

  interface AdvancedProps {
    book: Book;
  }

  const { book }: AdvancedProps = $props();
</script>

{#if useDeveloperModeStore.developerMode}
  <div class="advanced-options">
    <DownloadButton {book} />
  </div>
{/if}
