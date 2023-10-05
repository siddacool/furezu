<script lang="ts">
  export let href: string;
  export let variant: 'solid' | 'hollow' = 'hollow';
  export let id: string | undefined = undefined;
  export let margin: boolean = false;
  export let disabled: boolean = false;
</script>

<a class={`AnchorButton variant--${variant}`} class:margin class:disabled {href} {id}>
  <div class="before">
    <slot name="before" />
  </div>
  <slot />
  <div class="after">
    <slot name="after" />
  </div>
</a>

<style lang="scss">
  .AnchorButton {
    text-decoration: none;
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

    &.disabled {
      pointer-events: none;
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

      & :global(span) {
        display: flex;
        align-items: center;
      }
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
