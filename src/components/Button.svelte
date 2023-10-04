<script lang="ts">
  export let type: 'button' | 'submit' = 'button';
  export let variant: 'solid' | 'hollow' = 'hollow';
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;
  export let margin: boolean = false;
</script>

<button class={`Button variant--${variant}`} class:margin {type} {name} {id} {disabled}>
  <div class="before">
    <slot name="before" />
  </div>
  <slot />
  <div class="after">
    <slot name="after" />
  </div>
</button>

<style lang="scss">
  .Button {
    border-radius: 4px;
    overflow: hidden;
    height: 40px;
    padding: 0 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    min-width: 100px;
    font-size: 0.9rem;
    font-family: var(--font-family-main);
    font-weight: 500;
    cursor: pointer;

    &.margin {
      margin-right: 16px;
    }

    &.variant {
      &--hollow {
        background-color: transparent;
        color: inherit;
        border: 1px solid var(--color-grey-700);
      }

      &--solid {
        border: 1px solid var(--color-grey-700);
        background-color: var(--color-grey-700);
        color: var(--color-white);
        box-shadow: var(--shadow-elevation-medium);
      }
    }

    .before,
    .after {
      &:empty {
        display: none;
      }

      display: inline-flex;
      align-items: center;
    }

    .before {
      margin-right: 6px;
    }

    .after {
      margin-left: 6px;
    }

    & :global(svg) {
      font-size: 1.3rem;
      line-height: 1em;
    }
  }
</style>
