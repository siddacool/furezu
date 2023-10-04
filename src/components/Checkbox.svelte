<script lang="ts">
  export let checked: boolean = false;
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
</script>

<div class="Checkbox">
  <label for={name} class="DarkTheme">
    <input type="checkbox" bind:checked on:change {name} {id} />
    <slot />
  </label>
</div>

<style lang="scss">
  .Checkbox {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-family: var(--font-family-main);
    font-weight: 500;
    cursor: pointer;
  }

  label {
    display: flex;
    align-items: center;
  }
</style>
