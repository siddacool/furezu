<script lang="ts">
  import { page } from '$app/stores';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import Icon from '@iconify/svelte';
  import { SortableItem } from 'svelte-sortable-items';
  import LightButton from '../LightButton.svelte';
  import CreateAPhrase from '../Phrases/CreateAPhrase.svelte';
  import PhraseCard from '../Phrases/PhraseCard/PhraseCard.svelte';
  import PhraseCardEdit from '../Phrases/PhraseCardEdit.svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import Accordian from '../ui-framework/Layout/Accordian.svelte';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { useUngroupOpenStore } from '$lib/stores/local-settings/ungroup-open.svelte';
  import { flip } from 'svelte/animate';

  interface PhraseGroupProps {
    phrases: Phrase[];
    id?: string;
    name?: string;
    index: number;
  }

  const bookId = $page.params.id;

  const { id, name = 'Ungrouped', phrases, index }: PhraseGroupProps = $props();
  const openGroup = $derived(useGroupsStore.groups.find((item) => item._id === id)?.open || false);
  const openUnGroup = $derived(useUngroupOpenStore.ungroupOpen);
  const open = $derived(id ? openGroup : openUnGroup);
  let filteredPhrases: Phrase[] = $state([]);
  let isGroupActive = $state(false);
  let stateHoveredItem = $state<number>(-1);

  function onclick() {
    if (id) {
      useGroupsStore.updateOpenState(id, !open);
    } else {
      useUngroupOpenStore.updateUngroupOpen(!open);
    }
  }

  function onAddPhrase() {
    usePhrasesStore.startCreateMode(id || 'ungrouped');
  }

  function onedit() {
    if (!id) {
      return;
    }

    useGroupsStore.startEditing(id);
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

  $effect(() => {
    console.log(stateHoveredItem);

    if (filteredPhrases.length) {
      usePhrasesStore.order(filteredPhrases, index);
    }
  });
</script>

<Accordian class="PhraseGroup" title={name} {onclick} {open}>
  <section>
    {#each filteredPhrases as phrase, numberCounter (phrase._id)}
      <div animate:flip={{ duration: 100 }}>
        {#if usePhrasesStore.curruntlyEditing === phrase._id}
          <PhraseCardEdit {phrase} {bookId} groupId={id} />
        {:else if usePhrasesStore.curruntlyEditing}
          <PhraseCard {phrase} dragging={false} />
        {:else}
          <SortableItem
            propItemNumber={numberCounter}
            bind:propData={filteredPhrases as unknown[]}
            bind:propHoveredItemNumber={stateHoveredItem}
          >
            <PhraseCard {phrase} dragging={stateHoveredItem === numberCounter ? true : false} />
          </SortableItem>
        {/if}
      </div>
    {/each}

    {#if !usePhrasesStore.curruntlyEditing && !usePhrasesStore.createMode}
      <article>
        <Button onclick={onAddPhrase} variant="inert">Add Phrase</Button>
      </article>
    {/if}

    {#if isGroupActive}
      <CreateAPhrase groupId={id} />
    {/if}

    <hr />
  </section>

  {#snippet headerContent()}
    {#if id && !open}
      <div class="headerContent">
        <LightButton
          class={`EditButton theme theme--${useThemeStore.colorScheme}`}
          compact
          onclick={onedit}
          title="Edit group"
        >
          <Icon icon="tabler:edit" />
        </LightButton>
      </div>
    {/if}
  {/snippet}
</Accordian>

<style lang="scss">
  article {
    text-align: center;
    padding: 8px 0;
  }

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    height: 1px;
    background-color: var(--color-grey-300);
    margin-bottom: 24px;
  }

  .headerContent {
    :global(.EditButton.variant--inert) {
      padding: 0;
    }

    :global(.EditButton.variant--inert.theme--dark) {
      color: var(--color-primary-600);
    }
  }
</style>
