<script lang="ts">
  import GlobalStyles from '$lib/components/GlobalStyles.svelte';
  import TextInput from '$lib/components/ui/TextInput.svelte';

  let value = $state('Type Something');

  function oninput(e: Event) {
    const target = e.target as HTMLSelectElement;

    value = target.value;
  }
</script>

<GlobalStyles>
  <div>
    <TextInput {value} disabled {oninput} name="normal" />
    <TextInput {value} label="With label" {oninput} placeholder="This is a placeholder" />
    <TextInput {value} label="Disabled" {oninput} />
    <TextInput {value} label="With Error" error="This is error message" {oninput} />
  </div>
</GlobalStyles>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;

    :global(.TextInput) {
      margin-bottom: 20px;
    }
  }
</style>
