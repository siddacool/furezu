<script lang="ts">
  import Card from '../ui-framework/Layout/Card.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();
</script>

<section>
  <Card>
    {#if children}
      {@render children()}
    {/if}
  </Card>
</section>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  section {
    margin-bottom: 20px;

    :global(.Card) {
      min-height: initial;
    }

    :global(h3) {
      font-size: 1rem;
      margin-top: 0;
      line-height: 25px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    :global(p) {
      font-size: 1rem;
      line-height: 30px;
      color: var(--color-grey-font-600);
    }
  }
</style>
