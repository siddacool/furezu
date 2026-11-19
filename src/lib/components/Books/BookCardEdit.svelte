<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';

  interface BookCardFormProps { book?: Book; }
  const { book }: BookCardFormProps = $props();
  let name = $state(book?.name || '');
  function oninput(e: Event) { name = (e.target as HTMLInputElement).value; }
  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (e.submitter?.getAttribute('name') !== 'save') return;
    if (book?._id) await useBooksStore.update(book._id, name);
    else await useBooksStore.add(name);
    useBooksStore.clearEditing();
  }
  function onCancel() { useBooksStore.clearEditing(); }
  async function onDelete() { if (book?._id) await useBooksStore.delete(book._id); useBooksStore.clearEditing(); }
  $effect(() => { document.getElementById('book-card')?.scrollIntoView({ behavior: 'instant', block: 'start' }); });
</script>

<EditCard {onsubmit} {onCancel} {onDelete} disableSubmit={!name.trim()} title={book?.name ? `Edit: ${limitTextLength(book.name, 40)}` : 'Create: Book'} hideDeleteButton={!book?._id} id="book-card">
  <Stack space={2}><StackItem><TextInput disabled={useBooksStore.fetching} label="Name" placeholder="e.g. Thai greetings (Required)" {oninput} value={name} name="name" /></StackItem></Stack>
</EditCard>
