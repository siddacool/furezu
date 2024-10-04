<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { downloadFile } from '$lib/helpers/download-file';
  import { getMoment, timeout } from '$lib/helpers/time';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { useDeviceNameStore } from '$lib/stores/local-settings/device-name.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { SyncData } from '$lib/types/sync';

  let downloading = $state(false);

  async function onclick() {
    try {
      downloading = true;
      const books = useBooksStore.books;
      const phrases = usePhrasesStore.phrases;
      const groups = useGroupsStore.groups;

      const exportedAt = getMoment();

      const exportData: SyncData = {
        books,
        phrases,
        groups,
        exportedAt: exportedAt.toDate(),
      };

      const data = new Blob([JSON.stringify(exportData)], { type: 'text/plain' });

      const deviceName = useDeviceNameStore.deviceName ? `${useDeviceNameStore.deviceName}_` : '';

      const fileName = `furezu-export_${deviceName}${exportedAt.format('DD-MM-YYYY-HH-mm-ss')}.json`;

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
      <Button
        variant="primary"
        disabled={downloading || useBooksStore.importing || usePhrasesStore.importing
          ? true
          : false}
        {onclick}
      >
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
    margin: 0;
  }
</style>
