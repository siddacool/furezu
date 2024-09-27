<script lang="ts">
  import Paragraph from '$lib/components/Paragraph.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import type { Book } from '$lib/stores/books/types';
  import TextToSpeech from './TextToSpeech.svelte';
  import TotalPhrases from './TotalPhrases.svelte';

  interface StatsProps {
    book: Book;
  }

  const { book }: StatsProps = $props();
</script>

<StackItem>
  <div>
    <Paragraph>
      <TotalPhrases {book} />
    </Paragraph>
    <div class="tags-row">
      <TextToSpeech {book} />
    </div>
  </div>
</StackItem>

<style lang="scss">
  .tags-row {
    margin-top: 4px;
  }
</style>
