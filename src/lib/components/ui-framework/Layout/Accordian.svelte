<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { Snippet } from 'svelte';
  import Button from '../Form/Button.svelte';
  import Icon from '@iconify/svelte';

  interface AccordianProps extends SvelteComponentProps {
    onclick?: (e: MouseEvent) => void;
    title: string;
    class: string;
    open?: boolean;
    headerContent?: Snippet;
  }

  const {
    children,
    onclick,
    title,
    class: className = '',
    headerContent,
    open = false,
  }: AccordianProps = $props();
</script>

<div class={`Accordian ${className}`}>
  <div class="title">
    <Button {onclick} variant="inert" compact>
      {#if open}
        <Icon icon="material-symbols:arrow-drop-up-rounded" />
      {:else}
        <Icon icon="material-symbols:arrow-drop-down-rounded" />
      {/if}

      {title}
    </Button>
    {#if headerContent}
      <div class="headerContent">
        {#if headerContent}
          {@render headerContent()}
        {/if}
      </div>
    {/if}
  </div>

  {#if open && children}
    <div class="content">
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .Accordian {
    margin-bottom: 24px;
  }

  .headerContent {
    padding-right: 8px;
    &:empty {
      display: none;
    }
  }

  .content {
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
