<script lang="ts">
  import PhraseCount from './PhraseCount.svelte';

  export let bookName: string | undefined;
  export let bookId: string;
</script>

<h2>
  <a href={`/books/${bookId}`}>
    {bookName || ''}
    <PhraseCount {bookId} />
  </a>
</h2>

<style lang="scss">
  h2 {
    margin-top: 0;
    font-size: 1.45rem;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
