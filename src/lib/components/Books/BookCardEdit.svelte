<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { Book } from '$lib/stores/books/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import Controls from './BookCardEdit/Controls.svelte';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';

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

  function onCancel() {
    useBooksStore.clearEditing();
  }

  async function onDelete() {
    if (book?._id) {
      await useBooksStore.delete(book._id);
    }

    useBooksStore.clearEditing();
  }
</script>

<EditCard {onsubmit} {onCancel} {onDelete}>
  <Stack space={2}>
    <StackItem>
      <h3>{book?.name ? `Edit: ${limitTextLength(book.name, 40)}` : 'Create: Book'}</h3>
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
  </Stack>
</EditCard>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  h3 {
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    margin-bottom: -6px;

    @include mediaLg {
      font-size: 1.2rem;
    }
  }
</style>
