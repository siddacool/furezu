<script lang="ts">
  import Icon from '@iconify/svelte';
  import AnchorButton from '../ui-framework/Form/AnchorButton.svelte';
  import { useToolbarContextStore } from './Toolbar.svelte';
</script>

<div
  class={`ToolbarSettingsButton ${useToolbarContextStore.isSearchActive ? 'isSearchActive' : ''}`}
>
  <AnchorButton compact href="/settings" title="Settings">
    <Icon icon="mingcute:settings-6-line" />
  </AnchorButton>
</div>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .ToolbarSettingsButton {
    display: inline-flex;

    &.isSearchActive {
      display: none;

      @include mediaLg {
        align-self: flex-start;
      }
    }
  }
</style>
