<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ButtonGroupProps extends SvelteComponentProps {
    id?: string;
    label?: string;
    conjoint?: boolean;
  }

  let { id, conjoint = false, label, children }: ButtonGroupProps = $props();
</script>

<article class="ButtonGroup" {id}>
  {#if label}
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>{label}</label>
  {/if}

  <section class:conjoint>
    {#if children}
      {@render children()}
    {/if}
  </section>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 1rem;
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
    padding-left: 8px;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    &:not(.conjoint) {
      :global(button) {
        margin: 0 4px;
      }
    }

    &.conjoint {
      :global(button) {
        border-radius: 0;
        border-right-width: 0;
      }

      :global(button:first-child) {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }

      :global(button:last-child) {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border-right-width: 2px;
      }
    }
  }
</style>
