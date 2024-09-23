<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { Themes } from '$lib/stores/local-settings/types';
  import ImportData from './ImportData.svelte';

  function onclick(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const value = Number(target.name) as Themes;

    useThemeStore.setTheme(value);
  }
</script>

<StackItem>
  <h3>Export</h3>
</StackItem>
