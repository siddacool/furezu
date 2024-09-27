<script lang="ts">
  import Paragraph from '$lib/components/Paragraph.svelte';
  import type { LibraryData } from '$lib/stores/library/types';

  interface TotalPhrasesProps {
    book: LibraryData;
  }

  const { book }: TotalPhrasesProps = $props();

  const totalPhrases = $derived(book.phrases.length);
</script>

<Paragraph>
  {#if totalPhrases === 1}
    {totalPhrases} Phrase
  {:else}
    {totalPhrases} Phrases
  {/if}
</Paragraph>
