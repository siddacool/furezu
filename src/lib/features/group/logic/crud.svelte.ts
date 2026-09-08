import { deleteGroup as deleteGroupDb, updateGroup, createGroup } from '../db';
import type { Group, GroupCreateData } from '../types';
import { validateGroupCreate, validateGroupUpdate } from '../validation';
import { groupListStore } from '../store/list.svelte';

export async function saveGroup(data: GroupCreateData | Group) {
  if ('_id' in data) {
    const { name = '', ...restData } = data;
    const newData = {
      name: name.trim(),
      ...restData,
    };

    validateGroupUpdate(newData);

    const id = await updateGroup(newData);

    await groupListStore.load(id);

    return id;
  } else {
    const { name = '', ...restData } = data;

    const newData = {
      name: name.trim(),
      ...restData,
    };

    validateGroupCreate(newData);

    return await createGroup(newData);
  }
}

export function deleteGroup(groupId: string) {
  return deleteGroupDb(groupId);
}
