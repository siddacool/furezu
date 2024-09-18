<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import Controls from './Controls.svelte';

  interface PhraseCardFormProps {
    phrase?: Phrase;
    bookId: string;
  }

  const { phrase, bookId }: PhraseCardFormProps = $props();

  let phraseName: string = $state(phrase?.phrase || '');
  let meaning: string = $state(phrase?.meaning || '');

  function onInputPhraseName(e: Event) {
    const target = e.target as HTMLInputElement;

    phraseName = target.value;
  }

  function onInputMeaning(e: Event) {
    const target = e.target as HTMLInputElement;

    meaning = target.value;
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
      });
    } else {
      await usePhrasesStore.add(bookId, {
        phrase: phraseName,
        meaning,
      });
    }

    usePhrasesStore.clearEditing();
  }
</script>

<form {onsubmit}>
  <Card>
    <Stack space={2}>
      <StackItem>
        <h3>{phrase?.phrase ? `Edit: ${phrase.phrase}` : 'Create: Phrase'}</h3>
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
          label="Meaning"
          placeholder="Enter Meaning"
          oninput={onInputMeaning}
          value={meaning}
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
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 16px;

    :global(.Card) {
      width: 100%;
    }
  }
</style>
