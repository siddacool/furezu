<script lang="ts">
  import env from '$lib/helpers/env';
  import ThemeChanger from './ThemeChanger.svelte';
</script>

{#if env.isDebugMode}
  <div>
    <section>
      <ThemeChanger />
    </section>
  </div>
{/if}

<style lang="scss">
  div {
    position: fixed;

    top: 8px;
    right: 8px;
  }

  section {
    position: relative;
  }
</style>
