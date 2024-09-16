<script lang="ts" module>
  export type ButtonColorType = 'default' | 'primary' | 'danger' | 'warning' | 'safe';
</script>

<script lang="ts">
  export let color: ButtonColorType = 'default';
</script>

<button class="Button color color--{color}"><slot /></button>

<style lang="scss">
  button {
    margin: 0;
    padding: 6px;
    border: 1px solid;
    font-size: 1.12rem;
    font-weight: 500;
    border-radius: 10px;
    min-width: 80px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 45px;
    transition: all 100ms;

    &.color {
      &--default {
        background-color: var(--color-grey-100);
        border-color: var(--color-grey-500);
        color: var(--color-grey-800);

        &:hover {
          background-color: var(--color-grey-200);
        }

        &:active {
          background-color: var(--color-grey-300);
        }
      }

      &--primary {
        background-color: var(--color-primary-100);
        border-color: var(--color-primary-500);
        color: var(--color-primary-800);

        &:hover {
          background-color: var(--color-primary-200);
        }

        &:active {
          background-color: var(--color-primary-300);
        }
      }

      &--danger {
        background-color: var(--color-danger-100);
        border-color: var(--color-danger-500);
        color: var(--color-danger-800);

        &:hover {
          background-color: var(--color-danger-200);
        }

        &:active {
          background-color: var(--color-danger-300);
        }
      }

      &--warning {
        background-color: var(--color-warning-100);
        border-color: var(--color-warning-500);
        color: var(--color-warning-800);

        &:hover {
          background-color: var(--color-warning-200);
        }

        &:active {
          background-color: var(--color-warning-300);
        }
      }

      &--safe {
        background-color: var(--color-safe-100);
        border-color: var(--color-safe-500);
        color: var(--color-safe-800);

        &:hover {
          background-color: var(--color-safe-200);
        }

        &:active {
          background-color: var(--color-safe-300);
        }
      }
    }
  }
</style>
