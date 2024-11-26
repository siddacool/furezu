<script lang="ts">
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { AppColorSchemes } from '$lib/stores/local-settings/types';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import Icon from '@iconify/svelte';

  // Start hold detection
  function onmousedown() {
    usePhrasesStore.updateDragging(true);
  }

  // Cancel hold detection when mouse is released
  function onmouseup() {
    usePhrasesStore.updateDragging(false);
  }

  // Cancel hold detection when mouse leaves the box
  function onmouseleave() {
    usePhrasesStore.updateDragging(false);
  }
</script>

{#if usePhrasesStore.sortingMode}
  <button
    class={`DragHandle ${usePhrasesStore.dragging ? 'active' : ''} ${useThemeStore.colorScheme === AppColorSchemes.DARK ? 'dark' : ''}`}
    {onmousedown}
    {onmouseup}
    {onmouseleave}
  >
    <Icon icon="material-symbols:drag-indicator" />
  </button>
{/if}

<style lang="scss">
  .DragHandle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.3rem;
    background-color: transparent;
    border: 0;
    color: var(--color-grey-600);
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 0;
    cursor: pointer;
    pointer-events: all;
    transition: all 100ms;

    &.dark {
      color: var(--color-grey-400);
    }

    &:hover {
      background-color: var(--color-primary-200);

      &.active {
        color: var(--color-primary-700);
      }
    }

    &:active {
      background-color: var(--color-primary-300);
    }
  }
</style>
