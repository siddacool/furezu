<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import Add from './Add.svelte';
  import AlreadyAdded from './AlreadyAdded.svelte';
  import TotalPhrases from './TotalPhrases.svelte';
  import Update from './Update.svelte';

  interface LibraryBookCardProps {
    book: LibraryData;
  }

  const { book }: LibraryBookCardProps = $props();

  const alreadyAdded = $derived(useBooksStore.books.some((item) => item._id === book._id));
</script>

<div class:alreadyAdded>
  <Card>
    <Stack space={1}>
      <StackItem>
        <h3>{book.book.name}</h3>
      </StackItem>
      <TotalPhrases {book} />
      <AlreadyAdded {book} />
      <Add {book} />
      <Update {book} />
    </Stack>
  </Card>
</div>

<style lang="scss">
  h3 {
    font-size: 1.3rem;
    line-height: 25px;
    font-weight: 500;
    margin: 0;
  }
</style>
