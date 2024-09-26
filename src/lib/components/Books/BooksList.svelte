<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import ThickPlaceholderText from '../ThickPlaceholderText.svelte';
  import BookCard from './BookCard';
  import BookCardEdit from './BookCardEdit.svelte';

  let filteredBooks: Book[] = $state([]);

  $effect(() => {
    const searchFilter = useBooksStore.searchFilter?.trim()?.toLocaleLowerCase() || '';

    filteredBooks = useBooksStore.books.filter((item) =>
      item.name.trim().toLocaleLowerCase().includes(searchFilter),
    );
  });
</script>

{#if useBooksStore.books.length}
  <div>
    {#each filteredBooks as book}
      {#if useBooksStore.curruntlyEditing === book._id}
        <BookCardEdit {book} />
      {:else}
        <BookCard {book} />
      {/if}
    {/each}

    {#if !filteredBooks.length}
      <ThickPlaceholderText>No results found</ThickPlaceholderText>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  div {
    width: 100%;
    @include mediaLg {
      right: 16px;
      top: 16px;
    }
  }
</style>
