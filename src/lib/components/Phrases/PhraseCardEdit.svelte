<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';

  interface PhraseCardFormProps {
    phrase?: Phrase;
    bookId: string;
  }

  const { phrase, bookId }: PhraseCardFormProps = $props();

  let phraseName: string = $state(phrase?.phrase || '');
  let meaning: string = $state(phrase?.meaning || '');
  let pronounciation: string = $state(phrase?.pronounciation || '');
  let translation: string = $state(phrase?.translation || '');

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'phrase':
        phraseName = target.value;
        break;
      case 'meaning':
        meaning = target.value;
        break;
      case 'pronounciation':
        pronounciation = target.value;
        break;
      case 'translation':
        translation = target.value;
        break;
      default:
        break;
    }
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

  function onCancel() {
    usePhrasesStore.clearEditing();
  }

  async function onDelete() {
    if (phrase?._id) {
      await usePhrasesStore.delete(phrase._id);
    }

    usePhrasesStore.clearEditing();
  }
</script>

<EditCard
  {onsubmit}
  {onCancel}
  {onDelete}
  title={phrase?.phrase ? `Edit: ${limitTextLength(phrase.meaning)}` : 'Create: Phrase'}
  disableSubmit={!phraseName?.trim() || !meaning?.trim() ? true : false}
  hideDeleteButton={!phrase?._id}
>
  <Stack space={2}>
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Phrase Meaning (Required)"
        placeholder="Enter Meaning"
        {oninput}
        value={meaning}
        name="meaning"
      />
    </StackItem>
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Phrase (Required)"
        placeholder="Enter phrase"
        {oninput}
        value={phraseName}
        name="phrase"
      />
    </StackItem>
    <StackItem />
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Pronounciation"
        placeholder="Enter pronounciation"
        {oninput}
        value={pronounciation}
        name="pronounciation"
      />
    </StackItem>
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Translation"
        placeholder="Enter translation"
        {oninput}
        value={translation}
        name="translation"
      />
    </StackItem>
  </Stack>
</EditCard>
