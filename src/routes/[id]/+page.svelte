<script lang="ts">
  import { page } from '$app/stores';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  const id = $page.params.id;

  const phrases = $derived(usePhrasesStore.phrases.filter((item) => item.bookId === id));

  $effect(() => {
    async function fetchData() {
      await usePhrasesStore.init();
    }

    fetchData();
  });
</script>

<div>{id}</div>

{#if usePhrasesStore.mounted}
  {#if !phrases.length}
    <h3>Create a phrase using the form below</h3>
  {/if}

  {#each phrases as phrase}
    <div>{phrase.phrase}</div>
  {/each}
{/if}

<style>
</style>
