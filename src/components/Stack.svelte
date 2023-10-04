<script lang="ts">
  export let fluid: boolean = false;
</script>

<div class="Stack" class:fluid>
  <slot />
</div>

<style lang="scss">
  .Stack {
    width: 100%;
    display: block;
    margin-bottom: 12px;
  }
</style>
