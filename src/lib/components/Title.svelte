<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface TitleProps extends SvelteComponentProps {
    class?: string;
  }

  const { class: className = '', children }: TitleProps = $props();
</script>

<h2 class={`Title ${className}`}>
  {#if children}
    {@render children()}
  {/if}
</h2>

<style lang="scss">
  h2 {
    line-height: 40px;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 500;
    margin-top: 0;
  }
</style>
