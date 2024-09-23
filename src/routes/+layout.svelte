<script lang="ts">
  import GlobalContainer from '$lib/components/GlobalContainer';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useLoadingScreenStore } from '$lib/stores/system/loading-screen.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  $effect(() => {
    async function fetchBookData() {
      try {
        useLoadingScreenStore.updateObstructiveLoadingScreen(true);
        await useBooksStore.init();
        await usePhrasesStore.init();
      } catch (e) {
        console.log(e);
      } finally {
        useLoadingScreenStore.updateObstructiveLoadingScreen(false);
      }
    }

    fetchBookData();
  });
</script>

<GlobalContainer />

{#if useBooksStore.mounted && usePhrasesStore.mounted}
  <MainLayout>
    {#if children}
      {@render children()}
    {/if}
  </MainLayout>
{/if}
