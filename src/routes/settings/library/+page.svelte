<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import LibraryList from '$lib/components/Library/LibraryList.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import { useLibraryStore } from '$lib/stores/library/library.svelte';

  $effect(() => {
    async function fetchLibrary() {
      try {
        await useLibraryStore.init();
      } catch (e) {
        console.log(e);
      }
    }

    fetchLibrary();
  });
</script>

<title>Library</title>

<SettingsHeader title="Library" />

<Box>
  <LibraryList />
</Box>
