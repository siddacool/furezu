<script lang="ts">
  import Icon from '@iconify/svelte';
  import AnchorButton from '../ui-framework/Form/AnchorButton.svelte';
  import { useToolbarContextStore } from './Toolbar.svelte';

  interface BackButtonProps {
    backTo?: string | null;
  }

  const { backTo = null }: BackButtonProps = $props();
</script>

{#if !useToolbarContextStore.isSearchActive && backTo}
  <div class={`ToolbarBackButton ${useToolbarContextStore.isSearchActive ? 'isSearchActive' : ''}`}>
    <AnchorButton compact href="/" title="back">
      <Icon icon="material-symbols:arrow-back-rounded" />
    </AnchorButton>
  </div>
{/if}

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .ToolbarBackButton {
    display: inline-flex;

    &.isSearchActive {
      display: none;

      @include mediaLg {
        display: inline-flex;
      }
    }

    @include mediaLg {
      align-self: flex-start;
    }
  }
</style>
