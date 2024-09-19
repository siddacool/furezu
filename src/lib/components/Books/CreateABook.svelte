<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import BookCardEdit from './BookCardEdit';
</script>

{#if useBooksStore.createMode}
  <BookCardEdit />
{/if}
