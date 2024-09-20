<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type BoxProps = SvelteComponentProps;

  const { children }: BoxProps = $props();
</script>

<div>
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  div {
    width: 100%;
    max-width: 572px;
    margin: 0 auto;
    padding: 16px;
    padding-top: 0;
  }
</style>
