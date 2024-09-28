<script lang="ts">
  import Icon from '@iconify/svelte';
  import Header from '../Header.svelte';
  import Button from '../ui-framework/Form/Button.svelte';

  interface SettingsHeaderProps {
    title?: string;
  }

  const { title }: SettingsHeaderProps = $props();

  function onclick() {
    history.back();
  }
</script>

<Header>
  <div>
    <Button compact {title} class="BackButton" {onclick}>
      <Icon icon="material-symbols:arrow-back-rounded" />
    </Button>

    <h3>Settings</h3>

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
    font-size: 1.3rem;
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
    font-size: 1.3rem;
    margin-left: 16px;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
  }
</style>
