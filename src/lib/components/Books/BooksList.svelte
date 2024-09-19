<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import BookCard from './BookCard.svelte';
  import BookCardEdit from './BookCardEdit/BookCardEdit.svelte';

  let filteredBooks: Book[] = $state([]);

  $effect(() => {
    const searchFilter = useBooksStore.searchFilter?.trim()?.toLocaleLowerCase() || '';

    filteredBooks = useBooksStore.books.filter((item) =>
      item.name.trim().toLocaleLowerCase().includes(searchFilter),
    );
  });
</script>

<div>
  {#each filteredBooks as book}
    {#if useBooksStore.curruntlyEditing === book._id}
      <BookCardEdit {book} />
    {:else}
      <BookCard {book} />
    {/if}
  {/each}
</div>

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
