<script lang="ts">
  import Icon from '@iconify/svelte';
  import LightButton from '../LightButton.svelte';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';

  interface EditButtonProps {
    onclick: (e: MouseEvent) => void;
    hideEditButton?: boolean;
  }

  const { onclick, hideEditButton = false }: EditButtonProps = $props();
</script>

{#if !hideEditButton}
  <div>
    <LightButton
      class={`EditButton theme theme--${useThemeStore.colorScheme}`}
      compact
      {onclick}
      title="Edit"
    >
      <Icon icon="tabler:edit" />
    </LightButton>
  </div>
{/if}

<style lang="scss">
  div {
    margin-top: -8px;
    margin-right: -8px;

    :global(.EditButton.variant--inert.theme--dark) {
      color: var(--color-primary-600);
    }
  }
</style>
