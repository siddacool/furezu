<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import ThickPlaceholderText from '../ThickPlaceholderText.svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';

  const bookId = $page.params.id;

  const targetBook = $derived(useBooksStore.books.find((item) => item._id === bookId));

  const groups = $derived(useGroupsStore.groups.filter((item) => item.bookId === targetBook?._id));
</script>

{#if !groups.length && !useGroupsStore.createMode}
  <ThickPlaceholderText>
    Click
    <Button compact variant="primary" onclick={() => useGroupsStore.startCreateMode()}>
      <Icon icon="material-symbols:add" />
    </Button>
    to create a new group.
  </ThickPlaceholderText>
{/if}
