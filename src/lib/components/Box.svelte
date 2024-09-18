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
    max-width: 900px;
    margin: 0 auto;
  }
</style>
