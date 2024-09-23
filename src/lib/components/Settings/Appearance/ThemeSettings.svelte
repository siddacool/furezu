<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import ButtonGroup from '$lib/components/ui-framework/Form/ButtonGroup.svelte';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { Themes } from '$lib/stores/local-settings/types';

  function onclick(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;
    const value = Number(target.name) as Themes;

    useThemeStore.setTheme(value);
  }
</script>

<ToolCard>
  <div>
    <h3>Theme</h3>
    <ButtonGroup conjoint>
      <Button
        name={`${Themes.SYSTEM}`}
        {onclick}
        variant={useThemeStore.theme === Themes.SYSTEM ? 'primary' : 'default'}
      >
        Auto
      </Button>
      <Button
        name={`${Themes.LIGHT}`}
        {onclick}
        variant={useThemeStore.theme === Themes.LIGHT ? 'primary' : 'default'}
      >
        Light
      </Button>
      <Button
        name={`${Themes.DARK}`}
        {onclick}
        variant={useThemeStore.theme === Themes.DARK ? 'primary' : 'default'}
      >
        Dark
      </Button>
    </ButtonGroup>
  </div>
</ToolCard>
