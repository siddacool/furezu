<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import ExportSettings from '$lib/components/Settings/Sync/ExportSettings.svelte';
  import ImportSettings from '$lib/components/Settings/Sync/ImportSettings.svelte';
</script>

<title>Sync</title>

<SettingsHeader title="Sync" />

<Box>
  <ExportSettings />
  <ImportSettings />
</Box>
