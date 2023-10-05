<script lang="ts">
  import type { Option } from '~/types';

  export let label: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;
  export let placeholder: string | undefined = undefined;
  export let value: string = '';
  export let options: Option[];
</script>

<div class="TextInput">
  {#if label}
    <label for={name}>{label}</label>
  {/if}

  <div class="Paper">
    <select {name} {id} {disabled} {placeholder} on:change on:focus on:blur>
      {#each options as option (option.value)}
        <option value={option.value} selected={value === option.value} disabled={option?.disabled}>
          {option.label}
        </option>
      {/each}
    </select>
  </div>
</div>

<style>
  .Paper {
    background-color: var(--color-white);
    box-shadow: var(--shadow-elevation-low);
    border-radius: 4px;
    overflow: hidden;
    height: 40px;
  }

  select {
    width: 100%;
    height: 100%;
    padding: 6px 7px;
    border: 0;
    font-size: 1rem;
    outline: none;
  }

  label {
    font-size: 0.9rem;
    font-family: var(--font-family-main);
    display: block;
    margin-bottom: 4px;
  }
</style>
