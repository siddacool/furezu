<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import { onMount } from 'svelte';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Button from '~/components/Button.svelte';
  import DeleteIcon from '~/components/DeleteIcon.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import { editBook, getBook, removeBook } from '~/stores/book';
  import { db } from '~/stores/db';

  const bookId = $page.params.bookId;

  let book = liveQuery(() => db.books.where({ _id: bookId }).first());

  let loading = false;
  let mounted = false;
  let bookName = '';

  async function populateBookValues() {
    try {
      const bookData = await getBook(bookId);

      bookName = bookData?.name || '';
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

  async function edit() {
    try {
      loading = true;
      await editBook(bookId, bookName);

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
      label="Book name"
      bind:value={bookName}
      on:input={onBookNameChange}
      placeholder="Japanese phrases for travel"
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
