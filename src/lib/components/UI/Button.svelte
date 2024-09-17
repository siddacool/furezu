<script lang="ts" module>
  export type ButtonVariant = 'default' | 'primary' | 'danger';
</script>

<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ButtonProps extends SvelteComponentProps {
    variant?: ButtonVariant;
    compact?: boolean;
    disabled?: boolean;
  }

  const {
    variant = 'default',
    compact = false,
    disabled = false,
    children,
  }: ButtonProps = $props();
</script>

<button class="Button variant variant--{variant}" class:compact {disabled}>
  {#if children}
    {@render children()}
  {/if}
</button>

<style lang="scss">
  button {
    margin: 0;
    padding: 0 6px;
    border: 1px solid;
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

    :global(svg) {
      font-size: 1.6rem;
    }

    &.compact {
      min-width: 65px;
      padding: 0;
    }

    &:not([disabled]) {
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

    &[disabled] {
      border-color: var(--color-grey-300);
      cursor: not-allowed;
      background-color: var(--color-grey-100);
      color: var(--color-grey-font-400);
    }
  }
</style>
