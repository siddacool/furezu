<script lang="ts">
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { AppColorSchemes } from '$lib/stores/local-settings/types';
  import { usePhrasesDragStore } from '$lib/stores/system/phrases-drag.svelte';
  import Icon from '@iconify/svelte';

  // Start hold detection
  function onmousedown() {
    usePhrasesDragStore.updateDragHandleActive(true);
  }

  // Cancel hold detection when mouse is released
  function onmouseup() {
    usePhrasesDragStore.updateDragHandleActive(false);
  }

  // Cancel hold detection when mouse leaves the box
  function onmouseleave() {
    usePhrasesDragStore.updateDragHandleActive(false);
  }
</script>

<button
  class={`DragHandle ${usePhrasesDragStore.dragHandleActive ? 'active' : ''} ${useThemeStore.colorScheme === AppColorSchemes.DARK ? 'dark' : ''}`}
  {onmousedown}
  {onmouseup}
  {onmouseleave}
>
  <Icon icon="material-symbols:drag-indicator" />
</button>

<style lang="scss">
  .DragHandle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 1.3rem;
    background-color: transparent;
    border: 0;
    color: var(--color-grey-600);
    position: absolute;
    bottom: 16px;
    right: 16px;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0;
    cursor: pointer;
    pointer-events: all;

    &.dark {
      color: var(--color-grey-400);
    }

    &:hover {
      &.active {
        color: var(--color-primary-700);
      }
    }
  }
</style>
