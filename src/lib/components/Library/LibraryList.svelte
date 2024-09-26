<script lang="ts">
  import { useLibraryStore } from '$lib/stores/library/library.svelte';
  import LibraryBookCard from './LibraryBookCard';
</script>

<div class="LibraryList">
  <p>Add pre-made books from Library</p>
  {#each useLibraryStore.data as book}
    <LibraryBookCard {book} />
  {/each}
</div>

<style lang="scss">
  p {
    margin-left: auto;
    margin-right: auto;
    line-height: 40px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 0;
  }
</style>
