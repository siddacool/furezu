<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';

  interface ControlsProps {
    disableSubmit?: boolean;
    onCancel?: () => void;
    onDelete?: () => void;
    hideDeleteButton?: boolean;
  }

  const {
    disableSubmit = false,
    hideDeleteButton = false,
    onCancel,
    onDelete,
  }: ControlsProps = $props();
</script>

<StackItem>
  <div class="Controls">
    <Button variant="primary" type="submit" disabled={disableSubmit} name="save">Save</Button>

    <Button onclick={onCancel}>Cancel</Button>

    {#if !hideDeleteButton}
      <Button variant="danger" class="Delete" compact title="Delete" onclick={onDelete}>
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
