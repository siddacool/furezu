<script lang="ts">
  import Search from '$lib/components/ui-framework/Form/Search.svelte';

  let value = $state('');
  let searchAt = $state('');

  function oninput(e: Event) {
    const target = e.target as HTMLSelectElement;

    value = target.value;
  }

  function onsearch() {
    searchAt = `${Date.now()}`;
  }

  function onclear() {
    value = '';

    onsearch();
  }
</script>

<div>
  <Search {value} {oninput} name="normal" placeholder="Search" {onclear} {onsearch} />
  <Search {value} disabled {oninput} name="normal" placeholder="Search" />
  <div>searchAt: {searchAt}</div>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;

    :global(.Search) {
      margin-bottom: 20px;
    }
  }
</style>
