<script lang="ts">
  import GlobalContainer from '$lib/components/GlobalContainer';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();
</script>

<GlobalContainer />
<MainLayout>
  {#if children}
    {@render children()}
  {/if}
</MainLayout>
