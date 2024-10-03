<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '../ui-framework/Form/Button.svelte';

  interface AddButtonProps {
    onAdd?: () => void;
    disabled?: boolean;
    label?: string;
  }

  const { onAdd, disabled, label = '' }: AddButtonProps = $props();
</script>

{#if onAdd}
  <div>
    <Button compact title={`Add a ${label}`} {disabled} onclick={onAdd} variant="primary">
      <Icon icon="material-symbols:add" />
    </Button>
  </div>
{/if}
