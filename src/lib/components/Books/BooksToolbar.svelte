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

  function onAdd() {
    useBooksStore.startCreateMode();
  }
</script>

<Toolbar
  class="BooksToolbar"
  placeholder="Search books"
  {onAdd}
  label="Book"
  disabled={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
  {onSearchInput}
  {onSearchClear}
  searchValue={useBooksStore.searchFilter || ''}
/>
