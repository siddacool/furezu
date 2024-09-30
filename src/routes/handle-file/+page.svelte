<script lang="ts">
  $effect(() => {
    if ('launchQueue' in window) {
      window?.launchQueue?.setConsumer(async (launchParams: { files: any }) => {
        const file = launchParams.files[0];
        const data = await file.getFile();

        console.log(data);
      });
    }
  });
</script>

<div>yo</div>
