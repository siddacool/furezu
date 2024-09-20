<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Icon from '@iconify/svelte';
  import Button from './ui-framework/Form/Button.svelte';
  import Card from './ui-framework/Layout/Card.svelte';

  interface DisplayCardProps extends SvelteComponentProps {
    data?: string;
    href?: string;
    disableClick?: boolean;
    hideEditButton?: boolean;
    onEdit: () => void;
  }

  const {
    children,
    href,
    disableClick = false,
    onEdit,
    hideEditButton = false,
  }: DisplayCardProps = $props();
</script>

<section class="DisplayCard">
  <a {href} class={`${disableClick || !href ? 'disabled' : ''}`}>
    <Card>
      {#if children}
        {@render children()}
      {/if}
    </Card>
  </a>

  {#if !hideEditButton}
    <Button class="EditButton" compact onclick={onEdit} title="Edit">
      <Icon icon="tabler:edit" />
    </Button>
  {/if}
</section>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .DisplayCard {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    color: var(--color-grey-font-900);

    :global(.EditButton) {
      position: absolute;
      right: 6px;
      top: 6px;
      width: 60px;
      height: 60px;
      min-width: initial;
      border-radius: 50%;
      border: 0;

      @include mediaLg {
        right: 12px;
        top: 12px;
      }
    }

    :global(.EditButton.variant--default) {
      color: var(--color-grey-font-700);
    }

    :global(.Card) {
      width: 100%;
      padding-right: 66px;
      transition: all 100ms;

      @include mediaLg {
        padding-right: 71px;
      }
    }
  }

  a {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    text-decoration: none;
    color: inherit;

    &.disabled {
      cursor: default;
      pointer-events: none;
    }

    &:hover {
      :global(.Card) {
        background-color: var(--color-primary-100);
      }
    }
  }
</style>
