<script lang="ts">
  import { goto } from '$app/navigation';
  import BooksList from '$lib/components/Books/BooksList.svelte';
  import BooksPlaceholder from '$lib/components/Books/BooksPlaceholder.svelte';
  import BooksToolbar from '$lib/components/Books/BooksToolbar.svelte';
  import CreateABook from '$lib/components/Books/CreateABook.svelte';
  import Box from '$lib/components/Box.svelte';
  import Header from '$lib/components/Header.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useLastOpenBookStore } from '$lib/stores/local-settings/last-open-book.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';

  const mounted = $derived(
    useBooksStore.mounted && usePhrasesStore.mounted && useVoicesStore.mounted ? true : false,
  );

  function onAdd() {
    useBooksStore.startCreateMode();
  }

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

{#if mounted}
  <BooksPlaceholder />
  <Box>
    <BooksList />

    {#if useBooksStore.books.length}
      <div>
        <Button
          disabled={useBooksStore.curruntlyEditing || useBooksStore.createMode ? true : false}
          onclick={onAdd}
          variant="primary"
        >
          Create New Book
        </Button>
      </div>
    {/if}

    <CreateABook />
  </Box>
{:else}
  <Box>
    <Loading />
  </Box>
{/if}

<style lang="scss">
  div {
    text-align: center;
    padding: 16px 0;
    padding-bottom: 24px;
  }
</style>
