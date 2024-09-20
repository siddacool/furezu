<script lang="ts">
  import Card from '../ui-framework/Layout/Card.svelte';

  interface SettingRouteCardProps {
    href: string;
    title: string;
  }

  const { href, title }: SettingRouteCardProps = $props();
</script>

<a {href}>
  <Card>
    <h3>
      {title}
    </h3>
  </Card>
</a>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  a {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    text-decoration: none;
    color: inherit;

    :global(.Card) {
      width: 100%;
    }
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 500;
  }
</style>
