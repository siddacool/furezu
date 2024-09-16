<slot />

<style lang="scss">
  :global(:root) {
    --font-family-main: 'Twemoji Country Flags', 'Montserrat', 'Roboto', 'Segoe UI', 'San Francisco',
      sans-serif;

    --color-white: #fff;
  }

  :global([data-theme='DARK']) {
    color-scheme: dark;

    --color-white: #000;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    font-family: var(--font-family-main);
    font-optical-sizing: auto;
    font-style: normal;
    background-color: var(--color-white);
    display: flex;
    margin: 0;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
