<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import Icon from '@iconify/svelte';
  import ThickPlaceholderText from '../ThickPlaceholderText.svelte';
  import Button from '../ui-framework/Form/Button.svelte';
</script>

{#if !useBooksStore.books.length && !useBooksStore.createMode}
  <ThickPlaceholderText>
    Welcome to Furezu. <br />A simple Phrasebook for travel.<br /> <br />
    Click
    <Button compact variant="primary" onclick={() => useBooksStore.startCreateMode()}>
      <Icon icon="material-symbols:add" />
    </Button>
    to add your first book.
  </ThickPlaceholderText>
{/if}
