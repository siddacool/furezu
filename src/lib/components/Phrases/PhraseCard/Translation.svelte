<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import Icon from '@iconify/svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';

  interface TranslationProps {
    phrase: Phrase;
  }

  const { phrase }: TranslationProps = $props();

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === phrase.bookId));
  const voice = $derived(useVoicesStore.voices.find((item) => item.value === targetBook?.voice));
</script>

{#if phrase.translation}
  <StackItem>
    <div class="translationContainer">
      {#if voice?.value}
        {#if useVoicesStore.speakingPhraseId === phrase._id}
          <Button class="Speaking" compact>
            <Icon icon="svg-spinners:bars-scale" />
          </Button>
        {:else}
          <Button
            onclick={() => useVoicesStore.speak(phrase._id, voice.value, phrase.translation || '')}
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

<style lang="scss">
  h3 {
    margin: 0;
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
