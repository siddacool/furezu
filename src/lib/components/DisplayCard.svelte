<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Icon from '@iconify/svelte';
  import Button from './ui-framework/Form/Button.svelte';
  import Card from './ui-framework/Layout/Card.svelte';

  interface DisplayCardProps extends SvelteComponentProps {
    data?: string;
    hideEditButton?: boolean;
    onedit: () => void;
    onclick?: () => void;
  }

  const { children, onedit, onclick, hideEditButton = false }: DisplayCardProps = $props();

  function onkeydown(e: KeyboardEvent) {
    if (e.key !== 'Enter' && e.key !== ' ') {
      return;
    }

    e.preventDefault();

    const target = e.target as HTMLButtonElement;

    target?.click();
  }
</script>

<section
  class={`DisplayCard ${!onclick ? 'disable' : ''}`}
  {onclick}
  role="button"
  tabindex="0"
  {onkeydown}
>
  <Card>
    {#if children}
      {@render children()}
    {/if}
  </Card>

  {#if !hideEditButton}
    <Button class="EditButton" compact onclick={onedit} title="Edit">
      <Icon icon="tabler:edit" />
    </Button>
  {/if}
</section>

<style lang="scss">
  .DisplayCard {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    color: var(--color-grey-font-800);

    :global(.EditButton) {
      position: absolute;
      right: 12px;
      top: 12px;
    }

    :global(.Card) {
      width: 100%;
      padding-right: 76px;
      transition: all 100ms;
    }

    &:not(.disable) {
      :global(.Card) {
        cursor: pointer;
      }

      :global(.Card:hover) {
        background-color: var(--color-primary-100);
      }
    }

    :global(h3) {
      font-size: 1.45rem;
      margin-bottom: 0;
      margin-top: 0;
      line-height: 25px;
      font-weight: 500;
    }

    :global(h2) {
      font-size: 1.6rem;
      margin-bottom: 0;
      margin-top: 0;
      line-height: 30px;
      font-weight: 400;
    }
  }
</style>
