<script>
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
</script>

<Stack space={3}>
  <StackItem>
    <TextInput label="Text 1" placeholder="Enter details" />
  </StackItem>
  <StackItem>
    <TextInput label="Text 2" placeholder="Enter details" />
  </StackItem>
</Stack>
