<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '../ui-framework/Form/Button.svelte';
  import { useToolbarContextStore } from './Toolbar.svelte';

  interface AddButtonProps {
    onAdd?: () => void;
    disabled?: boolean;
    label?: string;
  }

  const { onAdd, disabled, label = '' }: AddButtonProps = $props();
</script>

{#if !useToolbarContextStore.isSearchActive && onAdd}
  <div>
    <Button compact title={`Add a ${label}`} {disabled} onclick={onAdd} variant="primary">
      <Icon icon="material-symbols:add" />
    </Button>
  </div>
{/if}

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  div {
    margin-right: 8px;

    @include mediaLg {
      margin-right: 24px;
    }
  }
</style>
