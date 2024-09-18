<script lang="ts">
  import Icon from '@iconify/svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import BookCardEdit from './BookCardEdit';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
</script>

{#if useBooksStore.createMode || !useBooksStore.books.length}
  <BookCardEdit />
{:else}
  <div>
    <Button
      compact
      variant="primary"
      onclick={() => useBooksStore.startCreateMode()}
      title="Add Book"
    >
      <Icon icon="material-symbols:add" />
    </Button>
  </div>
{/if}

<style lang="scss">
  div {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 24px;
  }
</style>
