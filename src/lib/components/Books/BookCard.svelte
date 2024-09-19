<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import Icon from '@iconify/svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { useBooksStore } from '$lib/stores/books/books.svelte';

  interface BookCardProps {
    book: Book;
  }

  const { book }: BookCardProps = $props();

  function onEdit() {
    useBooksStore.startEditing(book._id);
  }
</script>

<section>
  <a
    href={`/${book._id}`}
    class={`${useBooksStore.curruntlyEditing || useBooksStore.createMode ? 'disabled' : ''}`}
  >
    <Card>
      <h3>{book.name}</h3>
    </Card>
  </a>
  {#if !useBooksStore.curruntlyEditing && !useBooksStore.createMode}
    <Button class="EditButton" compact onclick={onEdit}><Icon icon="mdi:pencil-outline" /></Button>
  {/if}
</section>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  section {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    color: var(--color-grey-font-900);

    :global(.EditButton) {
      position: absolute;
      right: 12px;
      top: 12px;

      @include mediaLg {
        right: 16px;
        top: 16px;
      }
    }

    :global(.Card) {
      width: 100%;
      padding-right: 70px;

      @include mediaLg {
        padding-right: 80px;
      }
    }
  }

  a {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    text-decoration: none;
    color: inherit;

    &.disabled {
      cursor: default;
      pointer-events: none;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0;
      margin-top: 0;
      line-height: 25px;
      font-weight: 500;

      @include mediaLg {
        font-size: 1.45rem;
        line-height: 30px;
      }
    }
  }
</style>
