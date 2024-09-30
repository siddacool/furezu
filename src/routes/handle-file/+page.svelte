<script lang="ts">
  $effect(() => {
    if ('launchQueue' in window) {
      launchQueue.setConsumer(async (launchParams: { files: any }) => {
        for (const file of launchParams.files) {
          const url = URL.createObjectURL(await file.getFile());

          console.log(url);
        }
      });
    }
  });
</script>

<div>yo</div>
