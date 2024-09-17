<script>
  import GlobalStyles from '$lib/components/GlobalStyles.svelte';
  import Button from '$lib/components/ui/Button.svelte';
</script>

<GlobalStyles>
  <Button>Default</Button>
  <Button disabled>Disabled</Button>
  <Button variant="primary">Primary</Button>
  <Button variant="danger">Danger</Button>
</GlobalStyles>
