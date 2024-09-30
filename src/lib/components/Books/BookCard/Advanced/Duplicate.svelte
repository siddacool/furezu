<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import Icon from '@iconify/svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import LightButton from '$lib/components/LightButton.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';

  interface DuplicateProps {
    book: Book;
  }

  const { book }: DuplicateProps = $props();

  async function onclick(e: MouseEvent) {
    try {
      e.stopPropagation();

      await useBooksStore.duplicate(book._id);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<LightButton
  compact
  {onclick}
  disabled={usePhrasesStore.fetching || useBooksStore.fetching ? true : false}
  class="Duplicate"
  title="Duplicate book"
>
  <Icon icon="tabler:copy" />
</LightButton>
