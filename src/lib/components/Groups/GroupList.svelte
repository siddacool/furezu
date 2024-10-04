<script lang="ts">
  import { page } from '$app/stores';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import GroupCardEdit from './GroupCardEdit.svelte';
  import PhraseGroup from './PhraseGroup.svelte';

  let filteredPhrases: Phrase[] = $state([]);
  let ungroupedPhrases: Phrase[] = $state([]);

  const bookId = $page.params.id;

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
    ungroupedPhrases = phrases.filter((item) => !item.groupId);
  });
</script>

<div>
  {#each groups as group}
    {#if useGroupsStore.curruntlyEditing === group._id}
      <GroupCardEdit {group} {bookId} />
    {:else}
      <PhraseGroup phrases={filteredPhrases} id={group._id} name={group.name} />
    {/if}
  {/each}

  {#if ungroupedPhrases.length}
    <PhraseGroup phrases={ungroupedPhrases} />
  {/if}
</div>

<style lang="scss">
  div {
    width: 100%;
  }
</style>
