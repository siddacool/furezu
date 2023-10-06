<script lang="ts">
  import { liveQuery } from 'dexie';
  import { db } from '~/stores/db';

  export let bookId: string;

  let phrases = liveQuery(() => db.phrases?.where({ bookId }).toArray());
</script>

{#if $phrases}
  <div class="PhraseCount">
    {$phrases.length}
    {$phrases.length > 1 ? 'phrases' : 'phrase'}
  </div>
{/if}

<style lang="scss">
  .PhraseCount {
    font-family: var(--font-family-main);
    font-size: 0.88rem;
  }
</style>
