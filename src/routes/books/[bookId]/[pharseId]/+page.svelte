<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import Button from '~/components/Button.svelte';
  import Speak from '~/components/Speak.svelte';
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

<p><a href={`/books/${bookId}`}>{$book?.name || ''}</a></p>

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
      <Speak voice={$book?.voice} translation={$phrase?.translation} />
      <br />
      <br />
      <AnchorButton href={`${pharseId}/edit`}>Edit</AnchorButton>
    </div>
  </Stack>
{/if}

<style lang="scss">
  .buttonHolder {
    display: block;
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
