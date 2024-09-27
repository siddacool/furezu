<script lang="ts">
  import Chip from '$lib/components/ui-framework/FormattedInfo/Chip.svelte';
  import type { Book } from '$lib/stores/books/types';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';
  import Icon from '@iconify/svelte';

  interface TotalPhrasesProps {
    book: Book;
  }

  const { book }: TotalPhrasesProps = $props();

  const voice = $derived(useVoicesStore.voices.find((item) => item.value === book?.voice));
</script>

{#if voice?.value}
  <Chip title="Text to speech" size="small"><Icon icon="mdi:speak" /></Chip>
{/if}
