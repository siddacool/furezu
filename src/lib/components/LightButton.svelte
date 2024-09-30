<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Button from './ui-framework/Form/Button.svelte';

  interface LightButtonProps extends SvelteComponentProps {
    compact?: boolean;
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    name?: string;
    title?: string;
    class?: string;
    type?: 'button' | 'submit';
  }

  const {
    compact = false,
    disabled = false,
    children,
    onclick,
    name,
    title,
    class: className = '',
    type,
  }: LightButtonProps = $props();
</script>

<div>
  <Button
    class={`LightButton ${className}`}
    {compact}
    {disabled}
    {onclick}
    {name}
    {title}
    {type}
    variant="inert"
  >
    {#if children}
      {@render children()}
    {/if}
  </Button>
</div>

<style lang="scss">
  div {
    display: inline-flex;

    :global(.LightButton.variant--inert) {
      width: 40px;
      height: 40px;
      min-width: initial;
      border-radius: 50%;
    }

    :global(.LightButton svg) {
      font-size: 1.3rem;
    }
  }
</style>
