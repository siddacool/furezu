<script lang="ts">
  import { pwaInfo } from 'virtual:pwa-info';
  import GlobalContainer from '$lib/components/GlobalContainer';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useLoadingScreenStore } from '$lib/stores/system/loading-screen.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();

  $effect(() => {
    async function pwaRegister() {
      if (pwaInfo) {
        const { registerSW } = await import('virtual:pwa-register');
        registerSW({
          immediate: true,
          onRegistered(r: any) {
            // uncomment following code if you want check for updates
            // r && setInterval(() => {
            //    console.log('Checking for sw update')
            //    r.update()
            // }, 20000 /* 20s for testing purposes */)
            console.log(`SW Registered: ${r}`);
          },
          onRegisterError(error: any) {
            console.log('SW registration error', error);
          },
        });
      }
    }

    pwaRegister();
  });

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
