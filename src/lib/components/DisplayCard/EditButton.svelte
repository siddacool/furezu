<script lang="ts">
  import Icon from '@iconify/svelte';
  import LightButton from '../LightButton.svelte';

  interface EditButtonProps {
    onclick: () => void;
    hideEditButton?: boolean;
  }

  const { onclick, hideEditButton = false }: EditButtonProps = $props();
</script>

{#if !hideEditButton}
  <div>
    <LightButton class="EditButton" compact {onclick} title="Edit">
      <Icon icon="tabler:edit" />
    </LightButton>
  </div>
{/if}

<style lang="scss">
  div {
    margin-top: -8px;
    margin-right: -8px;
  }
</style>
