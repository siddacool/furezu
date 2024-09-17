<script>
  import GlobalStyles from '$lib/components/GlobalStyles.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Icon from '@iconify/svelte';
</script>

<GlobalStyles>
  <Button compact><Icon icon="material-symbols:arrow-top-right" /></Button>
  <Button compact disabled><Icon icon="material-symbols:arrow-top-right" /></Button>
  <Button variant="primary" compact><Icon icon="material-symbols:add" /></Button>
  <Button variant="danger" compact><Icon icon="material-symbols:delete-outline-rounded" /></Button>
</GlobalStyles>
