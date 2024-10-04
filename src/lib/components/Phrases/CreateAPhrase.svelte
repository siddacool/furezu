<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import PhraseCardEdit from './PhraseCardEdit.svelte';
  import { page } from '$app/stores';

  interface CreateAPhraseProps {
    groupId?: string;
  }

  const bookId = $page.params.id;

  const { groupId }: CreateAPhraseProps = $props();
</script>

{#if usePhrasesStore.createMode}
  <PhraseCardEdit {bookId} {groupId} />
{/if}
