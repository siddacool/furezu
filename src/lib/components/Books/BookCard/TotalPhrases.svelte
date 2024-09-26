<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { StackItem } from '../../ui-framework/Layout/Stack';

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

<StackItem>
  <h3>
    {#if totalPhrases === 1}
      {totalPhrases} Phrase.
    {:else}
      {totalPhrases} Phrases.
    {/if}

    {#if !isAnyPharseEverAdd}
      <br /> Click on the book to add Phrases
    {/if}
  </h3>
</StackItem>

<style lang="scss">
  h3 {
    font-size: 1rem;
    line-height: 30px;
    color: var(--color-grey-font-600);
    margin: 0;
    font-weight: 500;
  }
</style>
