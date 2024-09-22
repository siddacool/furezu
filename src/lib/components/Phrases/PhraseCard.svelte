<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';
  import DisplayCard from '../DisplayCard.svelte';
  import Icon from '@iconify/svelte';

  interface PhraseCardProps {
    phrase: Phrase;
  }

  const { phrase }: PhraseCardProps = $props();

  function onEdit() {
    usePhrasesStore.startEditing(phrase._id);
  }
</script>

<DisplayCard
  {onEdit}
  disableClick
  hideEditButton={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
>
  <Stack space={3}>
    <StackItem>
      <h3>{phrase.meaning}</h3>
    </StackItem>
    <StackItem>
      <h3 class="phrase"><Icon icon="mdi:talk" /> {phrase.phrase}</h3>
    </StackItem>
    {#if phrase.translation}
      <StackItem>
        <h3>{phrase.translation}</h3>
      </StackItem>
    {/if}
  </Stack>
</DisplayCard>

<style lang="scss">
  .phrase {
    display: flex;
    align-items: center;
    color: var(--color-primary-700);
    font-style: italic;

    :global(svg) {
      display: flex;
      align-items: center;
      margin-right: 8px;
      color: var(--color-primary-600);
    }
  }
</style>
