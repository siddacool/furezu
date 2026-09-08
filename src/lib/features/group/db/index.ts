import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Group, GroupCreateData } from '../types';

export function listGroups(bookId: string) {
  return db.groups.where({ bookId }).toArray();
}

export async function getGroupById(groupId: string) {
  const group = await db.groups.where({ _id: groupId }).first();

  if (!group) {
    throw new Error('Group not found');
  }

  return group;
}

export async function createGroup(data: GroupCreateData) {
  const newId = nanoid();

  const now = new Date();

  await db.groups.add({
    _id: newId,
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return newId;
}

export async function updateGroup(data: Group) {
  await db.groups.update(data.id, {
    ...data,
    updatedAt: new Date(),
  });

  return data._id;
}

export async function deleteGroup(groupId: string) {
  const group = await getGroupById(groupId);

  await db.groups.delete(group.id);

  return groupId;
}
