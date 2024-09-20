<script lang="ts">
  import { page } from '$app/stores';
  import Toolbar from '$lib/components/Toolbar';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

  const id = $page.params.id;
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === id));

  function onSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;

    usePhrasesStore.updateSearchFilter(target.value);
  }

  function onSearchClear() {
    usePhrasesStore.updateSearchFilter(undefined);
  }

  function onAdd() {
    usePhrasesStore.startCreateMode();
  }
</script>

<Toolbar
  class="PhrasesToolbar"
  placeholder={`Search ${targetBook?.name || ''}`}
  {onAdd}
  label="Phrase"
  disabled={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
  {onSearchInput}
  {onSearchClear}
  searchValue={usePhrasesStore.searchFilter || ''}
  backTo="/"
/>
