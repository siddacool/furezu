<script lang="ts">
  import Checkbox from '~/components/Checkbox.svelte';
  import Stack from '~/components/Stack.svelte';
  import Title from '~/components/Title.svelte';

  let darkTheme = false;
</script>

<svelte:head>
  <title>Furezu: Settings</title>
</svelte:head>

<Title>Settings</Title>

<Stack>
  <Checkbox checked={darkTheme} on:change={() => (darkTheme = !darkTheme)} id="DarkTheme">
    Dark theme
  </Checkbox>
</Stack>

<style lang="scss">
</style>
