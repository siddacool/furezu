<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import DeviceNameSettings from '$lib/components/Settings/Device/DeviceNameSettings.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
</script>

<title>Device</title>

<SettingsHeader title="Device" />

<Box>
  <DeviceNameSettings />
</Box>
