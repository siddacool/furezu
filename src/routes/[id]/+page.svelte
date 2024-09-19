<script lang="ts">
  import { page } from '$app/stores';
  import CreateAPhrase from '$lib/components/Phrases/CreateAPhrase.svelte';
  import PhraseCard from '$lib/components/Phrases/PhraseCard.svelte';
  import PhraseCardEdit from '$lib/components/Phrases/PhraseCardEdit/PhraseCardEdit.svelte';
  import PhraseList from '$lib/components/Phrases/PhraseList.svelte';
  import PhrasesPlaceholder from '$lib/components/Phrases/PhrasesPlaceholder.svelte';
  import PhrasesToolbar from '$lib/components/Phrases/PhrasesToolbar.svelte';
  import ThickPlaceholderText from '$lib/components/ThickPlaceholderText.svelte';
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
    };
  });
</script>

<title>{targetBook?.name}</title>

{#if usePhrasesStore.mounted && targetBook?._id}
  <PhrasesToolbar />
  <PhrasesPlaceholder />
  <div>
    <PhraseList />
    <CreateAPhrase />
  </div>
{/if}

<style>
  div {
    max-width: 540px;
    margin: 0 auto;
  }
</style>
