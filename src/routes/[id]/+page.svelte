<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import BackButton from '$lib/components/BackButton.svelte';
  import Box from '$lib/components/Box.svelte';
  import CreateAGroup from '$lib/components/Groups/CreateAGroup.svelte';
  import GroupList from '$lib/components/Groups/GroupList.svelte';
  import Header from '$lib/components/Header.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import PhrasesToolbar from '$lib/components/Phrases/PhrasesToolbar.svelte';
  import ThickPlaceholderText from '$lib/components/ThickPlaceholderText.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';
  import { useLastOpenBookStore } from '$lib/stores/local-settings/last-open-book.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import { useVoicesStore } from '$lib/stores/voices/voices.svelte';

  const mounted = $derived(
    useBooksStore.mounted && usePhrasesStore.mounted && useVoicesStore.mounted ? true : false,
  );

  const id = $page.params.id;
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === id));

  function onAdd() {
    useGroupsStore.startCreateMode();
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

<svelte:head>
  <!-- MAKE IT WORK ON MOBILE DEVICES -->
  <script src="https://unpkg.com/svelte-drag-drop-touch"></script>
  <!---->
</svelte:head>

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
      <GroupList />

      <div>
        <Button
          disabled={useGroupsStore.curruntlyEditing || useGroupsStore.createMode ? true : false}
          onclick={onAdd}
          variant="primary"
        >
          Create New Group
        </Button>
      </div>

      <CreateAGroup />
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
