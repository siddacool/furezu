<script lang="ts">
  import { page } from '$app/stores';
  import AddPhrase from '$lib/components/Phrases/AddPhrase.svelte';
  import PhraseCard from '$lib/components/Phrases/PhraseCard.svelte';
  import PhraseCardEdit from '$lib/components/Phrases/PhraseCardEdit/PhraseCardEdit.svelte';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import Icon from '@iconify/svelte';

  const id = $page.params.id;

  const phrases = $derived(
    usePhrasesStore.phrases.filter((item) => item.bookId === id && !item.hidden),
  );
  const targetBook = $derived(useBooksStore.books.find((item) => item._id === id));

  $effect(() => {
    async function fetchData() {
      await useBooksStore.init();
      await usePhrasesStore.init();
    }

    fetchData();

    return () => {
      useBooksStore.reset();
      usePhrasesStore.reset();
    };
  });
</script>

<title>{targetBook?.name}</title>

<h3>
  <AnchorButton compact href="/">
    <Icon icon="material-symbols:arrow-back-rounded" />
  </AnchorButton>
  {targetBook?.name}
</h3>

{#if usePhrasesStore.mounted}
  {#if !phrases.length}
    <h3>
      There are no books present, Click Add (+) button beside searchbar to add your first book.
    </h3>
  {/if}

  {#each phrases as phrase}
    {#if usePhrasesStore.curruntlyEditing === phrase._id}
      <PhraseCardEdit {phrase} bookId={id} />
    {:else}
      <PhraseCard {phrase} />
    {/if}
  {/each}

  {#if !usePhrasesStore.curruntlyEditing}
    <AddPhrase />
  {/if}
{/if}

<style>
</style>
