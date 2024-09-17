<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type CardProps = SvelteComponentProps;

  const { children }: CardProps = $props();
</script>

<div class="Card">
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  div {
    background-color: var(--color-white);
    padding: 24px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-color: var(--color-grey-400);
    min-height: 100px;
  }
</style>
