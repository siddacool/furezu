<script lang="ts">
  export let href: string;
</script>

<a {href}>
  <slot />
</a>

<style style="scss">
  a {
    display: flex;
    text-decoration: none;
    padding: 8px;
    height: 170px;
    background-color: var(--color-white);
    box-shadow: var(--shadow-elevation-medium);
    border-radius: 4px;
    overflow: hidden;
    width: calc(50% - 8px);
    margin: 8px;
    max-width: 175px;
    color: inherit;
    font-size: 1.2rem;
  }
</style>
