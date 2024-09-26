<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { goto } from '$app/navigation';
  import DisplayCard from '../DisplayCard';

  interface BookCardProps {
    book: Book;
  }

  const { book }: BookCardProps = $props();
  const isAnyPharseEverAdd = $derived(
    usePhrasesStore.phrases.filter((item) => !item.hidden).length ? true : false,
  );
  const totalPhrases = $derived(
    usePhrasesStore.phrases.filter((item) => !item.hidden && item.bookId === book._id).length,
  );

  function onedit() {
    useBooksStore.startEditing(book._id);
  }

  function onclick() {
    goto(`/${book._id}`);
  }
</script>

<DisplayCard
  hideEditButton={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
  {onedit}
  onclick={useBooksStore.curruntlyEditing || useBooksStore.createMode ? undefined : onclick}
  title={book.name}
>
  <Stack>
    <StackItem>
      <div class="totalPhrases">
        {#if totalPhrases === 1}
          {totalPhrases} Phrase.
        {:else}
          {totalPhrases} Phrases.
        {/if}

        {#if !isAnyPharseEverAdd}
          <br /> Click on the book to add Phrases
        {/if}
      </div>
    </StackItem>
  </Stack>
</DisplayCard>

<style lang="scss">
  .totalPhrases {
    font-size: 1.2rem;
    line-height: 30px;
    color: var(--color-grey-font-600);
  }
</style>
