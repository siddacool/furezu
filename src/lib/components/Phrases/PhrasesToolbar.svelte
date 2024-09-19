<script lang="ts">
  import Toolbar from '$lib/components/Toolbar';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';

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
  placeholder="Search phrases"
  onAdd={() => usePhrasesStore.startCreateMode()}
  label="Book"
  disabled={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
  {onSearchInput}
  {onSearchClear}
  searchValue={usePhrasesStore.searchFilter || ''}
  backTo="/"
/>
