<script lang="ts">
  import Paragraph from '$lib/components/Paragraph.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import type { Book } from '$lib/stores/books/types';
  import TotalPhrases from './TotalPhrases.svelte';

  interface StatsProps {
    book: Book;
  }

  const { book }: StatsProps = $props();
</script>

<StackItem>
  <Paragraph>
    <TotalPhrases {book} />
  </Paragraph>
</StackItem>
