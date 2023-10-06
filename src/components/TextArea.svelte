<script lang="ts">
  export let label: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;
  export let placeholder: string | undefined = undefined;
  export let value: string | undefined = '';
</script>

<div class="TextInput">
  {#if label}
    <label for={name}>{label}</label>
  {/if}

  <div class="Paper">
    <textarea {name} {id} {disabled} {placeholder} bind:value on:input on:change on:focus on:blur />
  </div>
</div>

<style>
  .Paper {
    background-color: var(--color-white);
    box-shadow: var(--shadow-elevation-low);
    border-radius: 4px;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    padding: 6px 7px;
    border: 0;
    font-size: 1rem;
    outline: none;
    resize: vertical;
    border-radius: 4px;
    min-height: 80px;
    overflow: auto;
    background-color: transparent;
    color: var(--color-grey-900);
  }

  label {
    font-size: 0.9rem;
    font-family: var(--font-family-main);
    display: block;
    margin-bottom: 4px;
  }
</style>
