<script lang="ts">
  import { page } from '$app/stores';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import ThickPlaceholderText from '../ThickPlaceholderText.svelte';
  import PhraseCard from './PhraseCard.svelte';
  import PhraseCardEdit from './PhraseCardEdit.svelte';

  let filteredPhrases: Phrase[] = $state([]);

  const bookId = $page.params.id;

  const bookPhrases = $derived(
    usePhrasesStore.phrases.filter((item) => !item.hidden && item.bookId === bookId),
  );

  $effect(() => {
    const searchFilter = usePhrasesStore.searchFilter?.trim()?.toLocaleLowerCase() || '';

    filteredPhrases = usePhrasesStore.phrases.filter(
      (item) =>
        !item.hidden &&
        item.bookId === bookId &&
        item.meaning.trim().toLocaleLowerCase().includes(searchFilter),
    );
  });
</script>

{#if bookPhrases.length}
  <div>
    {#each filteredPhrases as phrase}
      {#if usePhrasesStore.curruntlyEditing === phrase._id}
        <PhraseCardEdit {phrase} {bookId} />
      {:else}
        <PhraseCard {phrase} />
      {/if}
    {/each}

    {#if !filteredPhrases.length}
      <ThickPlaceholderText>No results found</ThickPlaceholderText>
    {/if}
  </div>
{/if}

<style lang="scss">
  div {
    width: 100%;
  }
</style>
