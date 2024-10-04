<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import Icon from '@iconify/svelte';
  import { getMoment } from '$lib/helpers/time';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { simplifyText } from '$lib/helpers/text-manipulations/simplify-text';
  import type { LibraryData } from '$lib/stores/library/types';
  import LightButton from '$lib/components/LightButton.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';

  interface DownloadProps {
    book: Book;
  }

  const { book }: DownloadProps = $props();

  let downloading = $state(false);

  async function onclick(e: MouseEvent) {
    try {
      e.stopPropagation();

      const exportedAt = getMoment();

      const phrases = usePhrasesStore.phrases.filter((item) => item.bookId === book._id);
      const groups = useGroupsStore.groups.filter((item) => item.bookId === book._id);

      const exportData: LibraryData = {
        _id: book._id,
        book,
        phrases,
        groups,
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

<LightButton compact {onclick} disabled={downloading} class="Download" title="Download book">
  <Icon icon="material-symbols:download-sharp" />
</LightButton>
