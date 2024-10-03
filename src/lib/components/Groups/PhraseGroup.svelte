<script lang="ts">
  import { page } from '$app/stores';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import CreateAPhrase from '../Phrases/CreateAPhrase.svelte';
  import PhraseCard from '../Phrases/PhraseCard/PhraseCard.svelte';
  import PhraseCardEdit from '../Phrases/PhraseCardEdit.svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import Accordian from '../ui-framework/Layout/Accordian.svelte';

  interface PhraseGroupProps {
    phrases: Phrase[];
    id?: string;
    name?: string;
  }

  const bookId = $page.params.id;

  const { id, name = 'Ungrouped', phrases }: PhraseGroupProps = $props();

  let open = $state(true);
  let filteredPhrases: Phrase[] = $state([]);
  let isGroupActive = $state(false);

  function onclick() {
    open = !open;
  }

  function onAddPhrase() {
    usePhrasesStore.startCreateMode(id || 'ungrouped');
  }

  $effect(() => {
    if (id) {
      filteredPhrases = phrases.filter((item) => item.groupId === id);
    } else {
      filteredPhrases = phrases;
    }
  });

  $effect(() => {
    if (id) {
      isGroupActive = usePhrasesStore.activeGroup === id ? true : false;
    } else {
      isGroupActive = usePhrasesStore.activeGroup === 'ungrouped' ? true : false;
    }
  });
</script>

<Accordian class="PhraseGroup" title={name} {onclick} {open}>
  <section>
    {#each filteredPhrases as phrase}
      {#if usePhrasesStore.curruntlyEditing === phrase._id}
        <PhraseCardEdit {phrase} {bookId} groupId={id} />
      {:else}
        <PhraseCard {phrase} />
      {/if}
    {/each}

    {#if !usePhrasesStore.curruntlyEditing && !usePhrasesStore.createMode}
      <article>
        <Button onclick={onAddPhrase} variant="primary">Add Phrase</Button>
      </article>
    {/if}

    {#if isGroupActive}
      <CreateAPhrase groupId={id} />
    {/if}
  </section>
</Accordian>

<style lang="scss">
  article {
    text-align: center;
    padding: 8px 0;
    padding-bottom: 24px;
  }
</style>
