<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Button from '~/components/Button.svelte';
  import Stack from '~/components/Stack.svelte';
  import TextInput from '~/components/TextInput.svelte';
  import Title from '~/components/Title.svelte';
  import VoiceSelect from '~/components/VoiceSelect.svelte';
  import { createBook } from '~/stores/book';

  let bookName = '';
  let voice = '';

  let loading = false;

  const onBookNameChange = (event: Event) => {
    bookName = (event.target as HTMLInputElement).value;
  };

  const onVoiceChange = (event: Event) => {
    voice = (event.target as HTMLInputElement).value;
  };

  async function addBook() {
    try {
      loading = true;
      await createBook(bookName, voice);

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

<form on:submit|preventDefault={addBook}>
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
    <VoiceSelect bind:value={voice} on:change={onVoiceChange} />
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

<style lang="scss">
  .buttonHolder {
    display: flex;
    padding-top: 16px;
    justify-content: flex-end;
  }
</style>
