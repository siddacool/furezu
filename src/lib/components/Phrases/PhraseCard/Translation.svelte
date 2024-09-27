<script lang="ts">
  import type { Phrase } from '$lib/stores/phrases/types';
  import Icon from '@iconify/svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';

  interface TranslationProps {
    phrase: Phrase;
  }

  const { phrase }: TranslationProps = $props();

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === phrase.bookId));
  const voice = $derived(useVoicesStore.voices.find((item) => item.value === targetBook?.voice));
</script>

{#if phrase.translation}
  <div class="translationContainer">
    {#if voice?.value}
      {#if useVoicesStore.speakingPhraseId === phrase._id}
        <Button class="TranslationButton Speaking" compact variant="default">
          <Icon icon="svg-spinners:bars-scale" />
        </Button>
      {:else}
        <Button
          onclick={() => useVoicesStore.speak(phrase._id, voice.value, phrase.translation || '')}
          class="TranslationButton Speak"
          disabled={useVoicesStore.speaking}
          compact
          title="Say it aloud"
          variant="default"
        >
          <Icon icon="f7:speaker-2" />
        </Button>
      {/if}
    {/if}

    <h3>{phrase.translation}</h3>
  </div>
{/if}

<style lang="scss">
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 400;
  }

  .translationContainer {
    display: flex;
    align-items: center;
    margin-top: 14px;

    :global(.TranslationButton.variant--default) {
      margin-right: 8px;
      align-self: baseline;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      min-width: initial;
    }

    :global(.TranslationButton svg) {
      font-size: 1.3rem;
    }

    :global(.Speaking) {
      pointer-events: none;
    }
  }
</style>
