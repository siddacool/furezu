<script lang="ts">
  import { page } from '$app/stores';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import Accordian from '../ui-framework/Layout/Accordian.svelte';
  import PhraseCard from './PhraseCard/PhraseCard.svelte';
  import PhraseCardEdit from './PhraseCardEdit.svelte';

  interface PhraseGroupProps {
    phrases: Phrase[];
    id?: string;
    name?: string;
  }

  const bookId = $page.params.id;

  const { id, name = 'Ungrouped', phrases }: PhraseGroupProps = $props();

  const isGroupOpen = $derived(
    useGroupsStore.groups.find((item) => item._id === id)?.open || false,
  );
  let open = $derived(id ? isGroupOpen : true);

  const groupPhrases = $derived(phrases.filter((item) => !item.hidden && item.groupId === id));
  const filteredPhrases = $derived(id ? groupPhrases : phrases);
</script>

<Accordian class="PhraseGroup" title={name}>
  <div>
    {#each filteredPhrases as phrase}
      {#if usePhrasesStore.curruntlyEditing === phrase._id}
        <PhraseCardEdit {phrase} {bookId} />
      {:else}
        <PhraseCard {phrase} />
      {/if}
    {/each}
  </div>
</Accordian>

<style lang="scss">
</style>
