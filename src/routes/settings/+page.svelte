<script lang="ts">
  import { page } from '$app/stores';
  import Box from '$lib/components/Box.svelte';
  import SettingRouteCard from '$lib/components/Settings/SettingRouteCard.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
</script>

<title>Settings</title>

<SettingsHeader />

<Box>
  <SettingRouteCard href="/settings/appearance" title="Appearance" />
</Box>
