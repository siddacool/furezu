<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import DisplayCard from '$lib/components/DisplayCard/DisplayCard.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import Translation from './Translation.svelte';

  interface PhraseCardProps {
    phrase: Phrase;
  }

  const { phrase }: PhraseCardProps = $props();

  function onedit() {
    usePhrasesStore.startEditing(phrase._id);
  }
</script>

<div>
  <DisplayCard
    {onedit}
    hideEditButton={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
    title={phrase.meaning}
  >
    <Stack space={2}>
      <StackItem>
        <h3>{phrase.phrase}</h3>
      </StackItem>
      <Translation {phrase} />
    </Stack>
  </DisplayCard>
</div>

<style lang="scss">
  h3 {
    display: flex;
    align-items: center;
    color: var(--color-primary-600);
    font-style: italic;
    font-size: 1.35rem;
    margin-bottom: 0;
    margin-top: 8px;
    line-height: 25px;
    font-weight: 400;

    :global(svg) {
      font-style: normal;
      margin-right: 4px;
    }
  }

  div {
    :global(.Title h3) {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
</style>
