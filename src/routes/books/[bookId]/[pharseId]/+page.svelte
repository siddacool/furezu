<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import { liveQuery } from 'dexie';
  import AnchorButton from '~/components/AnchorButton.svelte';
  import BookTitle from '~/components/BookTitle.svelte';
  import Paper from '~/components/Paper.svelte';
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

{#if $phrase?._id}
  <Stack>
    <Paper>
      <section>
        <Title>{$phrase.meaning}</Title>
        <h3 class="phrase">{$phrase.phrase}</h3>
        <h3 class="pronounciation">{$phrase?.pronounciation}</h3>
        <p class="Translation">{$phrase?.translation}</p>
        <p class="description">{$phrase?.description}</p>
        <Speak voice={$book?.voice} translation={$phrase?.translation} />
      </section>
    </Paper>
  </Stack>

  <Stack>
    <div class="buttonHolder">
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
    font-size: 1.4rem;
    font-weight: 400;
    &:empty {
      display: none;
    }
  }

  section {
    padding: 16px;
  }

  p {
    &:empty {
      display: none;
    }
  }
</style>
