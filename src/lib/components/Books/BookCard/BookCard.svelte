<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { Stack } from '../../ui-framework/Layout/Stack';
  import { goto } from '$app/navigation';
  import DisplayCard from '../../DisplayCard';
  import TotalPhrases from './TotalPhrases.svelte';

  interface BookCardProps {
    book: Book;
  }

  const { book }: BookCardProps = $props();

  function onedit() {
    useBooksStore.startEditing(book._id);
  }

  function onclick() {
    goto(`/${book._id}`);
  }
</script>

<DisplayCard
  hideEditButton={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
  {onedit}
  onclick={useBooksStore.curruntlyEditing || useBooksStore.createMode ? undefined : onclick}
  title={book.name}
>
  <Stack>
    <TotalPhrases {book} />
  </Stack>
</DisplayCard>
