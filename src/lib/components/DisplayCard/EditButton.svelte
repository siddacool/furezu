<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from '../ui-framework/Form/Button.svelte';

  interface EditButtonProps {
    onclick: () => void;
    hideEditButton?: boolean;
  }

  const { onclick, hideEditButton = false }: EditButtonProps = $props();
</script>

{#if !hideEditButton}
  <div>
    <Button class="EditButton" compact {onclick} title="Edit">
      <Icon icon="tabler:edit" />
    </Button>
  </div>
{/if}

<style lang="scss">
  div {
    position: absolute;
    right: 12px;
    top: 12px;
  }
</style>
