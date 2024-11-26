<script lang="ts">
  import { page } from '$app/stores';
  import Toolbar from '$lib/components/Toolbar';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import Icon from '@iconify/svelte';
  import Button from '../ui-framework/Form/Button.svelte';

  const id = $page.params.id;
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === id));

  function onSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;

    usePhrasesStore.updateSearchFilter(target.value);
  }

  function onSearchClear() {
    usePhrasesStore.updateSearchFilter(undefined);
  }
</script>

<Toolbar
  class="PhrasesToolbar"
  placeholder={`Search ${targetBook?.name || ''}`}
  label="Phrase"
  disabled={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
  {onSearchInput}
  {onSearchClear}
  searchValue={usePhrasesStore.searchFilter || ''}
>
  {#snippet endContainer()}
    <Button compact onclick={() => usePhrasesStore.updateSortingMode(!usePhrasesStore.sortingMode)}>
      {#if usePhrasesStore.sortingMode}
        <Icon icon="material-symbols:check" />
      {:else}
        <Icon icon="mdi:drag" />
      {/if}
    </Button>
  {/snippet}
</Toolbar>
