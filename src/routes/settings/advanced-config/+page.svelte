<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import DeveloperModeSettings from '$lib/components/Settings/AdvancedConfig/DeveloperModeSettings.svelte';
</script>

<title>Advanced Configurations</title>

<SettingsHeader title="Advanced Configurations" />

<Box>
  <DeveloperModeSettings />
</Box>
