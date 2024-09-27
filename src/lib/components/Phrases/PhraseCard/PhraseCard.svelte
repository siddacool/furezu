<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import DisplayCard from '$lib/components/DisplayCard/DisplayCard.svelte';
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
    <h3>{phrase.phrase}</h3>
    <Translation {phrase} />
  </DisplayCard>
</div>

<style lang="scss">
  h3 {
    display: flex;
    align-items: center;
    color: var(--color-primary-600);
    font-style: italic;
    font-size: 1.1rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 25px;
    font-weight: 500;

    :global(svg) {
      font-style: normal;
      margin-right: 4px;
    }
  }
</style>
