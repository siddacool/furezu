<script lang="ts">
  import { page } from '$app/stores';
  import { liveQuery } from 'dexie';
  import BookTitle from '~/components/BookTitle.svelte';

  import { db } from '~/stores/db';

  const bookId = $page.params.bookId;

  let book = liveQuery(() => db.books.where({ _id: bookId }).first());
</script>

<BookTitle bookName={$book?.name} {bookId} />

<slot />
