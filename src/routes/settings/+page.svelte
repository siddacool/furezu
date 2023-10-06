<script lang="ts">
  import Checkbox from '~/components/Checkbox.svelte';
  import Stack from '~/components/Stack.svelte';
  import Title from '~/components/Title.svelte';
  import { Theme, theme } from '~/stores/theme';
</script>

<svelte:head>
  <title>Furezu: Settings</title>
</svelte:head>

<Title>Settings</Title>

<Stack>
  <Checkbox checked={$theme === Theme.DARK} on:change={theme.toggle} id="DarkTheme">
    Dark theme
  </Checkbox>
</Stack>

<style lang="scss">
</style>
