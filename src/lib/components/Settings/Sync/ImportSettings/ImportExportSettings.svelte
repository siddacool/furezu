<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import ExportData from './ExportData.svelte';
  import ImportData from './ImportData.svelte';
</script>

<ToolCard>
  <Stack>
    <ImportData />
    <ExportData />
  </Stack>
</ToolCard>
