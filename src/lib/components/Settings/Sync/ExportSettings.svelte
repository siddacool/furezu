<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { getMoment, timeout } from '$lib/helpers/time';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { SyncData } from '$lib/types/sync';

  let downloading = $state(false);

  async function onclick() {
    try {
      downloading = true;
      const books = useBooksStore.books;
      const phrases = usePhrasesStore.phrases;

      const exportedAt = getMoment();

      const exportData: SyncData = {
        books,
        phrases,
        exportedAt: exportedAt.toDate(),
      };

      const data = new Blob([JSON.stringify(exportData)], { type: 'text/plain' });

      const fileName = `furezu-export_${exportedAt.format('DD-MM-YYYY-HH-mm-ss')}.json`;

      await downloadFile(fileName, data);
      await timeout(200);
    } catch (e) {
      console.error(e);
    } finally {
      downloading = false;
    }
  }
</script>

<ToolCard>
  <div>
    <h3>Export</h3>

    {#if useBooksStore.books.length}
      <Button variant="primary" disabled={downloading} {onclick}>
        Export - {useBooksStore.books.length}

        {#if useBooksStore.books.length === 1}
          book
        {:else}
          books
        {/if}
      </Button>
    {:else}
      <p>No books to export</p>
    {/if}
  </div>
</ToolCard>

<style lang="scss">
  p {
    font-size: 1.2rem;
    line-height: 30px;
    margin: 0;
  }
</style>
