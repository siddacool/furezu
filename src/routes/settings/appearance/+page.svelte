<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import SettingsHeader from '$lib/components/Settings/SettingsHeader.svelte';
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import ButtonGroup from '$lib/components/ui-framework/Form/ButtonGroup.svelte';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { Themes } from '$lib/stores/local-settings/types';

  function onThemeChange(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const value = Number(target.name) as Themes;

    useThemeStore.setTheme(value);
  }
</script>

<title>Appearance</title>

<SettingsHeader title="Appearance" />

<Box>
  <ToolCard>
    <h3>Theme</h3>
    <ButtonGroup conjoint>
      <Button
        name={`${Themes.SYSTEM}`}
        onclick={onThemeChange}
        variant={useThemeStore.theme === Themes.SYSTEM ? 'primary' : 'default'}
      >
        System
      </Button>
      <Button
        name={`${Themes.LIGHT}`}
        onclick={onThemeChange}
        variant={useThemeStore.theme === Themes.LIGHT ? 'primary' : 'default'}>Light</Button
      >
      <Button
        name={`${Themes.DARK}`}
        onclick={onThemeChange}
        variant={useThemeStore.theme === Themes.DARK ? 'primary' : 'default'}>Dark</Button
      >
    </ButtonGroup>
  </ToolCard>
</Box>
