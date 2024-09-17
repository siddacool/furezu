<script lang="ts">
  import GlobalStyles from '$lib/components/GlobalStyles.svelte';
  import SelectButton from '$lib/components/ui/SelectButton.svelte';

  const options = ['One', 'Two', 'Three'];

  let value = $state(options[0]);

  function onchange(e: string) {
    value = e;
  }
</script>

<GlobalStyles>
  <div>
    <SelectButton {value} {options} {onchange} label="Select items" />
    <SelectButton {value} {options} {onchange} label="Select items" disabled />
  </div>
</GlobalStyles>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;

    :global(.SelectButton) {
      margin-bottom: 20px;
    }
  }
</style>
