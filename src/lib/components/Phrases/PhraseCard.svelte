<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { Stack, StackItem } from '../ui-framework/Layout/Stack';
  import DisplayCard from '../DisplayCard.svelte';
  import Icon from '@iconify/svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { speak } from '$lib/stores/voices/speak';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';

  interface PhraseCardProps {
    phrase: Phrase;
  }

  const { phrase }: PhraseCardProps = $props();

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === phrase.bookId));
  const voice = $derived(useVoicesStore.voices.find((item) => item.value === targetBook?.voice));

  function onEdit() {
    usePhrasesStore.startEditing(phrase._id);
  }

  function onSpeaking(reading: boolean) {
    console.log(reading);
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
        <div class="speakContainer">
          <Button
            onclick={() => speak(voice, phrase.translation, onSpeaking)}
            class="Speak"
            variant="primary"
          >
            Speak
          </Button>
        </div>

        <h3>{phrase.translation}</h3>
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

  h3.phrase {
    font-size: 1.5rem;
  }

  .speakContainer {
    :global(.Speak) {
      cursor: default;
      pointer-events: all;
    }
  }
</style>
