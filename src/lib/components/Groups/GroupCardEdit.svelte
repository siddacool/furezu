<script lang="ts">
  import { useBooksStore } from '$lib/stores/books/books.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';
  import type { Group } from '$lib/stores/groups/types';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';

  interface GroupCardEditFormProps {
    group?: Group;
    bookId: string;
  }

  const { group, bookId }: GroupCardEditFormProps = $props();

  let name: string = $state(group?.name || '');

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        name = target.value;
        break;
      default:
        break;
    }
  }

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();

    const submitterName = e.submitter?.getAttribute('name');

    if (submitterName !== 'save') {
      return;
    }

    if (group?._id) {
      await useGroupsStore.update(group._id, name);
    } else {
      await useGroupsStore.add(bookId, name);
    }

    useGroupsStore.clearEditing();
  }

  function onCancel() {
    useGroupsStore.clearEditing();
  }

  async function onDelete() {
    if (group?._id) {
      await useGroupsStore.delete(group._id);
    }

    useGroupsStore.clearEditing();
  }
</script>

<EditCard
  {onsubmit}
  {onCancel}
  {onDelete}
  disableSubmit={!name.trim() ? true : false}
  title={group?.name ? `Edit: ${limitTextLength(group.name, 40)}` : 'Create: Group'}
  hideDeleteButton={!group?._id}
  id="group-card"
>
  <Stack space={2}>
    <StackItem>
      <TextInput
        disabled={useBooksStore.fetching}
        label="Name"
        placeholder="e.g. Common Greetings"
        {oninput}
        value={name}
        name="name"
      />
    </StackItem>
  </Stack>
</EditCard>
