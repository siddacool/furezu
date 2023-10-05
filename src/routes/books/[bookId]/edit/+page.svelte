<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import { onMount } from 'svelte';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Button from '~/components/Button.svelte';
  import DeleteIcon from '~/components/DeleteIcon.svelte';
  import Select from '~/components/Select.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import { editBook, getBook, removeBook } from '~/stores/book';
  import { db } from '~/stores/db';
  import { getVoices } from '~/stores/voices';
  import type { Option } from '~/types';

  const bookId = $page.params.bookId;

  let book = liveQuery(() => db.books.where({ _id: bookId }).first());

  let loading = false;
  let mounted = false;
  let bookName = '';

  let voice: string | undefined = undefined;

  let voices: Option[] = [
    {
      label: 'None',
      value: undefined,
    },
  ];

  async function populateBookValues() {
    try {
      const bookData = await getBook(bookId);

      bookName = bookData?.name || '';

      const voiceList = await getVoices();

      if (voiceList) {
        const voiceOptions: Option[] = [
          {
            label: 'None',
            value: undefined,
          },
        ];

        voiceList.forEach((v) => {
          voiceOptions.push({
            label: v.name,
            value: v.name,
          });
        });

        voices = [...voiceOptions];
      }

      voice = bookData?.voice;
    } catch (error) {
      console.dir(`Failed to populate Book : ${error}`);
    } finally {
      mounted = true;
    }
  }

  onMount(() => {
    populateBookValues();
  });

  const onBookNameChange = (event: Event) => {
    bookName = (event.target as HTMLInputElement).value;
  };

  const onVoiceChange = (event: Event) => {
    voice = (event.target as HTMLInputElement).value;
  };

  async function edit() {
    try {
      loading = true;
      await editBook(bookId, bookName, voice);

      goto(`/books/${bookId}`);
    } catch (error) {
      console.dir(`Failed to edit Book : ${error}`);
    } finally {
      loading = false;
    }
  }

  async function remove() {
    try {
      loading = true;
      await removeBook(bookId);

      goto(`/`);
    } catch (error) {
      console.dir(`Failed to remove Book : ${error}`);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Edit: {$book?.name || ''}</title>
</svelte:head>

<Title>Edit: {$book?.name || ''}</Title>

<form on:submit|preventDefault={edit}>
  <Stack>
    <TextInput
      name="Book name"
      label="Book name (Required)"
      bind:value={bookName}
      on:input={onBookNameChange}
      placeholder="Japanese phrases for travel"
    />
  </Stack>

  <Stack>
    <Select
      name="Voice"
      label="Voice (for text-to-speech)"
      options={voices}
      bind:value={voice}
      on:change={onVoiceChange}
    />
  </Stack>

  <Stack>
    <div class="buttonHolder">
      <Button type="submit" variant="solid" margin disabled={!bookName.trim() || loading}>
        Save
      </Button>
      <AnchorButton href={`/books/${bookId}`} disabled={loading} margin>Cancel</AnchorButton>
      <Button disabled={loading} name="delete" on:click={remove}>
        <DeleteIcon slot="before" /> Delete
      </Button>
    </div>
  </Stack>
</form>

<style lang="scss">
  .buttonHolder {
    display: flex;
    padding-top: 16px;
    justify-content: flex-end;
  }
</style>
