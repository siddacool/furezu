<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ParagraphProps extends SvelteComponentProps {
    class?: string;
  }

  const { children, class: className = '' }: ParagraphProps = $props();
</script>

<p class={`Paragraph ${className}`}>
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
