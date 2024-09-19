<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import BookCard from './BookCard.svelte';
  import BookCardEdit from './BookCardEdit/BookCardEdit.svelte';
</script>

{#each useBooksStore.books as book}
  {#if useBooksStore.curruntlyEditing === book._id}
    <BookCardEdit {book} />
  {:else}
    <BookCard {book} />
  {/if}
{/each}
