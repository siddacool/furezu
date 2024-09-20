<script lang="ts">
  import { goto } from '$app/navigation';
  import BooksList from '$lib/components/Books/BooksList.svelte';
  import BooksPlaceholder from '$lib/components/Books/BooksPlaceholder.svelte';
  import BooksToolbar from '$lib/components/Books/BooksToolbar.svelte';
  import CreateABook from '$lib/components/Books/CreateABook.svelte';
  import Box from '$lib/components/Box.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useLastOpenBookStore } from '$lib/stores/local-settings/last-open-book.svelte';

  let pageMounted = $state(false);

  $effect(() => {
    if (useLastOpenBookStore.lastOpenBook) {
      goto(`/${useLastOpenBookStore.lastOpenBook}`);
    }
  });

  $effect(() => {
    return () => {
      useBooksStore.clearEditing();
    };
  });
</script>

<title>Furezu</title>

<BooksToolbar />

lastBook: {useLastOpenBookStore.lastOpenBook}

{#if useBooksStore.mounted}
  <BooksPlaceholder />
  <Box>
    <BooksList />
    <CreateABook />
  </Box>
{/if}
