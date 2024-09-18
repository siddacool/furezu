<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { useThemeStore } from '$lib/stores/local-settings/theme.svelte';
  import { Themes } from '$lib/stores/local-settings/types';
  import Icon from '@iconify/svelte';

  function switchTheme() {
    const newTheme = useThemeStore.theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;

    useThemeStore.setTheme(newTheme);
  }
</script>

<Button compact class="ThemeButton" title="Change theme" onclick={switchTheme}>
  <Icon icon="mdi:theme" />
  {useThemeStore.theme}
</Button>
