<script lang="ts" module>
  export type SelectOptionValue = string | number | null | undefined;

  export type SelectOption = {
    value: string | number | null | undefined;
    label: string;
  };
</script>

<script lang="ts">
  import SvelteSelect from 'svelte-select';
  import ErrorMessage from './shared/ErrorMessage.svelte';
  import FormLabel from './shared/FormLabel.svelte';

  interface SelectProps {
    disabled?: boolean;
    onchange: (e: CustomEvent) => void;
    onclear?: () => void;
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
    onclear,
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
    <FormLabel {name} {error} {active} {disabled} {label} />
  {/if}

  <SvelteSelect
    items={options}
    {placeholder}
    {value}
    on:blur={() => (active = false)}
    on:focus={() => (active = true)}
    on:change={(e: CustomEvent) => onchange(e)}
    on:clear={onclear ? onclear : () => {}}
    {disabled}
    {name}
    --background="var(--color-white)"
    --list-background="var(--color-white)"
    --border-radius="10px"
    --item-hover-bg="var(--color-primary-100)"
    --item-is-active-bg="var(--color-primary-700)"
    --border-focused="1px solid var(--color-primary-600)"
  />

  {#if error && !disabled}
    <ErrorMessage message={error} />
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    color: var(--color-grey-font-900);

    :global(.svelte-select) {
      height: var(--size-ui-element-input-height);
      border-color: var(--color-grey-500);

      &:hover {
        border-color: var(--color-grey-500);
      }
    }

    :global(input) {
      font-size: 1rem;
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
      color: var(--color-black-pure);
    }
  }
</style>
