<script lang="ts">
  import Toolbar from '$lib/components/Toolbar';
  import { useBooksStore } from '$lib/stores/books/books.svelte';

  function onSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;

    useBooksStore.updateSearchFilter(target.value);
  }

  function onSearchClear() {
    useBooksStore.updateSearchFilter(undefined);
  }
</script>

<Toolbar
  class="BooksToolbar"
  placeholder="Search books"
  onAdd={() => useBooksStore.startCreateMode()}
  label="Book"
  disabled={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
  {onSearchInput}
  {onSearchClear}
  searchValue={useBooksStore.searchFilter || ''}
/>
