<script lang="ts">
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import PhraseCardEdit from './PhraseCardEdit';

  const bookId = $page.params.id;
</script>

{#if usePhrasesStore.createMode || !usePhrasesStore.phrases.length}
  <PhraseCardEdit {bookId} />
{:else}
  <div>
    <Button
      compact
      variant="primary"
      onclick={() => usePhrasesStore.startCreateMode()}
      title="Add Phrase"
    >
      <Icon icon="material-symbols:add" />
    </Button>
  </div>
{/if}

<style lang="scss">
  div {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 24px;
  }
</style>
