<script lang="ts">
  import Search, { type SearchProps } from '../ui-framework/Form/Search.svelte';
  import { useToolbarContextStore } from './Toolbar.svelte';

  const props: SearchProps = $props();

  function onfocus() {
    useToolbarContextStore.updateSearchActiveState(true);
  }

  function onblur() {
    useToolbarContextStore.updateSearchActiveState(false);
  }
</script>

<Search
  {...props}
  {onfocus}
  {onblur}
  class={`Searchbar ${useToolbarContextStore.isSearchActive ? 'isSearchActive' : ''}`}
/>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  :global(.Searchbar) {
    margin-right: 8px;
    flex: 1;

    @include mediaLg {
      margin-right: 16px;
    }
  }

  :global(.Searchbar.isSearchActive) {
    margin-right: 0;
  }
</style>
