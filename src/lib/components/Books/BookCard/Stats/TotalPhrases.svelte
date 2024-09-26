<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  interface TotalPhrasesProps {
    book: Book;
  }

  const { book }: TotalPhrasesProps = $props();

  const isAnyPharseEverAdd = $derived(
    usePhrasesStore.phrases.filter((item) => !item.hidden).length ? true : false,
  );
  const totalPhrases = $derived(
    usePhrasesStore.phrases.filter((item) => !item.hidden && item.bookId === book._id).length,
  );
</script>

<span>
  {#if totalPhrases === 1}
    {totalPhrases} Phrase
  {:else}
    {totalPhrases} Phrases
  {/if}

  {#if !isAnyPharseEverAdd}
    <br /> Click on the book to add Phrases.
  {/if}
</span>
