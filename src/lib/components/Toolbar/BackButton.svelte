<script lang="ts">
  import { useToolbarContextStore } from './Toolbar.svelte';
  import BackButton from '../BackButton.svelte';

  interface BackButtonProps {
    backTo?: string | null;
  }

  const { backTo = null }: BackButtonProps = $props();
</script>

{#if backTo}
  <div class={`ToolbarBackButton ${useToolbarContextStore.isSearchActive ? 'isSearchActive' : ''}`}>
    <BackButton {backTo} title="back" />
  </div>
{/if}

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .ToolbarBackButton {
    display: inline-flex;
    margin-right: 8px;

    @include mediaLg {
      margin-right: 16px;
    }

    &.isSearchActive {
      display: none;
    }
  }
</style>
