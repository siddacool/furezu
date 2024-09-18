<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  interface PhraseCardProps {
    phrase: Phrase;
  }

  const { phrase }: PhraseCardProps = $props();

  function onEdit() {
    usePhrasesStore.startEditing(phrase._id);
  }
</script>

<section>
  <Card>
    <h3>{phrase.phrase}</h3>
  </Card>
  {#if !usePhrasesStore.curruntlyEditing && !usePhrasesStore.createMode}
    <Button class="Edit" compact onclick={onEdit}><Icon icon="mdi:pencil-outline" /></Button>
  {/if}
</section>

<style lang="scss">
  section {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;

    :global(.Edit) {
      position: absolute;
      right: 16px;
      top: 16px;
    }

    :global(.Card) {
      width: 100%;
    }
  }
</style>
