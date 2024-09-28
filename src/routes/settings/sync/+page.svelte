<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import DeviceNameSettings from '$lib/components/Settings/Device/DeviceNameSettings.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import ExportSettings from '$lib/components/Settings/Sync/ExportSettings.svelte';
  import ImportSettings from '$lib/components/Settings/Sync/ImportSettings.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';

  const mounted = $derived(
    useBooksStore.mounted && usePhrasesStore.mounted && useVoicesStore.mounted ? true : false,
  );
</script>

<title>Sync</title>

<SettingsHeader title="Sync" />

{#if mounted}
  <Box>
    <DeviceNameSettings />
    <ExportSettings />
    <ImportSettings />
  </Box>
{:else}
  <Box>
    <Loading />
  </Box>
{/if}
