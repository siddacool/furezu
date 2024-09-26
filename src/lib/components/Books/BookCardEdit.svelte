<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import Select from '../ui-framework/Form/Select.svelte';
  import type { Voice } from '$lib/stores/voices/get-voices';

  interface BookCardFormProps {
    book?: Book;
  }

  const { book }: BookCardFormProps = $props();

  let name: string = $state(book?.name || '');
  let voice: string | undefined = $state(book?.voice);

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        name = target.value;
        break;
      case 'voice':
        voice = target.value;
        break;
      default:
        break;
    }
  }

  function onChangeVoice(e: CustomEvent<Voice>) {
    voice = e.detail.value;
  }

  function onClearVoice() {
    voice = undefined;
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

  function onCancel() {
    useBooksStore.clearEditing();
  }

  async function onDelete() {
    if (book?._id) {
      await useBooksStore.delete(book._id);
    }

    useBooksStore.clearEditing();
  }

  $effect(() => {
    document.getElementById('book-card')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
</script>

<EditCard
  {onsubmit}
  {onCancel}
  {onDelete}
  disableSubmit={!name.trim() ? true : false}
  title={book?.name ? `Edit: ${limitTextLength(book.name, 40)}` : 'Create: Book'}
  hideDeleteButton={!book?._id}
  id="book-card"
>
  <Stack space={2}>
    <StackItem>
      <TextInput
        disabled={useBooksStore.fetching}
        label="Name"
        placeholder="e.g. Thai greetings (Required)"
        {oninput}
        value={name}
        name="name"
      />
    </StackItem>
    <StackItem>
      <Select
        label="Voice (Text to Speech)"
        options={useVoicesStore.voices}
        onchange={onChangeVoice}
        onclear={onClearVoice}
        value={voice}
        placeholder="No voice selected"
      />
    </StackItem>
  </Stack>
</EditCard>
