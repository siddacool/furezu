<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Card from '../ui-framework/Layout/Card.svelte';
  import EditButton from './EditButton.svelte';

  interface DisplayCardProps extends SvelteComponentProps {
    data?: string;
    hideEditButton?: boolean;
    onedit: (e: MouseEvent) => void;
    onclick?: () => void;
    title?: string;
  }

  const { children, onedit, onclick, hideEditButton, title }: DisplayCardProps = $props();

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
    <div class="Title">
      <h3>
        {title}
      </h3>
      <EditButton onclick={onedit} {hideEditButton} />
    </div>

    {#if children}
      {@render children()}
    {/if}
  </Card>
</section>

<style lang="scss">
  .DisplayCard {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    color: var(--color-grey-font-800);

    :global(.Card) {
      width: 100%;
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
  }

  .Title {
    display: flex;
    justify-content: space-between;
    min-height: 32px;
  }

  h3 {
    font-size: 1.1rem;
    margin-top: 0;
    line-height: 25px;
    font-weight: 500;
    margin-bottom: 0;
    flex: 1;

    &:empty {
      display: none;
    }
  }
</style>
