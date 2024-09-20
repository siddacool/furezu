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
    margin-bottom: 16px;

    :global(.Card) {
      min-height: initial;
    }

    :global(h3) {
      font-weight: 500;
      margin-top: 0;
      font-size: 1rem;
      margin-bottom: 12px;

      @include mediaLg {
        font-size: 1.1rem;
      }
    }
  }
</style>
