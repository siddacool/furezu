<script>
  import Icon from '@iconify/svelte';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Book from '~/components/Book.svelte';
  import Stack from '~/components/Stack.svelte';
  import { db } from '~/stores/db';

  let books = liveQuery(() => db.books?.toArray());
</script>

<div class="page" />

<svelte:head>
  <title>Furezu</title>
</svelte:head>

{#if $books}
  <div class="books">
    {#each $books as book (book._id)}
      <Book href={`books/${book._id}`}>
        {book.name}
      </Book>
    {/each}
  </div>
{/if}
<Stack>
  <div class="buttonHolder">
    <AnchorButton href="create-book" variant="solid">
      <Icon icon="material-symbols:add" slot="before" />
      Create book
    </AnchorButton>
    <br />
    <br />
    <AnchorButton href="settings">
      <Icon icon="material-symbols:settings" slot="before" />
      Settings
    </AnchorButton>
  </div>
</Stack>

<style style="scss">
  .page {
    display: flex;
    flex-wrap: wrap;
  }

  .buttonHolder {
    padding-top: 16px;
  }

  .books {
    display: flex;
    flex-wrap: wrap;
    margin: -8px;
  }
</style>
