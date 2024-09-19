<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import Controls from './Controls.svelte';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';

  interface PhraseCardFormProps {
    phrase?: Phrase;
    bookId: string;
  }

  const { phrase, bookId }: PhraseCardFormProps = $props();

  let phraseName: string = $state(phrase?.phrase || '');
  let meaning: string = $state(phrase?.meaning || '');
  let pronounciation: string = $state(phrase?.pronounciation || '');
  let translation: string = $state(phrase?.translation || '');

  function onInputPhraseName(e: Event) {
    const target = e.target as HTMLInputElement;

    phraseName = target.value;
  }

  function onInputMeaning(e: Event) {
    const target = e.target as HTMLInputElement;

    meaning = target.value;
  }

  function onInputPronounciation(e: Event) {
    const target = e.target as HTMLInputElement;

    pronounciation = target.value;
  }

  function onInputTranslation(e: Event) {
    const target = e.target as HTMLInputElement;

    translation = target.value;
  }

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();

    const submitterName = e.submitter?.getAttribute('name');

    if (submitterName !== 'save') {
      return;
    }

    if (phrase?._id) {
      await usePhrasesStore.update(phrase._id, {
        phrase: phraseName,
        meaning,
        pronounciation,
        translation,
      });
    } else {
      await usePhrasesStore.add(bookId, {
        phrase: phraseName,
        meaning,
        pronounciation,
        translation,
      });
    }

    usePhrasesStore.clearEditing();
  }
</script>

<form {onsubmit}>
  <Card>
    <Stack space={3}>
      <StackItem>
        <h3>{phrase?.phrase ? `Edit: ${limitTextLength(phrase.phrase)}` : 'Create: Phrase'}</h3>
      </StackItem>
      <StackItem>
        <TextInput
          disabled={usePhrasesStore.fetching}
          label="Phrase Meaning"
          placeholder="Enter Meaning"
          oninput={onInputMeaning}
          value={meaning}
        />
      </StackItem>
      <StackItem>
        <TextInput
          disabled={usePhrasesStore.fetching}
          label="Phrase"
          placeholder="Enter phrase"
          oninput={onInputPhraseName}
          value={phraseName}
        />
      </StackItem>
      <StackItem>
        <TextInput
          disabled={usePhrasesStore.fetching}
          label="Pronounciation"
          placeholder="Enter pronounciation"
          oninput={onInputPronounciation}
          value={pronounciation}
        />
      </StackItem>
      <StackItem>
        <TextInput
          disabled={usePhrasesStore.fetching}
          label="Translation"
          placeholder="Enter translation"
          oninput={onInputTranslation}
          value={translation}
        />
      </StackItem>
      <Controls
        id={phrase?._id}
        saveDisabled={!phraseName?.trim() || !meaning?.trim() ? true : false}
      />
    </Stack>
  </Card>
</form>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 16px;

    :global(.Card) {
      width: 100%;
    }
  }

  h3 {
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    margin-bottom: -6px;

    @include mediaLg {
      font-size: 1.2rem;
    }
  }
</style>
