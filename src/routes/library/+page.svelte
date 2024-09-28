<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import LibraryList from '$lib/components/Library/LibraryList.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useLibraryStore } from '$lib/stores/library/library.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import LibraryHeader from '$lib/components/Library/LibraryHeader.svelte';

  const mounted = $derived(
    useBooksStore.mounted && usePhrasesStore.mounted && useVoicesStore.mounted ? true : false,
  );

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

<LibraryHeader />

{#if mounted}
  <Box>
    <LibraryList />
  </Box>
{:else}
  <Box>
    <Loading />
  </Box>
{/if}
