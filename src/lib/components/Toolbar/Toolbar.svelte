<script lang="ts" module>
  import { createToolbarContextStore } from './context.svelte';

  export const useToolbarContextStore = createToolbarContextStore();
</script>

<script lang="ts">
  import Searchbar from './Searchbar.svelte';
  import BackButton from './BackButton.svelte';
  import AddButton from './AddButton.svelte';
  import SettingsButton from './SettingsButton.svelte';

  interface ToolbarProps {
    class?: string;
    onSearchChange?: (e: Event) => void;
    onSearchInput?: (e: Event) => void;
    onSearch?: () => void;
    onSearchClear?: () => void;
    placeholder?: string;
    backTo?: string | null;
    onAdd?: () => void;
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
    backTo,
    onAdd,
    disabled,
    label,
    searchValue,
  }: ToolbarProps = $props();
</script>

<div class={`Toolbar ${className}`}>
  <BackButton {backTo} />

  <div class="manager">
    <Searchbar
      onchange={onSearchChange}
      onsearch={onSearch}
      oninput={onSearchInput}
      onclear={onSearchClear}
      value={searchValue}
      {placeholder}
      {disabled}
    />
    <AddButton {onAdd} {disabled} {label} />
  </div>

  <SettingsButton />
</div>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .Toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -8px;
    margin-right: -8px;
    margin-bottom: 12px;
    padding-bottom: 12px;
    position: sticky;
    left: 0;
    width: 100%;
    z-index: 200;
    top: -16px;
    padding-top: 8px;
    background-color: var(--color-white);

    @include mediaLg {
      padding-top: 24px;
      margin-left: 0;
      margin-right: 0;
      padding-bottom: 20px;
      margin-bottom: 20px;
      top: -24px;
    }
  }

  .manager {
    display: flex;
    flex: 1;
    align-items: center;
    max-width: 450px;
  }
</style>
