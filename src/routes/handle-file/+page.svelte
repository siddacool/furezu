<script lang="ts">
  import { readUploadedTextFile } from '$lib/helpers/upload-file';

  $effect(() => {
    if ('launchQueue' in window) {
      window?.launchQueue?.setConsumer(async (launchParams: { files: FileList }) => {
        const file = await readUploadedTextFile(launchParams.files);

        console.log(file);
      });
    }
  });
</script>

<div>yo</div>
