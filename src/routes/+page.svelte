<script lang="ts">
  import { goto } from '$app/navigation';
  import BooksList from '$lib/components/Books/BooksList.svelte';
  import BooksPlaceholder from '$lib/components/Books/BooksPlaceholder.svelte';
  import BooksToolbar from '$lib/components/Books/BooksToolbar.svelte';
  import CreateABook from '$lib/components/Books/CreateABook.svelte';
  import Box from '$lib/components/Box.svelte';
  import Header from '$lib/components/Header.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useLastOpenBookStore } from '$lib/stores/local-settings/last-open-book.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';

  const mounted = $derived(
    useBooksStore.mounted && usePhrasesStore.mounted && useVoicesStore.mounted ? true : false,
  );

  const fetching = $derived(
    useBooksStore.fetching && usePhrasesStore.fetching && useVoicesStore.fetching ? true : false,
  );

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

<Header>
  <BooksToolbar />
</Header>

{#if mounted && !fetching}
  <BooksPlaceholder />
  <Box>
    <BooksList />
    <CreateABook />
  </Box>
{:else}
  <Box>
    <Loading />
  </Box>
{/if}
