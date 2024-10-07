<script lang="ts">
  import { page } from '$app/stores';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesDragStore } from '$lib/stores/system/phrases-drag.svelte';
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

    const groupIds = groups.map((item) => item._id);

    filteredPhrases = phrases;
    ungroupedPhrases = phrases.filter(
      (item) => !item.groupId || (item.groupId && !groupIds.includes(item.groupId)),
    );
  });
</script>

<div class={`${usePhrasesDragStore.dragHandleActive ? 'dragHandleActive' : 'dragHandleInActive'}`}>
  {#each groups as group, numberCounter}
    {#if useGroupsStore.curruntlyEditing === group._id}
      <GroupCardEdit {group} {bookId} />
    {:else}
      <PhraseGroup
        phrases={filteredPhrases}
        id={group._id}
        name={group.name}
        index={numberCounter + 1}
      />
    {/if}
  {/each}

  {#if ungroupedPhrases.length}
    <PhraseGroup phrases={ungroupedPhrases} index={0} />
  {/if}
</div>

<style lang="scss">
  div {
    width: 100%;

    &.dragHandleInActive {
      :global([draggable='true']) {
        pointer-events: none;
      }
    }
  }
</style>
