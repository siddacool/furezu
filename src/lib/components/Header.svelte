<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type BoxProps = SvelteComponentProps;

  const { children }: BoxProps = $props();
</script>

<header>
  {#if children}
    {@render children()}
  {/if}
</header>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  header {
    width: 100%;
    height: 70px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: var(--color-backdrop);
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

    @include mediaLg {
      height: 86px;
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 16px;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  }
</style>
