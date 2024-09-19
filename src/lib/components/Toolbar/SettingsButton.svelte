<script lang="ts">
  import Icon from '@iconify/svelte';
  import AnchorButton from '../ui-framework/Form/AnchorButton.svelte';
  import { useToolbarContextStore } from './Toolbar.svelte';
</script>

{#if !useToolbarContextStore.isSearchActive}
  <div class="ToolbarSettingsButtonMobile">
    <AnchorButton compact href="/settings" title="Settings">
      <Icon icon="mingcute:settings-6-line" />
    </AnchorButton>
  </div>
{/if}

<div class="ToolbarSettingsButtonDesktop">
  <AnchorButton compact href="/settings" title="Settings">
    <Icon icon="mingcute:settings-6-line" />
  </AnchorButton>
</div>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .ToolbarSettingsButtonDesktop {
    display: none;

    @include mediaLg {
      display: inline-flex;
      position: fixed;
      right: 40px;
      top: 40px;
    }
  }

  .ToolbarSettingsButtonMobile {
    @include mediaLg {
      display: none;
    }
  }
</style>
