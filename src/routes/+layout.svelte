<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import ThemeListener from '~/components/ThemeListener.svelte';
  import { voiceList } from '~/stores/voices';

  onMount(() => {
    voiceList.mount();
  });
</script>

<ThemeListener />
<main>
  <div class="box">
    <slot />
  </div>
  <footer>
    <a href="/"><Icon icon="ic:baseline-home" /> Home</a>
    <a href="/settings"><Icon icon="material-symbols:settings" /> Settings</a>
  </footer>
</main>

<style lang="scss">
  :global(:root) {
    --font-family-main: 'Onest', sans-serif;

    --color-white: #fff;
    --color-grey-100: #e9e9e9;
    --color-grey-900: #080808;
    --color-red-400: #ff1010;

    --color-accent-100: #dedede;
    --color-accent-200: #25459f;
    --color-accent-300: #1d3885;
    --color-accent-400: #1f2c51;
    --color-accent-600: #1f2c51;

    --color-accent-alt-100: #dfe3f0;
    --color-accent-alt-200: #cdd8ff;

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

  :global([data-theme='DARK']) {
    color-scheme: dark;
    --color-white: #09112b;
    --color-grey-100: #18223f;
    --color-grey-900: #d8e1ff;

    --color-accent-100: #0a1a4c;
    --color-accent-200: #255dfc;
    --color-accent-300: #194ad4;
    --color-accent-400: #0f3dbf;
    --color-accent-600: #9da7fc;

    --color-accent-alt-100: #19295e;
    --color-accent-alt-200: #1b3488;

    --shadow-color: 225deg 100% 2%;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  footer {
    font-family: var(--font-family-main);
    padding-top: 32px;
    display: flex;
    flex-wrap: wrap;
    align-self: center;
    justify-content: flex-start;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;

    a {
      color: inherit;
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      font-size: 1rem;
      margin-right: 24px;

      &:hover {
        color: var(--color-accent-600);
      }

      :global(svg) {
        margin-right: 4px;
        font-size: 1.2rem;
      }
    }
  }

  .box {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
</style>
