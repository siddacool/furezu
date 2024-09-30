<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import DeveloperModeSettings from '$lib/components/Settings/DeveloperOptions/DeveloperModeSettings.svelte';
</script>

<title>Developer Options</title>

<SettingsHeader title="Developer Options" />

<Box>
  <DeveloperModeSettings />
</Box>
