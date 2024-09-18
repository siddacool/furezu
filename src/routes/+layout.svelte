<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import GlobalContainer from '$lib/components/GlobalContainer';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  const { children }: SvelteComponentProps = $props();
</script>

<GlobalContainer />
<MainLayout>
  <Box>
    {#if children}
      {@render children()}
    {/if}
  </Box>
</MainLayout>
