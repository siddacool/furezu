<script lang="ts">
  import { page } from '$app/stores';
  import ThickPlaceholderText from '../ThickPlaceholderText.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';

  const bookId = $page.params.id;

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === bookId));

  const phrases = $derived(
    usePhrasesStore.phrases.filter((item) => item.bookId === targetBook?._id && !item.hidden),
  );
</script>

{#if phrases.length}
  <h3>
    {targetBook?.name}
  </h3>
{/if}

<style lang="scss">
  h3 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
