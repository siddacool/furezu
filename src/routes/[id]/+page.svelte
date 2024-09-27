<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import BackButton from '$lib/components/BackButton.svelte';
  import Box from '$lib/components/Box.svelte';
  import Header from '$lib/components/Header.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import CreateAPhrase from '$lib/components/Phrases/CreateAPhrase.svelte';
  import PhraseList from '$lib/components/Phrases/PhraseList.svelte';
  import PhrasesPlaceholder from '$lib/components/Phrases/PhrasesPlaceholder.svelte';
  import PhrasesToolbar from '$lib/components/Phrases/PhrasesToolbar.svelte';
  import ThickPlaceholderText from '$lib/components/ThickPlaceholderText.svelte';
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

  const id = $page.params.id;
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === id));

  $effect(() => {
    useLastOpenBookStore.update(targetBook?._id);
  });

  $effect(() => {
    return () => {
      usePhrasesStore.clearEditing();
    };
  });

  beforeNavigate(({ to }) => {
    if (to?.route.id === '/') {
      useLastOpenBookStore.update(undefined);
    }
  });
</script>

<title>{targetBook?.name}</title>

<Header>
  <PhrasesToolbar />
</Header>

{#if mounted && !fetching}
  {#if !targetBook?.name}
    <Box>
      <ThickPlaceholderText>Book not found. Go back <BackButton backTo="/" /></ThickPlaceholderText>
    </Box>
  {/if}

  {#if targetBook?._id}
    <Box>
      <PhrasesPlaceholder />
      <PhraseList />
      <CreateAPhrase />
    </Box>
  {/if}
{:else}
  <Box>
    <Loading />
  </Box>
{/if}
