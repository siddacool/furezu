<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type ParagraphProps = SvelteComponentProps;

  const { children }: ParagraphProps = $props();
</script>

<p>
  {#if children}
    {@render children()}
  {/if}
</p>

<style lang="scss">
  p {
    font-size: 1rem;
    line-height: 30px;
    color: var(--color-grey-font-600);
    margin: 0;
    font-weight: 500;
  }
</style>
