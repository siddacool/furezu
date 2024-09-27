<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import Add from './Add.svelte';
  import AlreadyAdded from './AlreadyAdded.svelte';
  import TotalPhrases from './TotalPhrases.svelte';
  import Update from './Update.svelte';

  interface LibraryBookCardProps {
    book: LibraryData;
  }

  const { book }: LibraryBookCardProps = $props();
</script>

<div>
  <Card>
    <h3>{book.book.name}</h3>
    <TotalPhrases {book} />
    <AlreadyAdded {book} />
    <Add {book} />
    <Update {book} />
  </Card>
</div>

<style lang="scss">
  div {
    :global(.Card) {
      margin-bottom: 20px;
    }
  }

  h3 {
    font-size: 1.1rem;
    line-height: 25px;
    font-weight: 500;
    margin: 0;
  }
</style>
