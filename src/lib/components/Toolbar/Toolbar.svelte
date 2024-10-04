<script lang="ts" module>
  import { createToolbarContextStore } from './context.svelte';

  export const useToolbarContextStore = createToolbarContextStore();
</script>

<script lang="ts">
  import Searchbar from './Searchbar.svelte';

  interface ToolbarProps {
    class?: string;
    onSearchChange?: (e: Event) => void;
    onSearchInput?: (e: Event) => void;
    onSearch?: () => void;
    onSearchClear?: () => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    searchValue?: string;
  }

  const {
    class: className = '',
    onSearchChange,
    onSearchInput,
    onSearch,
    onSearchClear,
    placeholder = 'Search',
    disabled,
    searchValue,
  }: ToolbarProps = $props();
</script>

<div class={`Toolbar ${className}`}>
  <Searchbar
    onchange={onSearchChange}
    onsearch={onSearch}
    oninput={onSearchInput}
    onclear={onSearchClear}
    value={searchValue}
    {placeholder}
    {disabled}
  />
</div>

<style lang="scss">
  .Toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 450px;
    margin: 0 auto;
  }
</style>
