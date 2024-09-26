<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<title>Library</title>

<SettingsHeader title="Library" />

<Box>{JSON.stringify(data, null, 2)}</Box>
