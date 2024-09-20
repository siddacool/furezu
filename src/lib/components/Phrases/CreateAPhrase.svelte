<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import PhraseCardEdit from './PhraseCardEdit.svelte';
  import { page } from '$app/stores';

  const bookId = $page.params.id;
</script>

{#if usePhrasesStore.createMode}
  <PhraseCardEdit {bookId} />
{/if}
