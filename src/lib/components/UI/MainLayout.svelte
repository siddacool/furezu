<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type MainLayoutProps = SvelteComponentProps;

  const { children }: MainLayoutProps = $props();
</script>

<main class="MainLayout">
  {#if children}
    {@render children()}
  {/if}
</main>

<style lang="scss">
  main {
    background-color: var(--color-white);
    padding: 16px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
