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
  <div>
    <AnchorButton compact href="/" title="back">
      <Icon icon="material-symbols:arrow-back-rounded" />
    </AnchorButton>
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
