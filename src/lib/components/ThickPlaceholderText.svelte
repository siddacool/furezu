<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();
</script>

<h2 class="ThickPlaceholderText">
  {#if children}
    {@render children()}
  {/if}
</h2>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  h2 {
    margin-top: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 40px;
    text-align: center;
    font-size: 1.35rem;
    font-weight: 500;

    @include mediaLg {
      font-size: 1.7rem;
      line-height: 40px;
      margin-top: 70px;
    }
  }
</style>
