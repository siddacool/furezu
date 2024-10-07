<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import DisplayCard from '$lib/components/DisplayCard/DisplayCard.svelte';
  import Translation from './Translation.svelte';
  import Advanced from './Advanced/Advanced.svelte';
  import DragHandle from './DragHandle.svelte';

  interface PhraseCardProps {
    phrase: Phrase;
  }

  const { phrase }: PhraseCardProps = $props();

  function onedit(e: MouseEvent) {
    e.preventDefault();
    usePhrasesStore.startEditing(phrase._id);
  }
</script>

<div class={`PhraseCard`}>
  <DisplayCard
    {onedit}
    hideEditButton={usePhrasesStore.sortingMode ||
    usePhrasesStore.curruntlyEditing ||
    usePhrasesStore.createMode
      ? true
      : false}
    title={phrase.meaning}
  >
    <article>
      <section>
        <h3>{phrase.phrase}</h3>
        <Translation {phrase} />
        <Advanced {phrase} />
      </section>

      <section>
        <DragHandle />
      </section>
    </article>
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

  .PhraseCard {
    :global(.Card) {
      min-height: 100px;
    }
  }

  article {
    display: flex;

    section {
      &:first-child {
        flex: 1;
      }
    }
  }
</style>
