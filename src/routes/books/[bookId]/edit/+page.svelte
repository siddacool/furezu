<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import { onMount } from 'svelte';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Box from '~/components/Box.svelte';
  import Button from '~/components/Button.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import { editBook, getBook } from '~/stores/book';
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
</script>

<svelte:head>
  <title>Edit: {$book?.name || ''}</title>
</svelte:head>

<Title>Edit: {$book?.name || ''}</Title>

<Box>
  <form on:submit|preventDefault={edit}>
    <Stack>
      <TextInput
        name="Book name"
        label="Book name"
        bind:value={bookName}
        on:input={onBookNameChange}
      />
    </Stack>

    <Stack>
      <div class="buttonHolder">
        <Button type="submit" variant="solid" margin disabled={!bookName.trim() || loading}>
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
