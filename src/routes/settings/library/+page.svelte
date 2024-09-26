<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import LibraryList from '$lib/components/Library/LibraryList.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import ThickPlaceholderText from '$lib/components/ThickPlaceholderText.svelte';
  import { useLibraryStore } from '$lib/stores/library/library.svelte';
  import { useLoadingScreenStore } from '$lib/stores/system/loading-screen.svelte';

  $effect(() => {
    async function fetchLibrary() {
      try {
        useLoadingScreenStore.updateObstructiveLoadingScreen(true);
        await useLibraryStore.init();
      } catch (e) {
        console.log(e);
      } finally {
        useLoadingScreenStore.updateObstructiveLoadingScreen(false);
      }
    }

    fetchLibrary();
  });
</script>

<title>Library</title>

<SettingsHeader title="Library" />

{#if useLibraryStore.mounted}
  <Box>
    <LibraryList />
  </Box>
{/if}
