<script lang="ts">
  import { page } from '$app/stores';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import Title from '../Title.svelte';

  const bookId = $page.params.id;

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === bookId));
</script>

<div>
  <Title>
    {targetBook?.name}
  </Title>
</div>

<style lang="scss">
  :global(.Title) {
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
</style>
