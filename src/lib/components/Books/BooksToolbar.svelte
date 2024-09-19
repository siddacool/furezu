<script lang="ts">
  import Toolbar from '$lib/components/Toolbar';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
</script>

<Toolbar
  class="BooksToolbar"
  placeholder="Search books"
  onAdd={() => useBooksStore.startCreateMode()}
  label="Book"
  disabled={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
/>

<style lang="scss">
</style>
