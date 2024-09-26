<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import type { LibraryData } from '$lib/stores/library/types';
  import Add from './Add.svelte';

  interface LibraryBookCardProps {
    book: LibraryData;
  }

  const { book }: LibraryBookCardProps = $props();
</script>

<div>
  <Card>
    <Stack>
      <StackItem>
        <h3>{book.book.name}</h3>
      </StackItem>
      <Add {book} />
    </Stack>
  </Card>
</div>

<style lang="scss">
  h3 {
    font-size: 1.3rem;
    line-height: 25px;
    font-weight: 400;
    margin: 0;
  }
</style>
