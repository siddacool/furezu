<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';

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
    <Stack>
      <StackItem>
        <h3>{phrase.meaning}</h3>
      </StackItem>
      <StackItem>
        <h4>{phrase.phrase}</h4>
      </StackItem>
      <StackItem>
        <h4>{phrase.pronounciation}</h4>
      </StackItem>
      <StackItem>
        <h4>{phrase.translation}</h4>
      </StackItem>
    </Stack>
  </Card>
  {#if !usePhrasesStore.curruntlyEditing && !usePhrasesStore.createMode}
    <Button class="EditButton" compact onclick={onEdit}><Icon icon="mdi:pencil-outline" /></Button>
  {/if}
</section>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  section {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;

    :global(.EditButton) {
      position: absolute;
      right: 12px;
      top: 12px;

      @include mediaLg {
        right: 16px;
        top: 16px;
      }
    }

    :global(.Card) {
      width: 100%;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 25px;
    font-weight: 600;

    @include mediaLg {
      font-size: 1.45rem;
      line-height: 30px;
    }
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 25px;
    font-weight: 500;

    @include mediaLg {
      font-size: 1.2rem;
      line-height: 30px;
    }
  }
</style>
