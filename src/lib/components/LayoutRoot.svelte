<slot />

<style lang="scss">
  :global(:root) {
    --font-family-main: 'Twemoji Country Flags', 'Montserrat', 'Roboto', 'Segoe UI', 'San Francisco',
      sans-serif;

    --color-white: #fff;

    /* Primary: Indigo tints */
    --color-primary-100: #ebf4ff;
    --color-primary-200: #c3dafe;
    --color-primary-300: #a3bffa;
    --color-primary-400: #7f9cf5;
    --color-primary-500: #667eea;
    --color-primary-600: #5a67d8;
    --color-primary-700: #4c51bf;
    --color-primary-800: #434190;
    --color-primary-900: #3c366b;

    /* Grey: Grey tints */
    --color-grey-100: #f7fafc;
    --color-grey-200: #edf2f7;
    --color-grey-300: #e2e8f0;
    --color-grey-400: #cbd5e0;
    --color-grey-500: #a0aec0;
    --color-grey-600: #718096;
    --color-grey-700: #4a5568;
    --color-grey-800: #2d3748;
    --color-grey-900: #1a202c;

    /* Danger: Red tints */
    --color-danger-100: #fff5f5;
    --color-danger-200: #fed7d7;
    --color-danger-300: #feb2b2;
    --color-danger-400: #fc8181;
    --color-danger-500: #f56565;
    --color-danger-600: #e53e3e;
    --color-danger-700: #c53030;
    --color-danger-800: #9b2c2c;
    --color-danger-900: #742a2a;

    /* Safe: Green tints */
    --color-safe-100: #f0fff4;
    --color-safe-200: #c6f6d5;
    --color-safe-300: #9ae6b4;
    --color-safe-400: #68d391;
    --color-safe-500: #48bb78;
    --color-safe-600: #38a169;
    --color-safe-700: #2f855a;
    --color-safe-800: #276749;
    --color-safe-900: #22543d;

    /* Warning: Amber tints */
    --color-warning-100: #fffaf0;
    --color-warning-200: #feebc8;
    --color-warning-300: #fbd38d;
    --color-warning-400: #f6ad55;
    --color-warning-500: #ed8936;
    --color-warning-600: #dd6b20;
    --color-warning-700: #c05621;
    --color-warning-800: #9c4221;
    --color-warning-900: #7b341e;
  }

  :global([data-theme='DARK']) {
    color-scheme: dark;

    --color-white: #000;

    /* Primary: Indigo tints */
    --color-primary-100: #3c366b;
    --color-primary-200: #434190;
    --color-primary-300: #4c51bf;
    --color-primary-400: #5a67d8;
    --color-primary-500: #667eea;
    --color-primary-600: #7f9cf5;
    --color-primary-700: #a3bffa;
    --color-primary-800: #c3dafe;
    --color-primary-900: #ebf4ff;

    /* Grey: Grey tints */
    --color-grey-100: #1a202c;
    --color-grey-200: #2d3748;
    --color-grey-300: #4a5568;
    --color-grey-400: #718096;
    --color-grey-500: #a0aec0;
    --color-grey-600: #cbd5e0;
    --color-grey-700: #e2e8f0;
    --color-grey-800: #edf2f7;
    --color-grey-900: #f7fafc;

    /* Danger: Red tints */
    --color-danger-100: #742a2a;
    --color-danger-200: #9b2c2c;
    --color-danger-300: #c53030;
    --color-danger-400: #e53e3e;
    --color-danger-500: #f56565;
    --color-danger-600: #fc8181;
    --color-danger-700: #feb2b2;
    --color-danger-800: #fed7d7;
    --color-danger-900: #fff5f5;

    /* Safe: Green tints */
    --color-safe-100: #22543d;
    --color-safe-200: #276749;
    --color-safe-300: #2f855a;
    --color-safe-400: #38a169;
    --color-safe-500: #48bb78;
    --color-safe-600: #68d391;
    --color-safe-700: #9ae6b4;
    --color-safe-800: #c6f6d5;
    --color-safe-900: #f0fff4;

    /* Warning: Amber tints */
    --color-warning-100: #7b341e;
    --color-warning-200: #9c4221;
    --color-warning-300: #c05621;
    --color-warning-400: #dd6b20;
    --color-warning-500: #ed8936;
    --color-warning-600: #f6ad55;
    --color-warning-700: #fbd38d;
    --color-warning-800: #feebc8;
    --color-warning-900: #fffaf0;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    font-family: var(--font-family-main);
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 16px;
    background-color: var(--color-white);
    display: flex;
    margin: 0;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
