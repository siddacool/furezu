<script lang="ts" module>
  export type SelectOptionValue = string | number | null | undefined;

  export type SelectOption = {
    value: string | number | null | undefined;
    label: string;
  };
</script>

<script lang="ts">
  import SvelteSelect from 'svelte-select';

  interface SelectProps {
    disabled?: boolean;
    onchange: () => void;
    name?: string;
    label?: string;
    class?: string;
    error?: string;
    placeholder?: string;
    options: SelectOption[];
    value: SelectOptionValue;
  }

  const {
    label,
    onchange,
    name,
    class: className = '',
    disabled = false,
    error,
    options,
    placeholder,
    value,
  }: SelectProps = $props();

  let active = $state(false);
</script>

<div class={`Select ${className}`}>
  {#if label}
    <label for={name} class:error class:active class:disabled>{label}</label>
  {/if}

  <SvelteSelect
    items={options}
    {placeholder}
    {value}
    on:blur={() => (active = false)}
    on:focus={() => (active = true)}
    on:change={() => onchange()}
    {disabled}
    {name}
    listOpen={true}
    --background="var(--color-white)"
    --list-background="var(--color-white)"
    --border-radius="10px"
    --item-hover-bg="var(--color-primary-100)"
    --item-is-active-bg="var(--color-primary-700)"
  />

  {#if error && !disabled}
    <p class="ErrorMessage">{error}</p>
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    color: var(--color-grey-font-900);

    :global(.svelte-select) {
      height: 50px;
      border-color: var(--color-grey-500);

      &:hover {
        border-color: var(--color-grey-500);
      }
    }

    :global(input) {
      font-size: 1.05rem;
      font-weight: 400;
      font-family: inherit;

      &::-webkit-input-placeholder {
        /* Chrome */
        color: var(--color-grey-font-600);
      }

      &:-ms-input-placeholder {
        /* IE 10+ */
        color: var(--color-grey-font-600);
      }

      &::-moz-placeholder {
        /* Firefox 19+ */
        color: var(--color-grey-font-600);
        opacity: 1;
      }

      &:-moz-placeholder {
        /* Firefox 4 - 18 */
        color: var(--color-grey-font-600);
        opacity: 1;
      }
    }

    :global(.selected-item) {
      color: var(--color-grey-font-900);
    }
  }

  label {
    font-size: 0.95rem;
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    padding-left: 8px;

    &:not(.error):not(.disabled) {
      &.active {
        color: var(--color-primary-600);
      }
    }

    &:not(.disabled) {
      &.error {
        color: var(--color-danger-800);
      }
    }
  }

  // input {
  //   font-size: 1.05rem;
  //   font-weight: 400;
  //   outline: none;
  //   height: 50px;
  //   padding: 0 12px;
  //   border: 1px solid;
  //   border-color: var(--color-grey-500);
  //   border-radius: 10px;
  //   background-color: transparent;
  //   transition: all 100ms;
  //   font-family: inherit;
  //   background-color: var(--color-white);

  //   &::-webkit-input-placeholder {
  //     /* Chrome */
  //     color: var(--color-grey-font-600);
  //   }

  //   &:-ms-input-placeholder {
  //     /* IE 10+ */
  //     color: var(--color-grey-font-600);
  //   }

  //   &::-moz-placeholder {
  //     /* Firefox 19+ */
  //     color: var(--color-grey-font-600);
  //     opacity: 1;
  //   }

  //   &:-moz-placeholder {
  //     /* Firefox 4 - 18 */
  //     color: var(--color-grey-font-600);
  //     opacity: 1;
  //   }

  //   &:not(.error):not([disabled]) {
  //     &:focus {
  //       border-color: var(--color-primary-600);
  //     }
  //   }

  //   &:not([disabled]) {
  //     &.error {
  //       border-color: var(--color-danger-400);

  //       &:focus {
  //         border-color: var(--color-danger-600);
  //       }
  //     }
  //   }

  //   &[disabled] {
  //     background-color: var(--color-grey-200);
  //     color: var(--color-grey-font-400);
  //     border-color: var(--color-grey-200);
  //   }
  // }

  .ErrorMessage {
    margin-top: 6px;
    padding-left: 8px;
    color: var(--color-danger-800);
    font-size: 1rem;
    font-weight: 500;
  }
</style>
