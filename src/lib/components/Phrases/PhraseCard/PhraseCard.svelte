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

<DisplayCard
  {onedit}
  hideEditButton={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
  title={phrase.meaning}
>
  <Stack space={3}>
    <StackItem>
      <h3>{phrase.phrase}</h3>
    </StackItem>
    <Translation {phrase} />
  </Stack>
</DisplayCard>

<style lang="scss">
  h3 {
    display: flex;
    align-items: center;
    color: var(--color-primary-600);
    font-style: italic;
    font-size: 1.5rem;
    margin: 0;
  }
</style>
