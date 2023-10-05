<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import { liveQuery } from 'dexie';
  import { onMount } from 'svelte';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Button from '~/components/Button.svelte';
  import DeleteIcon from '~/components/DeleteIcon.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextArea from '~/components/TextArea.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import { db } from '~/stores/db';
  import { editPharse, getPharse, removePharse } from '~/stores/pharse';

  const bookId = $page.params.bookId;
  const pharseId = $page.params.pharseId;

  let phraseBase = liveQuery(() => db.phrases?.where({ _id: pharseId }).first());

  let loading = false;
  let mounted = false;
  let meaning = '';
  let phrase = '';
  let pronounciation = '';
  let translation = '';
  let description = '';

  async function populatePharseValues() {
    try {
      const phraseData = await getPharse(pharseId);

      meaning = phraseData?.meaning || '';
      phrase = phraseData?.phrase || '';
      pronounciation = phraseData?.pronounciation || '';
      translation = phraseData?.translation || '';
      description = phraseData?.description || '';
    } catch (error) {
      console.dir(`Failed to populate Pharse : ${error}`);
    } finally {
      mounted = true;
    }
  }

  onMount(() => {
    populatePharseValues();
  });

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

  async function edit() {
    try {
      loading = true;
      await editPharse(pharseId, { meaning, phrase, pronounciation, translation, description });

      goto(`/books/${bookId}/${pharseId}`);
    } catch (error) {
      console.dir(`Failed to edit Pharse : ${error}`);
    } finally {
      loading = false;
    }
  }

  async function remove() {
    try {
      loading = true;
      await removePharse(pharseId);

      goto(`/books/${bookId}`);
    } catch (error) {
      console.dir(`Failed to remove Pharse : ${error}`);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Edit pharse</title>
</svelte:head>

{#if $phraseBase?._id && mounted}
  <form on:submit|preventDefault={edit}>
    <Title>Edit pharse: {$phraseBase?.meaning}</Title>
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
          name="save"
          margin
          disabled={!meaning.trim() || !phrase.trim() || loading}
        >
          Save
        </Button>
        <AnchorButton href={`/books/${bookId}/${pharseId}`} margin disabled={loading}>
          Cancel
        </AnchorButton>
        <Button disabled={loading} name="delete" on:click={remove}>
          <DeleteIcon slot="before" />
          Delete
        </Button>
      </div>
    </Stack>
  </form>
{/if}

<style lang="scss">
  .buttonHolder {
    display: flex;
    padding-top: 16px;
    justify-content: flex-end;
  }
</style>
