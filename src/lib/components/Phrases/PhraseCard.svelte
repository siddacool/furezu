<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';
  import Icon from '@iconify/svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import DisplayCard from '../DisplayCard';

  interface PhraseCardProps {
    phrase: Phrase;
  }

  const { phrase }: PhraseCardProps = $props();

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === phrase.bookId));

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
      <h3 class="phrase">{phrase.phrase}</h3>
    </StackItem>
    {#if phrase.translation}
      <StackItem>
        <div class="translationContainer">
          {#if targetBook?.voice}
            {#if useVoicesStore.speakingPhraseId === phrase._id}
              <Button class="Speaking" compact>
                <Icon icon="svg-spinners:bars-scale" />
              </Button>
            {:else}
              <Button
                onclick={() =>
                  useVoicesStore.speak(
                    phrase._id,
                    targetBook.voice || '',
                    phrase.translation || '',
                  )}
                class="Speak"
                disabled={useVoicesStore.speaking}
                compact
                title="Say it aloud"
              >
                <Icon icon="f7:speaker-2" />
              </Button>
            {/if}
          {/if}

          <h3>{phrase.translation}</h3>
        </div>
      </StackItem>
    {/if}
  </Stack>
</DisplayCard>

<style lang="scss">
  .phrase {
    display: flex;
    align-items: center;
    color: var(--color-primary-600);
    font-style: italic;

    :global(svg) {
      display: flex;
      align-items: center;
      margin-right: 8px;
      color: var(--color-primary-600);
    }
  }

  h3 {
    margin: 0;
  }

  h3.phrase {
    font-size: 1.5rem;
  }

  .translationContainer {
    display: flex;
    align-items: center;

    :global(.Speak) {
      margin-right: 16px;
      align-self: baseline;
    }

    :global(.Speaking) {
      margin-right: 16px;
      pointer-events: none;
      align-self: baseline;
    }
  }
</style>
