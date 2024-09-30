<script lang="ts">
  import Icon from '@iconify/svelte';
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import LightButton from '$lib/components/LightButton.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';

  interface DuplicateProps {
    phrase: Phrase;
  }

  const { phrase }: DuplicateProps = $props();

  async function onclick(e: MouseEvent) {
    try {
      e.stopPropagation();

      await usePhrasesStore.duplicate(phrase._id);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<LightButton
  compact
  {onclick}
  disabled={usePhrasesStore.fetching ? true : false}
  class="Duplicate"
  title="Duplicate Phrase"
>
  <Icon icon="tabler:copy" />
</LightButton>
