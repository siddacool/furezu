<script lang="ts">
  import Button from '~/components/Button.svelte';
  import Stack from '~/components/Stack.svelte';
  import Title from '~/components/Title.svelte';
  import { downloadFile } from '~/utils/download-file';
  import { exportBooks, importBooks, type SyncData } from '~/utils/sync';
  import { timeout } from '~/utils/time';

  let loading = false;
  let files: FileList | undefined;
  let fileUploadElement: HTMLInputElement | undefined = undefined;

  async function downloadBooks() {
    try {
      loading = true;

      const rawData = await exportBooks();
      const exportedAt = rawData.exportedAt;
      const fileName = `furezu_${exportedAt}.json`;
      const textContent = JSON.stringify(rawData);

      const data = new Blob([textContent], { type: 'text/plain' });

      await downloadFile(fileName, data);

      await timeout(200);
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  }

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

  async function uploadBooks() {
    try {
      loading = true;

      const uploadedFiles = files;

      const file = await readFileAsync(uploadedFiles);

      if (!file) {
        return;
      }

      const syncData = JSON.parse(file) as SyncData;

      await importBooks(syncData);

      await timeout(300);

      files = undefined;
    } catch (e) {
      console.log(e);
    } finally {
      loading = false;
    }
  }

  async function triggerFileUpload() {
    fileUploadElement?.click();
  }
</script>

<svelte:head>
  <title>Furezu: sync</title>
</svelte:head>

<Title>Sync</Title>

<Stack>
  <Button variant="solid" on:click={downloadBooks} disabled={loading}>Download books</Button>
</Stack>

<Stack>
  <input
    accept="application/JSON"
    bind:files
    bind:this={fileUploadElement}
    id="upload"
    name="upload"
    type="file"
    on:change={uploadBooks}
    disabled={loading}
    class="file-upload"
  />
  <Button variant="solid" on:click={triggerFileUpload} disabled={loading}>Import books</Button>
</Stack>

<style lang="scss">
  .file-upload {
    opacity: 0;
    position: absolute;
    z-index: -100;
  }
</style>
