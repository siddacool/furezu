<script lang="ts">
  import { page } from '$app/stores';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import GroupCardEdit from './GroupCardEdit.svelte';

  const bookId = $page.params.id;
</script>

{#if useGroupsStore.createMode}
  <GroupCardEdit {bookId} />
{/if}
