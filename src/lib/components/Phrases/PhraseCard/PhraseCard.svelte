<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import DisplayCard from '$lib/components/DisplayCard/DisplayCard.svelte';
  import Advanced from './Advanced/Advanced.svelte';
  import DragHandle from './DragHandle.svelte';

  interface PhraseCardProps { phrase: Phrase; }
  const { phrase }: PhraseCardProps = $props();
  function onedit(e: MouseEvent) { e.preventDefault(); usePhrasesStore.startEditing(phrase._id); }
  const pronunciation = $derived(phrase.pronunciation || phrase.pronounciation);
</script>

<div class="PhraseCard">
  <DisplayCard {onedit} hideEditButton={usePhrasesStore.sortingMode || usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode} title={phrase.meaning}>
    <article>
      <section>
        <h3>{phrase.phrase}</h3>
        {#if pronunciation}<p class="pronunciation" aria-label="Phonetic pronunciation">{pronunciation}</p>{/if}
        <Advanced {phrase} />
      </section>
      <section><DragHandle /></section>
    </article>
  </DisplayCard>
</div>

<style lang="scss">
  h3 { color: var(--color-primary-600); font-style: italic; font-size: 1.1rem; margin: 0; line-height: 25px; font-weight: 500; }
  .pronunciation { margin: 6px 0 0; color: var(--color-primary-700); font-size: 0.95rem; }
  .PhraseCard :global(.Card) { min-height: 100px; }
  article { display: flex; section:first-child { flex: 1; } }
</style>
