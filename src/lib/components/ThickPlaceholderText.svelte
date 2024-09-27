<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import Title from './Title.svelte';

  const { children }: SvelteComponentProps = $props();
</script>

<div class="ThickPlaceholderText">
  <Title>
    {#if children}
      {@render children()}
    {/if}
  </Title>
</div>

<style lang="scss">
  div {
    margin-top: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
