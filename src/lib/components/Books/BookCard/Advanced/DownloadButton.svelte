<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Icon from '@iconify/svelte';
  import { getMoment } from '$lib/helpers/time';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import type { LibraryData } from '$lib/stores/library/types';

  interface DownloadButtonProps {
    book: Book;
  }

  const { book }: DownloadButtonProps = $props();

  let downloading = $state(false);

  async function onclick(e: MouseEvent) {
    try {
      e.stopPropagation();

      const exportedAt = getMoment();

      const phrases = usePhrasesStore.phrases.filter((item) => item.bookId === book._id);

      const exportData: LibraryData = {
        _id: book._id,
        book,
        phrases,
        exportedAt: exportedAt.toDate(),
      };

      const data = new Blob([JSON.stringify(exportData)], { type: 'text/plain' });

      const simplifiedName = simplifyText(book.name, true).toLocaleLowerCase();

      await downloadFile(`${simplifiedName}.book.json`, data);
    } catch (e) {
      console.error(e);
    } finally {
      downloading = false;
    }
  }
</script>

<div class="download-book">
  <Button
    compact
    {onclick}
    disabled={downloading}
    class="Download"
    title="Download book"
    variant="inert"
  >
    <Icon icon="material-symbols:download-sharp" />
  </Button>
</div>

<style lang="scss">
  .download-book {
    :global(.Download) {
      width: 40px;
      height: 40px;
      min-width: initial;
      border-radius: 50%;
    }

    :global(.Download svg) {
      font-size: 1.3rem;
    }
  }
</style>
