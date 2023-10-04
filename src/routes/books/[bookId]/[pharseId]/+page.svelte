<script lang="ts">
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Box from '~/components/Box.svelte';
  import Stack from '~/components/Stack.svelte';
  import Title from '~/components/Title.svelte';
  import { db } from '~/stores/db';
  const bookId = $page.params.bookId;
  const pharseId = $page.params.pharseId;

  let phrase = liveQuery(() => db.phrases?.where({ _id: pharseId }).first());

  let book = liveQuery(() => db.books.where({ _id: bookId }).first());
</script>

<svelte:head>
  <title>{$book?.name || ''}</title>
</svelte:head>

<Box>
  <p>{$book?.name || ''}</p>

  {#if $phrase?._id}
    <Stack>
      <Title>{$phrase.meaning}</Title>
      <h3 class="phrase">{$phrase.phrase}</h3>
      <h3 class="pronounciation">{$phrase?.pronounciation}</h3>
      <p class="Translation">{$phrase?.translation}</p>
      <p class="description">{$phrase?.description}</p>
    </Stack>

    <Stack>
      <div class="buttonHolder">
        <AnchorButton href={`${pharseId}/edit`}>Edit</AnchorButton>
      </div>
    </Stack>
  {/if}
</Box>

<style lang="scss">
  .buttonHolder {
    display: flex;
    padding-top: 16px;
  }

  h3 {
    &:empty {
      display: none;
    }
  }

  p {
    &:empty {
      display: none;
    }
  }
</style>
