<script lang="ts">
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import ButtonGroup from '$lib/components/ui-framework/Form/ButtonGroup.svelte';

  let value = $state('one');

  function onclick(e: MouseEvent) {
    const target = e.target as HTMLButtonElement;

    value = target.name;
  }
</script>

<div>
  <ButtonGroup label="Select options">
    <Button {onclick} name="one" variant={value === 'one' ? 'primary' : 'default'}>Light</Button>
    <Button {onclick} name="two" variant={value === 'two' ? 'primary' : 'default'}>Dark</Button>
    <Button {onclick} name="three" variant={value === 'three' ? 'primary' : 'default'}>
      System
    </Button>
  </ButtonGroup>

  <ButtonGroup label="Select options" conjoint>
    <Button {onclick} name="one" variant={value === 'one' ? 'primary' : 'default'}>Light</Button>
    <Button {onclick} name="two" variant={value === 'two' ? 'primary' : 'default'}>Dark</Button>
    <Button {onclick} name="three" variant={value === 'three' ? 'primary' : 'default'}>
      System
    </Button>
  </ButtonGroup>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;

    :global(.ButtonGroup) {
      margin-bottom: 20px;
    }
  }
</style>
