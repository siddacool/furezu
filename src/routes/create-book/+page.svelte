<script lang="ts">
  import { goto } from '$app/navigation';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Box from '~/components/Box.svelte';
  import Button from '~/components/Button.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import { createBook } from '~/stores/book';

  let bookName = '';
  let loading = false;

  const onBookNameChange = (event: Event) => {
    bookName = (event.target as HTMLInputElement).value;
  };

  async function addBook() {
    try {
      loading = true;
      await createBook(bookName);

      goto('/');
    } catch (error) {
      console.dir(`Failed to add Book ${bookName}: ${error}`);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Create book</title>
</svelte:head>

<Title>Create book</Title>

<Box>
  <form on:submit|preventDefault={addBook}>
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
        <AnchorButton href="/" disabled={loading}>Cancel</AnchorButton>
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
