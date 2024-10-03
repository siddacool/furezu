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
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useLastOpenBookStore } from '$lib/stores/local-settings/last-open-book.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';

  const mounted = $derived(
    useBooksStore.mounted && usePhrasesStore.mounted && useVoicesStore.mounted ? true : false,
  );

  const id = $page.params.id;
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === id));

  function onAdd() {
    usePhrasesStore.startCreateMode();
  }

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

{#if mounted}
  {#if !targetBook?.name}
    <Box>
      <ThickPlaceholderText>Book not found. Go back <BackButton backTo="/" /></ThickPlaceholderText>
    </Box>
  {/if}

  {#if targetBook?._id}
    <Box>
      <PhrasesPlaceholder />
      <PhraseList />
      <div>
        <Button
          disabled={usePhrasesStore.curruntlyEditing || usePhrasesStore.createMode ? true : false}
          onclick={onAdd}
          variant="primary"
        >
          Add Phrase
        </Button>
      </div>
      <CreateAPhrase />
    </Box>
  {/if}
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
