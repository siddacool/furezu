<script lang="ts">
  export let type: 'button' | 'submit' = 'button';
  export let variant: 'solid' | 'hollow' = 'hollow';
  export let name: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;
  export let margin: boolean = false;
</script>

<button class={`Button variant--${variant}`} class:margin {type} {name} {id} {disabled} on:click>
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
    display: inline-flex;
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
        background-color: var(--color-accent-100);
        color: var(--color-accent-600);
        border: 1px solid var(--color-accent-400);
        transition: all 100ms;

        &:hover {
          background-color: var(--color-accent-alt-100);
        }

        &:active {
          background-color: var(--color-accent-alt-200);
        }
      }

      &--solid {
        border: 1px solid var(--color-accent-400);
        background-color: var(--color-accent-400);
        color: #fff;
        box-shadow: var(--shadow-elevation-medium);
        transition: all 100ms;

        &:hover {
          background-color: var(--color-accent-300);
          border-color: var(--color-accent-300);
        }

        &:active {
          background-color: var(--color-accent-200);
          border-color: var(--color-accent-200);
        }
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
