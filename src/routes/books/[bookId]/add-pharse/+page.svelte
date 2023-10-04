<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Box from '~/components/Box.svelte';
  import Button from '~/components/Button.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextArea from '~/components/TextArea.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import { db } from '~/stores/db';
  import { createPharse } from '~/stores/pharse';

  let loading = false;

  const bookId = $page.params.bookId;

  let meaning = '';
  let phrase = '';
  let pronounciation = '';
  let translation = '';
  let description = '';

  const onMeaningChange = (event: Event) => {
    meaning = (event.target as HTMLInputElement).value;
  };

  const onPhraseChange = (event: Event) => {
    phrase = (event.target as HTMLInputElement).value;
  };

  const onPronounciationChange = (event: Event) => {
    pronounciation = (event.target as HTMLInputElement).value;
  };

  const onTranslationChange = (event: Event) => {
    translation = (event.target as HTMLInputElement).value;
  };

  const onDescriptionChange = (event: Event) => {
    description = (event.target as HTMLInputElement).value;
  };

  async function addPharse() {
    try {
      loading = true;
      await createPharse({ bookId, meaning, phrase, pronounciation, translation, description });

      goto(`/books/${bookId}`);
    } catch (error) {
      console.dir(`Failed to add Book : ${error}`);
    } finally {
      loading = false;
    }
  }

  let book = liveQuery(() => db.books.where({ _id: bookId }).first());
</script>

<svelte:head>
  <title>Add pharse</title>
</svelte:head>

<Box>
  <form on:submit|preventDefault={addPharse}>
    <Title>Add pharse: {$book?.name || ''}</Title>
    <Stack>
      <TextInput
        name="PhraseMeaning"
        label="Phrase Meaning"
        bind:value={meaning}
        on:input={onMeaningChange}
      />
    </Stack>
    <Stack>
      <TextInput name="Phrase" label="Phrase" bind:value={phrase} on:input={onPhraseChange} />
    </Stack>

    <Stack>
      <TextInput
        name="Pronounciation"
        label="Pronounciation"
        bind:value={pronounciation}
        on:input={onPronounciationChange}
      />
    </Stack>

    <Stack>
      <TextInput
        name="Translation"
        label="Translation"
        bind:value={translation}
        on:input={onTranslationChange}
      />
    </Stack>

    <Stack>
      <TextArea
        name="Description"
        label="Description"
        bind:value={description}
        on:input={onDescriptionChange}
      />
    </Stack>

    <Stack>
      <div class="buttonHolder">
        <Button
          type="submit"
          variant="solid"
          margin
          disabled={!meaning.trim() || !phrase.trim() || loading}
        >
          Save
        </Button>
        <AnchorButton href={`/books/${bookId}`} disabled={loading}>Cancel</AnchorButton>
      </div>
    </Stack>
  </form>
</Box>

<style lang="scss">
  .buttonHolder {
    display: flex;
    padding-top: 16px;
    justify-content: flex-end;
  }
</style>
