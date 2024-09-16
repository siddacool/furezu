<script lang="ts" module>
  export type ButtonColorType = 'default' | 'primary' | 'danger';
</script>

<script lang="ts">
  export let color: ButtonColorType = 'default';
</script>

<button class="Button color color--{color}"><slot /></button>

<style lang="scss">
  button {
    margin: 0;
    padding: 8px 5px;
    outline: 0;
    border: 1px solid;
  }
</style>
