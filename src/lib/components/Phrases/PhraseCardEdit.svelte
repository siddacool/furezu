<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';
  import Select, { type SelectOption } from '../ui-framework/Form/Select.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';

  interface PhraseCardFormProps {
    phrase?: Phrase;
    bookId: string;
    groupId?: string;
  }

  const { phrase, bookId, groupId }: PhraseCardFormProps = $props();

  let phraseName: string = $state(phrase?.phrase || '');
  let meaning: string = $state(phrase?.meaning || '');
  let translation: string = $state(phrase?.translation || '');
  let group: string | undefined = $state(phrase?.groupId || undefined);

  const groups = $derived(useGroupsStore.groups.filter((item) => item.bookId === bookId));

  let groupsSelectOptions: SelectOption[] = $state([]);

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case 'phrase':
        phraseName = target.value;
        break;
      case 'meaning':
        meaning = target.value;
        break;
      case 'translation':
        translation = target.value;
        break;
      default:
        break;
    }
  }

  function onChangeGroup(e: CustomEvent<SelectOption>) {
    group = e.detail.value as string | undefined;
  }

  function onClearGroup() {
    group = undefined;
  }

  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();

    const submitterName = e.submitter?.getAttribute('name');

    if (submitterName !== 'save') {
      return;
    }

    if (phrase?._id) {
      await usePhrasesStore.update(phrase._id, {
        phrase: phraseName,
        meaning,
        translation,
        groupId: group,
      });
    } else {
      await usePhrasesStore.add(bookId, {
        phrase: phraseName,
        meaning,
        translation,
        groupId: group,
      });
    }

    usePhrasesStore.clearEditing();
  }

  function onCancel() {
    usePhrasesStore.clearEditing();
  }

  async function onDelete() {
    if (phrase?._id) {
      await usePhrasesStore.delete(phrase._id);
    }

    usePhrasesStore.clearEditing();
  }

  $effect(() => {
    groupsSelectOptions = groups.map((item) =>
      Object.assign(
        {},
        {
          value: item._id,
          label: item.name,
        },
      ),
    );
  });

  $effect(() => {
    if (groupId) {
      group = groupId;
    }
  });

  $effect(() => {
    document.getElementById('phrase-card')?.scrollIntoView(true);
  });
</script>

<EditCard
  {onsubmit}
  {onCancel}
  {onDelete}
  title={phrase?.phrase ? `Edit: ${limitTextLength(phrase.meaning)}` : 'Create: Phrase'}
  disableSubmit={!phraseName?.trim() || !meaning?.trim() ? true : false}
  hideDeleteButton={!phrase?._id}
  id="phrase-card"
>
  <Stack space={2}>
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Phrase"
        placeholder="e.g. Hello (Required)"
        {oninput}
        value={meaning}
        name="meaning"
      />
    </StackItem>
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Local version"
        placeholder="e.g. Koni chi wa (Required)"
        {oninput}
        value={phraseName}
        name="phrase"
      />
    </StackItem>
    <StackItem>
      <TextInput
        disabled={usePhrasesStore.fetching}
        label="Translation (Text to Speech)"
        placeholder="e.g. こんにちは、元気ですか"
        {oninput}
        value={translation}
        name="translation"
      />
    </StackItem>
    <StackItem>
      <Select
        label="Group"
        options={groupsSelectOptions}
        onchange={onChangeGroup}
        onclear={onClearGroup}
        value={group}
        placeholder="Ungrouped"
      />
    </StackItem>
  </Stack>
</EditCard>
