<script lang="ts">
  import Button from './Button.svelte';

  interface SelectButton {
    name?: string;
    id?: string;
    label?: string;
    value: string;
    disabled?: boolean;
    options: string[];
    onchange: (value: string, event: MouseEvent) => void;
  }

  let { id, value, onchange, disabled = false, label, options, name }: SelectButton = $props();
</script>

<article class="SelectButton" {id}>
  {#if label && options.length}
    <label for={`${name}-0`}>{label}</label>
  {/if}

  <section>
    {#each options as option, index}
      <Button
        onclick={(e) => onchange(option, e)}
        name={`${name}-${index}`}
        variant={option === value ? 'primary' : 'default'}
        {disabled}
      >
        {option}
        {#if option === value && disabled}
          {' '} (Selected)
        {/if}
      </Button>
    {/each}
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

    :global(.Button) {
      margin: 0 4px;
    }
  }
</style>
