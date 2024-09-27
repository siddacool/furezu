<script lang="ts">
  import GlobalContainer from '$lib/components/GlobalContainer';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  $effect(() => {
    async function fetchBookData() {
      try {
        await useVoicesStore.init();
        await useBooksStore.init();
        await usePhrasesStore.init();
      } catch (e) {
        console.log(e);
      }
    }

    fetchBookData();
  });
</script>

<GlobalContainer />

<MainLayout>
  {#if children}
    {@render children()}
  {/if}
</MainLayout>
