<script lang="ts">
  import Chip from '$lib/components/ui-framework/FormattedInfo/Chip.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import Icon from '@iconify/svelte';

  interface AlreadyAddedProps {
    book: LibraryData;
  }

  const { book }: AlreadyAddedProps = $props();
  const alreadyAdded = $derived(useBooksStore.books.some((item) => item._id === book._id));
</script>

{#if alreadyAdded}
  <StackItem>
    <div>
      <Chip>
        <Icon icon="material-symbols:check" /> Book added
      </Chip>
    </div>
  </StackItem>
{/if}

<style lang="scss">
  div {
    :global(span.size--normal svg) {
      margin-right: 6px;
    }
  }
</style>
