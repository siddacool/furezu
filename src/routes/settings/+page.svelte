<script lang="ts">
  import Box from '~/components/Box.svelte';
  import Checkbox from '~/components/Checkbox.svelte';
  import Stack from '~/components/Stack.svelte';
  import Title from '~/components/Title.svelte';

  let darkTheme = false;
</script>

<svelte:head>
  <title>Settings</title>
</svelte:head>

<Box>
  <Title>Settings</Title>

  <Stack>
    <Checkbox checked={darkTheme} on:change={() => (darkTheme = !darkTheme)} id="DarkTheme">
      Dark theme
    </Checkbox>
  </Stack>
</Box>

<style lang="scss">
</style>
