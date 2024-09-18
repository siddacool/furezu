<script lang="ts">
  import AddBook from '$lib/components/Books/AddBook.svelte';
  import BookCard from '$lib/components/Books/BookCard.svelte';
  import BookCardEdit from '$lib/components/Books/BookCardEdit';
  import { useBooksStore } from '$lib/stores/books/books.svelte';

  $effect(() => {
    async function fetchData() {
      await useBooksStore.init();
    }

    fetchData();
  });
</script>

<title>Books</title>

{#if useBooksStore.mounted}
  {#if !useBooksStore.books.length}
    <h3>Create a Book using the form below</h3>
  {/if}

  {#each useBooksStore.books as book}
    {#if useBooksStore.curruntlyEditing === book._id}
      <BookCardEdit {book} />
    {:else}
      <BookCard {book} />
    {/if}
  {/each}

  {#if !useBooksStore.curruntlyEditing}
    <AddBook />
  {/if}
{/if}

<style lang="scss">
</style>
