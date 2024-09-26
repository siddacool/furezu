<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SettingRouteCard from '$lib/components/Settings/SettingRouteCard.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import Icon from '@iconify/svelte';
</script>

<title>Settings</title>

<SettingsHeader />

<Box>
  <SettingRouteCard href="/settings/library" title="Library">
    {#snippet icon()}
      <Icon icon="material-symbols:book-outline" />
    {/snippet}
  </SettingRouteCard>

  <SettingRouteCard href="/settings/appearance" title="Appearance">
    {#snippet icon()}
      <Icon icon="mdi:theme-outline" />
    {/snippet}
  </SettingRouteCard>

  <SettingRouteCard href="/settings/sync" title="Sync">
    {#snippet icon()}
      <Icon icon="material-symbols:sync" />
    {/snippet}
  </SettingRouteCard>
</Box>
