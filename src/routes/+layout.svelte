<script lang="ts">
  import { onMount } from 'svelte';
  import { voiceList } from '~/stores/voices';

  onMount(() => {
    voiceList.mount();
  });
</script>

<main>
  <div class="box">
    <slot />
  </div>
</main>

<style lang="scss">
  :global(:root) {
    --font-family-main: 'Onest', sans-serif;

    --color-white: #fff;

    --color-grey-100: #e9e9e9;
    --color-grey-700: #2f2f2f;
    --color-grey-900: #080808;

    --color-red-400: #ff1010;

    --shadow-color: 0deg 0% 72%;
    --shadow-elevation-low: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.18),
      0.4px 0.7px 0.9px -1.2px hsl(var(--shadow-color) / 0.18),
      0.8px 1.5px 1.9px -2.5px hsl(var(--shadow-color) / 0.18);
    --shadow-elevation-medium: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.19),
      0.7px 1.4px 1.8px -0.8px hsl(var(--shadow-color) / 0.19),
      1.6px 3.2px 4px -1.7px hsl(var(--shadow-color) / 0.19),
      3.9px 7.7px 9.7px -2.5px hsl(var(--shadow-color) / 0.19);
    --shadow-elevation-high: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.18),
      0.9px 1.8px 2.3px -0.4px hsl(var(--shadow-color) / 0.18),
      1.6px 3.1px 3.9px -0.7px hsl(var(--shadow-color) / 0.18),
      2.5px 5px 6.3px -1.1px hsl(var(--shadow-color) / 0.18),
      3.9px 7.9px 9.9px -1.4px hsl(var(--shadow-color) / 0.18),
      6.1px 12.2px 15.3px -1.8px hsl(var(--shadow-color) / 0.18),
      9.2px 18.4px 23.1px -2.1px hsl(var(--shadow-color) / 0.18),
      13.5px 27px 34px -2.5px hsl(var(--shadow-color) / 0.18);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100vh;
    color: var(--color-grey-900);
  }

  main {
    background-color: var(--color-grey-100);
    height: 100%;
    overflow-y: auto;
    padding: 24px;
  }

  .box {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
