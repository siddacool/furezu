<script lang="ts">
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Paper from '~/components/Paper.svelte';
  import Stack from '~/components/Stack.svelte';
  import Title from '~/components/Title.svelte';
  import { db } from '~/stores/db';

  const bookId = $page.params.bookId;

  let phrases = liveQuery(() => db.phrases?.where({ bookId }).toArray());

  let book = liveQuery(() => db.books.where({ _id: bookId }).first());
</script>

<svelte:head>
  <title>{$book?.name || ''}</title>
</svelte:head>

<Title>{$book?.name || ''}</Title>

<div class="container">
  {#if $phrases?.length}
    <div class="pharses">
      {#each $phrases as phrase (phrase._id)}
        <a class="pharse" href={`/books/${$page.params.bookId}/${phrase._id}`}>
          <Paper>
            <section>
              <h3 class="meaning">{phrase.meaning}</h3>
              <h3 class="phrase">{phrase.phrase}</h3>
              <h3 class="pronounciation">{phrase.pronounciation}</h3>
              <p class="translation">{phrase.translation}</p>
              <p class="description">{phrase.description}</p>
            </section>
          </Paper>
        </a>
      {/each}
    </div>
  {:else}
    <p>No phrases found</p>
  {/if}
</div>

<div class="buttonHolder">
  <AnchorButton href={`/books/${bookId}/add-pharse`} margin>Add new Pharse</AnchorButton>
  <AnchorButton href={`/books/${bookId}/edit`}>Edit</AnchorButton>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .pharse {
    display: block;
    width: 100%;
    text-decoration: none;
    margin-bottom: 16px;
    color: inherit;

    section {
      padding: 0 8px;
    }

    h3 {
      font-size: 1.05rem;
    }

    p {
      font-size: 1.05rem;

      &:empty {
        display: none;
      }
    }
  }

  .buttonHolder {
    display: flex;
    padding-top: 16px;
  }
</style>
