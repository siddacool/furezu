<script>
  import GlobalStyles from '$lib/components/GlobalStyles.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import MainLayout from '$lib/components/ui-framework/Layout/MainLayout.svelte';
</script>

<GlobalStyles>
  <div>
    <MainLayout>
      <section>
        <Button>Yo</Button>
      </section>
    </MainLayout>
  </div>
</GlobalStyles>

<style lang="scss">
  div {
    :global(.MainLayout) {
      height: 500px;
      width: 300px;
      border-radius: 20px;
      border: 1px solid;
      border-color: var(--color-grey-500);
    }
  }

  section {
    display: flex;
    flex-direction: column;
  }
</style>
