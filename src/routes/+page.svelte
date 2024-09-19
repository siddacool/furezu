<script lang="ts">
  import BooksList from '$lib/components/Books/BooksList.svelte';
  import BooksPlaceholder from '$lib/components/Books/BooksPlaceholder.svelte';
  import BooksToolbar from '$lib/components/Books/BooksToolbar.svelte';
  import CreateABook from '$lib/components/Books/CreateABook.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  $effect(() => {
    async function fetchData() {
      await useBooksStore.init();
      await usePhrasesStore.init();
    }

    fetchData();

    return () => {
      useBooksStore.reset();
      usePhrasesStore.reset();
    };
  });
</script>

<title>Furezu</title>

<BooksToolbar />

{#if useBooksStore.mounted}
  <BooksPlaceholder />
  <BooksList />
  <CreateABook />
{/if}

<style lang="scss">
</style>
