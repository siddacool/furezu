<script lang="ts">
  import { usePhrasesStore } from '$lib/stores/phrases/phrases.svelte';
  import type { Phrase } from '$lib/stores/phrases/types';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { Stack, StackItem } from '$lib/components/ui-framework/Layout/Stack';
  import { limitTextLength } from '$lib/helpers/text-manipulations/limit-text-length';
  import EditCard from '../EditCard.svelte/EditCard.svelte';
  import Select, { type SelectOption } from '../ui-framework/Form/Select.svelte';
  import { useGroupsStore } from '$lib/stores/groups/groups.svelte';

  interface PhraseCardFormProps { phrase?: Phrase; bookId: string; groupId?: string; }
  const { phrase, bookId, groupId }: PhraseCardFormProps = $props();
  let phraseName = $state(phrase?.phrase || '');
  let meaning = $state(phrase?.meaning || '');
  let pronunciation = $state(phrase?.pronunciation || phrase?.pronounciation || '');
  let group: string | undefined = $state(groupId);
  const groups = $derived(useGroupsStore.groups.filter((item) => item.bookId === bookId));
  let groupsSelectOptions: SelectOption[] = $state([]);

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.name === 'phrase') phraseName = target.value;
    if (target.name === 'meaning') meaning = target.value;
    if (target.name === 'pronunciation') pronunciation = target.value;
  }
  function onChangeGroup(e: CustomEvent<SelectOption>) { group = e.detail.value as string | undefined; }
  function onClearGroup() { group = undefined; }
  async function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (e.submitter?.getAttribute('name') !== 'save') return;
    const data = { phrase: phraseName, meaning, pronunciation: pronunciation.trim() || undefined, groupId: group };
    if (phrase?._id) await usePhrasesStore.update(phrase._id, data);
    else await usePhrasesStore.add(bookId, data);
    usePhrasesStore.clearEditing();
  }
  function onCancel() { usePhrasesStore.clearEditing(); }
  async function onDelete() { if (phrase?._id) await usePhrasesStore.delete(phrase._id); usePhrasesStore.clearEditing(); }
  $effect(() => { groupsSelectOptions = groups.map((item) => ({ value: item._id, label: item.name })); });
  $effect(() => { document.getElementById('phrase-card')?.scrollIntoView(true); });
</script>

<EditCard {onsubmit} {onCancel} {onDelete} title={phrase?.phrase ? `Edit: ${limitTextLength(phrase.meaning)}` : 'Create: Phrase'} disableSubmit={!phraseName?.trim() || !meaning?.trim()} hideDeleteButton={!phrase?._id} id="phrase-card">
  <Stack space={2}>
    <StackItem><TextInput disabled={usePhrasesStore.fetching} label="Phrase" placeholder="e.g. Hello (Required)" {oninput} value={meaning} name="meaning" /></StackItem>
    <StackItem><TextInput disabled={usePhrasesStore.fetching} label="Local version" placeholder="e.g. Kon'nichiwa (Required)" {oninput} value={phraseName} name="phrase" /></StackItem>
    <StackItem><TextInput disabled={usePhrasesStore.fetching} label="Phonetic pronunciation" placeholder="e.g. koh-nee-chee-wah" {oninput} value={pronunciation} name="pronunciation" /></StackItem>
    <StackItem><Select label="Group" options={groupsSelectOptions} onchange={onChangeGroup} onclear={onClearGroup} value={group} placeholder="Ungrouped" /></StackItem>
  </Stack>
</EditCard>
