<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { getMoment } from '$lib/helpers/time';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  interface UpdateProps {
    book: LibraryData;
  }

  const { book }: UpdateProps = $props();
  const alreadyAdded = $derived(useBooksStore.books.some((item) => item._id === book._id));
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === book._id));
  const importedAt = $derived(getMoment(targetBook?.importedAt));
  const exportedAt = $derived(getMoment(book.exportedAt));
  const updated = $derived(
    !targetBook?.importedAt || exportedAt.isAfter(importedAt) ? true : false,
  );

  async function onclick() {
    try {
      await useBooksStore.importData([book.book], book.exportedAt);
      await usePhrasesStore.importData(book.phrases, book.exportedAt);
    } catch (e) {
      console.log(e);
    }
  }
</script>

{#if alreadyAdded && updated}
  <div>
    <Button
      disabled={useBooksStore.importing || usePhrasesStore.importing ? true : false}
      {onclick}
      variant="primary"
    >
      Update book
    </Button>
  </div>
{/if}

<style lang="scss">
  div {
    margin-top: 16px;
  }
</style>
