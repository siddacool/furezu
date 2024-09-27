<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { getMoment } from '$lib/helpers/time';
  import validateJson from '$lib/helpers/validators/vaidate-json';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import type { LibraryData } from '$lib/stores/library/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { SyncData } from '$lib/types/sync';

  let uploading = $state(false);
  let fileUploadElement: HTMLInputElement | undefined = $state(undefined);
  let files: FileList | undefined = $state(undefined);
  let importedAt: string | undefined = $state(undefined);

  async function readFileAsync(files: FileList | undefined): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      if (!files) {
        resolve(null);

        return;
      }

      if (files.length < 1) {
        resolve(null);

        return;
      }

      const file = files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContents = event.target?.result as string;
        resolve(fileContents);
      };

      reader.onerror = () => {
        reject(new Error('An error occurred while reading the file.'));
      };

      reader.readAsText(file);
    });
  }

  async function onchange() {
    try {
      uploading = true;
      const file = await readFileAsync(files);

      if (!file) {
        throw 'No file found';
      }

      if (!validateJson(file)) {
        throw 'Invalid data';
      }

      const importedData = JSON.parse(file) as SyncData;
      const importedDataFlat = importedData as { _id?: string };

      let books: Book[] = [];

      if (importedDataFlat._id) {
        // libabary Data, e.g. japanese.book.json
        const libraryData = importedData as unknown as LibraryData;

        books = [libraryData.book];
      } else {
        // Normal export
        books = importedData.books;
      }

      await useBooksStore.importData(books, importedData.exportedAt);
      await usePhrasesStore.importData(importedData.phrases, importedData.exportedAt);

      files = undefined;
      importedAt = getMoment().format('DD/MM/YYYY hh:mm:ss A');
    } catch (e) {
      console.error(e);
    } finally {
      uploading = false;
    }
  }

  function triggerFileUpload() {
    importedAt = undefined;
    fileUploadElement?.click();
  }
</script>

<ToolCard>
  <div>
    <h3>Import from other devices</h3>

    <input
      accept="application/JSON"
      bind:files
      bind:this={fileUploadElement}
      id="upload"
      name="upload"
      type="file"
      {onchange}
      disabled={uploading || useBooksStore.importing || usePhrasesStore.importing ? true : false}
      class="file-upload"
    />

    <Button
      variant="primary"
      disabled={uploading || useBooksStore.importing || usePhrasesStore.importing ? true : false}
      onclick={triggerFileUpload}
    >
      {#if uploading}
        Importing books...
      {:else}
        Import books
      {/if}
    </Button>

    {#if importedAt}
      <p>
        Imported at: {importedAt}
      </p>
    {/if}
  </div>
</ToolCard>

<style lang="scss">
  .file-upload {
    opacity: 0;
    position: absolute;
    z-index: -100;
  }

  p {
    margin-bottom: 0;
    margin-top: 8px;
  }
</style>
