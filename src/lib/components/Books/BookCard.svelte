<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import DisplayCard from '../DisplayCard.svelte';

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

  function onEdit() {
    useBooksStore.startEditing(book._id);
  }
</script>

<DisplayCard
  href={`/${book._id}`}
  disableClick={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
  hideEditButton={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
  {onEdit}
>
  <Stack>
    <StackItem>
      <h3>{book.name}</h3>
    </StackItem>
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
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 25px;
    font-weight: 500;

    @include mediaLg {
      font-size: 1.45rem;
      line-height: 30px;
    }
  }

  .totalPhrases {
    font-size: 1.1rem;
    line-height: 25px;

    @include mediaLg {
      font-size: 1.2rem;
    }
  }
</style>
