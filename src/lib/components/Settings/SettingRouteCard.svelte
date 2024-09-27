<script lang="ts">
  import type { Snippet } from 'svelte';
  import Card from '../ui-framework/Layout/Card.svelte';

  interface SettingRouteCardProps {
    href: string;
    title: string;
    icon?: Snippet;
  }

  const { href, title, icon }: SettingRouteCardProps = $props();
</script>

<a {href}>
  <Card>
    {#if icon}
      <div class="Icon">
        {@render icon()}
      </div>
    {/if}

    <h3>{title}</h3>
  </Card>
</a>

<style lang="scss">
  a {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    text-decoration: none;
    color: inherit;
    margin-bottom: 20px;

    :global(.Card) {
      width: 100%;
      display: flex;
      align-items: center;
      transition: all 100ms;
      min-height: 70px;

      &:hover {
        background-color: var(--color-primary-100);
      }
    }
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
  }

  .Icon {
    font-size: 1.5rem;
    width: 35px;
    display: flex;
    align-items: center;
    color: var(--color-primary-700);
    justify-content: flex-start;
  }
</style>
