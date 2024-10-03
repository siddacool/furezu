<script lang="ts">
  import { page } from '$app/stores';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import Title from '../Title.svelte';
  import PhraseGroup from './PhraseGroup.svelte';

  let filteredPhrases: Phrase[] = $state([]);
  let isUnGroupedPhrases: boolean = $state(false);

  const bookId = $page.params.id;

  const bookPhrases = $derived(
    usePhrasesStore.phrases.filter((item) => !item.hidden && item.bookId === bookId),
  );

  const groups = $derived(useGroupsStore.groups.filter((item) => item.bookId === bookId));

  $effect(() => {
    const searchFilter = usePhrasesStore.searchFilter?.trim()?.toLocaleLowerCase() || '';

    const phrases = usePhrasesStore.phrases.filter(
      (item) =>
        !item.hidden &&
        item.bookId === bookId &&
        item.meaning.trim().toLocaleLowerCase().includes(searchFilter),
    );

    filteredPhrases = phrases;
    isUnGroupedPhrases = phrases.some((item) => !item.groupId);
  });
</script>

{#if bookPhrases.length}
  <div>
    {#if filteredPhrases.length}
      {#each groups as group}
        <PhraseGroup phrases={filteredPhrases} id={group._id} name={group.name} />
      {/each}

      {#if isUnGroupedPhrases}
        <PhraseGroup phrases={filteredPhrases} />
      {/if}
    {:else}
      <Title>No results found</Title>
    {/if}
  </div>
{/if}

<style lang="scss">
  div {
    width: 100%;
  }
</style>
