<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';
  import DisplayCard from '../DisplayCard.svelte';

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
      <h5>{phrase.phrase}</h5>
    </StackItem>
    {#if phrase.translation}
      <StackItem>
        <h4>{phrase.translation}</h4>
      </StackItem>
    {/if}
  </Stack>
</DisplayCard>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

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
    font-size: 1.1rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 25px;
    font-weight: 500;

    @include mediaLg {
      font-size: 1.3rem;
      line-height: 30px;
    }
  }

  h5 {
    font-size: 1.3rem;
    margin-bottom: 0;
    margin-top: 0;
    line-height: 25px;
    font-weight: 300;

    @include mediaLg {
      font-size: 1.7rem;
      line-height: 30px;
    }
  }
</style>
