<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { getMoment } from '$lib/helpers/time';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  interface UpdateProps {
    book: LibraryData;
  }

  const { book }: UpdateProps = $props();
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === book._id));
  const alreadyAdded = $derived(useBooksStore.books.some((item) => item._id === book._id));

  let updated = $state(false);

  $effect(() => {
    if (!targetBook?.importedAt) {
      return;
    }

    const targetBookImportedAtMoment = getMoment(targetBook.importedAt);
    const exportedAtAtMoment = getMoment(book.exportedAt);

    if (exportedAtAtMoment.isAfter(targetBookImportedAtMoment)) {
      updated = true;
    }
  });

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
  <StackItem></StackItem>
  <StackItem>
    <div>
      <Button
        disabled={useBooksStore.importing || usePhrasesStore.importing ? true : false}
        variant="primary"
        {onclick}
      >
        Update book
      </Button>
    </div>
  </StackItem>
{/if}
