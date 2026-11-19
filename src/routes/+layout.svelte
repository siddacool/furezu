<script lang="ts">
  import GlobalContainer from '$lib/components/GlobalContainer';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import TheFooter from '$lib/components/TheFooter.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  const { children }: SvelteComponentProps = $props();
  $effect(() => {
    async function init() {
      await useBooksStore.init();
      await usePhrasesStore.init();
      await useGroupsStore.init();
    }
    init();
  });
</script>
<GlobalContainer />
<MainLayout><div>{#if children}{@render children()}{/if}</div><TheFooter /></MainLayout>
