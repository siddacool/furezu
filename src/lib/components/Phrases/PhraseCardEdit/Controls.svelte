<script lang="ts">
  import Icon from '@iconify/svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';

  interface ControlsProps {
    id?: string;
    saveDisabled?: boolean;
  }

  const { id, saveDisabled = false }: ControlsProps = $props();

  function onCancel() {
    usePhrasesStore.clearEditing();
  }

  async function onDelete() {
    if (id) {
      await usePhrasesStore.delete(id);
    }

    usePhrasesStore.clearEditing();
  }
</script>

<StackItem>
  <div class="Controls">
    <Button
      variant="primary"
      type="submit"
      disabled={usePhrasesStore.fetching || saveDisabled}
      name="save"
    >
      Save
    </Button>

    {#if usePhrasesStore.phrases.length}
      <Button onclick={onCancel} disabled={usePhrasesStore.fetching}>Cancel</Button>
      <Button
        variant="danger"
        class="Delete"
        compact
        title="Delete phrase"
        onclick={onDelete}
        disabled={usePhrasesStore.fetching}
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
