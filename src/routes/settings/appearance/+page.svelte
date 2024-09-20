<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import ThemeSettings from '$lib/components/Settings/Appearance/ThemeSettings.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import { Themes } from '$lib/stores/local-settings/types';
</script>

<title>Appearance</title>

<SettingsHeader title="Appearance" />

<Box>
  <ThemeSettings />
</Box>
