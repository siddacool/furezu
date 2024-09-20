<script>
  import { useLoadingScreenStore } from '$lib/stores/system/loading-screen.svelte';
  import Icon from '@iconify/svelte';
</script>

{#if useLoadingScreenStore.obstructiveLoadingScreen}
  <div class="ObstructiveLoadingScreen">
    <div class="Loading">
      <Icon icon="eos-icons:bubble-loading" />
    </div>
  </div>
{/if}

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  .ObstructiveLoadingScreen {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    width: 100vw;
    height: 100vh;
    display: flex;
    z-index: 1000;
    align-items: center;
    justify-content: center;
  }

  .Loading {
    font-size: 4rem;
    margin-bottom: 25vh;
    color: var(--color-primary-500);

    @include mediaLg {
      font-size: 5rem;
    }
  }
</style>
