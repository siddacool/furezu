<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  interface AddProps {
    book: LibraryData;
  }

  const { book }: AddProps = $props();

  const alreadyAdded = $derived(useBooksStore.books.some((item) => item._id === book._id));

  async function onclick() {
    try {
      await useBooksStore.importData([book.book], book.exportedAt);
      await usePhrasesStore.importData(book.phrases, book.exportedAt);
    } catch (e) {
      console.log(e);
    }
  }
</script>

{#if !alreadyAdded}
  <div>
    <Button
      disabled={useBooksStore.importing || usePhrasesStore.importing ? true : false}
      variant="primary"
      {onclick}
    >
      Add book
    </Button>
  </div>
{/if}

<style lang="scss">
  div {
    margin-top: 8px;
  }
</style>
