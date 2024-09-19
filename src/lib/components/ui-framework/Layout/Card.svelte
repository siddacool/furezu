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
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  div {
    background-color: var(--color-white);
    padding: 16px;
    border-radius: 20px;
    display: block;
    border: 1px solid;
    border-color: var(--color-grey-400);
    min-height: 90px;

    @include mediaMd {
      padding: 24px;
      border-radius: 24px;
      min-height: 100px;
    }
  }
</style>
