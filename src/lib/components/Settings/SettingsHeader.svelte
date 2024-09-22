<script lang="ts">
  import { afterNavigate, goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import Header from '../Header.svelte';
  import Button from '../ui-framework/Form/Button.svelte';

  interface SettingsHeaderProps {
    title?: string;
  }

  const { title }: SettingsHeaderProps = $props();

  let backTo = $state('/');

  afterNavigate(({ from }) => {
    if (from?.url.pathname) {
      backTo = from.url.pathname;
    }
  });

  function onclick() {
    if (document.referrer.indexOf(window.location.host) !== -1) {
      if (title && document.referrer.includes('settings/')) {
        goto('/');
      }

      history.go(-1);
      return;
    } else {
      goto('/');
    }
  }
</script>

<Header>
  <div>
    <Button compact {title} class="BackButton" {onclick}>
      <Icon icon="material-symbols:arrow-back-rounded" />
    </Button>

    <h3>
      {#if title}
        <a href="/settings">Settings</a>
      {:else}
        Settings
      {/if}
    </h3>

    {#if title}
      <p>/ {title}</p>
    {/if}
  </div>
</Header>

<style lang="scss">
  h3 {
    margin: 0;
    margin-left: 16px;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 30px;
    height: 60px;
    display: inline-flex;
    align-items: center;
  }

  div {
    max-width: 534px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
    font-size: 1rem;
    margin-left: 16px;
    font-size: 1.45rem;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: var(--color-primary-700);
    }
  }
</style>
