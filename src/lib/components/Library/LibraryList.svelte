<script lang="ts">
  import { useLibraryStore } from '$lib/stores/library/library.svelte';
  import Loading from '../Loading/Loading.svelte';
  import Title from '../Title.svelte';
  import LibraryBookCard from './LibraryBookCard';
</script>

<div class="LibraryList">
  <Title>Add pre-made books from Library</Title>
  {#if useLibraryStore.mounted && !useLibraryStore.fetching}
    <div>
      {#each useLibraryStore.data as book}
        <LibraryBookCard {book} />
      {/each}
    </div>
  {:else}
    <Loading />
  {/if}
</div>
