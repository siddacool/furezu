<script>
  import Icon from '@iconify/svelte';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Book from '~/components/Book.svelte';
  import PhraseCount from '~/components/PhraseCount.svelte';
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
        <div class="bookName">
          {book.name}
        </div>
        <PhraseCount bookId={book._id} />
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

  .bookName {
    margin-bottom: 8px;
  }
</style>
