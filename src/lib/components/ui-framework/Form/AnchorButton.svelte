<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { ButtonVariant } from './Button.svelte';

  interface AnchorButtonProps extends SvelteComponentProps {
    variant?: ButtonVariant;
    compact?: boolean;
    disabled?: boolean;
    title?: string;
    class?: string;
    href?: string;
    target?: string;
  }

  const {
    variant = 'default',
    compact = false,
    disabled = false,
    children,
    title,
    class: className = '',
    href,
    target,
  }: AnchorButtonProps = $props();
</script>

<a
  class={`AnchorButton variant variant--${variant} ${disabled ? 'disabled' : ''} ${className}`}
  class:compact
  {title}
  {href}
  {target}
>
  {#if children}
    {@render children()}
  {/if}
</a>

<style lang="scss">
  a {
    margin: 0;
    padding: 0 14px;
    border: 2px solid;
    font-size: 1.12rem;
    font-weight: 500;
    border-radius: 20px;
    min-width: 90px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    transition: all 100ms;
    letter-spacing: 0.3px;
    font-family: inherit;
    text-decoration: none;

    :global(svg) {
      font-size: 1.6rem;
    }

    &.compact {
      padding: 0;
      min-width: 65px;
    }

    &:not(.disabled) {
      &.variant {
        &--default {
          background-color: transparent;
          border-color: var(--color-grey-500);
          color: var(--color-grey-font-900);

          &:hover {
            background-color: var(--color-primary-200);
          }

          &:active {
            background-color: var(--color-primary-300);
          }
        }

        &--primary {
          background-color: var(--color-primary-const-700);
          border-color: var(--color-primary-const-700);
          color: var(--color-white-const);

          &:hover {
            background-color: var(--color-primary-const-800);
            border-color: var(--color-primary-const-800);
          }

          &:active {
            background-color: var(--color-primary-const-900);
            border-color: var(--color-primary-const-900);
          }
        }

        &--danger {
          background-color: var(--color-danger-100);
          border-color: var(--color-danger-400);
          color: var(--color-danger-800);

          &:hover {
            background-color: var(--color-danger-200);
          }

          &:active {
            background-color: var(--color-danger-300);
          }
        }
      }
    }

    &.disabled {
      border-color: var(--color-grey-300);
      cursor: not-allowed;
      background-color: var(--color-grey-100);
      color: var(--color-grey-font-400);
      pointer-events: none;
    }
  }
</style>
