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
    margin-top: -8px;
    margin-right: -8px;

    :global(.EditButton.variant--default) {
      width: 40px;
      height: 40px;
      min-width: initial;
      border-radius: 50%;
      background-color: transparent;
      color: var(--color-primary-700);
    }

    :global(.EditButton svg) {
      font-size: 1.3rem;
    }
  }
</style>
