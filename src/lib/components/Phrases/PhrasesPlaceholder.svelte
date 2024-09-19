<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import ThickPlaceholderText from '../ThickPlaceholderText.svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';

  const bookId = $page.params.id;

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === bookId));

  const phrases = $derived(
    usePhrasesStore.phrases.filter((item) => item.bookId === targetBook?._id && !item.hidden),
  );
</script>

{#if !phrases.length && !usePhrasesStore.createMode}
  <ThickPlaceholderText>
    Click
    <Button compact variant="primary" onclick={() => usePhrasesStore.startCreateMode()}>
      <Icon icon="material-symbols:add" />
    </Button>
    to add a Phrase to <b>{targetBook?.name}</b>.
  </ThickPlaceholderText>
{/if}
