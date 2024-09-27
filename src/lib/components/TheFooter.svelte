<script lang="ts">
  import Box from './Box.svelte';
</script>

<footer>
  <Box>
    <a href="library">Library</a>
    <a href="settings">Settings</a>
    <a href="https://github.com/siddacool/furezu" target="_blank">Github</a>
  </Box>
</footer>

<style lang="scss">
  footer {
    margin-top: auto;
    padding: 0 16px;
    padding-bottom: 32px;
  }

  a {
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    color: var(--color-primary-700);
    margin: 0 8px;

    &:hover {
      color: var(--color-primary-800);
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
</style>
