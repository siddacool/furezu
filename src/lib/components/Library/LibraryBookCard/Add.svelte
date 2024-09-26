<script lang="ts">
  import Paragraph from '$lib/components/Paragraph.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Chip from '$lib/components/ui-framework/FormattedInfo/Chip.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import type { LibraryData } from '$lib/stores/library/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import Icon from '@iconify/svelte';

  interface AddCardProps {
    book: LibraryData;
  }

  const { book }: AddCardProps = $props();
  const alreadyAdded = $derived(useBooksStore.books.some((item) => item._id === book._id));

  function onclick() {}
</script>

<div>
  <StackItem>
    {#if alreadyAdded}
      <Chip size="small">
        <Icon icon="mingcute:check-fill" /> Already added
      </Chip>
    {:else}
      <Button
        disabled={useBooksStore.importing || usePhrasesStore.importing ? true : false}
        variant="primary"
        {onclick}
      >
        Add
      </Button>
    {/if}
  </StackItem>
</div>

<style lang="scss">
  div {
    :global(.alreadyAdded) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
</style>
