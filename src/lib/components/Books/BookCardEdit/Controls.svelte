<script lang="ts">
  import Icon from '@iconify/svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';

  interface ControlsProps {
    id?: string;
    name?: string;
  }

  const { id, name }: ControlsProps = $props();

  function onCancel() {
    useBooksStore.clearEditing();
  }

  async function onDelete() {
    if (id) {
      await useBooksStore.delete(id);
    }

    useBooksStore.clearEditing();
  }
</script>

<StackItem>
  <div class="Controls">
    <Button
      variant="primary"
      type="submit"
      disabled={useBooksStore.fetching || !name?.trim()}
      name="save"
    >
      Save
    </Button>

    {#if useBooksStore.books.length}
      <Button onclick={onCancel} disabled={useBooksStore.fetching}>Cancel</Button>
      <Button
        variant="danger"
        class="Delete"
        compact
        title="Delete book"
        onclick={onDelete}
        disabled={useBooksStore.fetching}
      >
        <Icon icon="material-symbols:delete-outline-rounded" />
      </Button>
    {/if}
  </div>
</StackItem>

<style lang="scss">
  .Controls {
    display: flex;
    flex-wrap: wrap;

    :global(.Button) {
      margin-right: 8px;
    }

    :global(.Button:last-child) {
      margin-right: 0;
    }

    :global(.Delete) {
      margin-left: auto;
    }
  }
</style>
