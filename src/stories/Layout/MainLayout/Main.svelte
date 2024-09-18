<script>
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
</script>

<div>
  <MainLayout>
    <Stack space={2}>
      <StackItem>
        <Card>
          <h1>Card 1</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto enim id non
            voluptas sint sunt, laborum odio at dolores animi laudantium recusandae libero
            voluptates possimus. Et praesentium animi aut facere.
          </p>
        </Card>
      </StackItem>
      <StackItem>
        <Card>
          <h1>Card 2</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto enim id non
            voluptas sint sunt, laborum odio at dolores animi laudantium recusandae libero
            voluptates possimus. Et praesentium animi aut facere.
          </p>
        </Card>
      </StackItem>
    </Stack>
  </MainLayout>
</div>

<style lang="scss">
  div {
    :global(.MainLayout) {
      height: 500px;
      width: 100%;
      border-radius: 20px;
      border: 1px solid;
      border-color: var(--color-grey-400);
    }
  }
</style>
