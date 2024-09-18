<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import Controls from './Controls.svelte';

  interface BookCardFormProps {
    book?: Book;
  }

  const { book }: BookCardFormProps = $props();

  let name: string = $state(book?.name || '');
  let voice: string | undefined = $state(book?.voice);

  function onInputName(e: Event) {
    const target = e.target as HTMLInputElement;

    name = target.value;
  }

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();

    const submitterName = e.submitter?.getAttribute('name');

    if (submitterName !== 'save') {
      return;
    }

    if (book?._id) {
      await useBooksStore.update(book._id, name, voice);
    } else {
      await useBooksStore.add(name, voice);
    }

    useBooksStore.clearEditing();
  }
</script>

<form {onsubmit}>
  <Card>
    <Stack space={2}>
      <StackItem>
        <h3>{book?.name ? `Edit: ${book.name}` : 'Create: Book'}</h3>
      </StackItem>
      <StackItem>
        <TextInput
          disabled={useBooksStore.fetching}
          label="Name"
          placeholder="Example: Thai for travel"
          oninput={onInputName}
          value={name}
        />
      </StackItem>
      <Controls id={book?._id} {name} />
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
