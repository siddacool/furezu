<script lang="ts">
  import Icon from '@iconify/svelte';

  interface SearchProps {
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
    onsearch?: () => void;
    onclear?: () => void;
  }

  let {
    name,
    id,
    placeholder,
    value = $bindable<string>(),
    onchange,
    oninput,
    disabled = false,
    onsearch,
    onclear,
  }: SearchProps = $props();

  let active = $state(false);

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && onsearch) {
      onsearch();
      return;
    }

    if (e.key === 'Escape' && onclear) {
      onclear();
      return;
    }
  }
</script>

<div class="Search" class:active class:disabled>
  <span class="search-icon" class:active class:disabled>
    <Icon icon="material-symbols:search" />
  </span>
  <input
    type="text"
    {name}
    {id}
    {placeholder}
    bind:value
    {onchange}
    {oninput}
    {disabled}
    onfocus={() => (active = true)}
    onblur={() => (active = false)}
    onkeydown={handleKeyPress}
  />
  {#if value && !disabled}
    <button class="close-icon" onclick={onclear}>
      <Icon icon="material-symbols:close-rounded" />
    </button>
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    color: var(--color-grey-font-900);
    transition: all 100ms;
    border: 2px solid;
    border-color: var(--color-grey-500);
    height: 44px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    &:not(.disabled) {
      &.active {
        border-color: var(--color-primary-600);
      }
    }

    &.disabled {
      background-color: var(--color-grey-100);
      color: var(--color-grey-font-400);
      border-color: var(--color-grey-200);
    }
  }

  input {
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    border: 0;
    height: 100%;
    padding: 0;
    background-color: transparent;
    letter-spacing: 0.3px;
    flex: 1;
    position: relative;
    z-index: 1;
    padding-left: 44px;

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  .search-icon {
    font-size: 1.5rem;
    display: inline-flex;
    height: 100%;
    width: 44px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    &:not(.disabled) {
      &.active {
        color: var(--color-primary-700);
      }
    }

    &:not(.disabled) {
      color: var(--color-grey-font-600);
    }
  }

  .close-icon {
    font-size: 1.34rem;
    display: inline-flex;
    height: 100%;
    width: 44px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 100ms;
    background-color: transparent;
    border: 0;
    border-radius: 20px;
    color: var(--color-grey-font-600);

    &:hover {
      background-color: var(--color-primary-200);
    }

    &:active {
      background-color: var(--color-primary-300);
    }
  }
</style>
