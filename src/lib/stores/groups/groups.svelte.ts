import { nanoid } from 'nanoid';
import { db } from '../db';
import type { Group } from './types';
import { getMoment } from '$lib/helpers/time';

export async function getGroup(idToFind: string) {
  try {
    const group = await db.groups.where({ _id: idToFind }).first();

    return Promise.resolve(group);
  } catch (error) {
    return Promise.reject(error);
  }
}

function createGroupsStore() {
  let groups: Group[] = $state([]);
  let fetching: boolean = $state(false);
  let mounted: boolean = $state(false);
  let curruntlyEditing: string | undefined = $state(undefined);
  let createMode: boolean = $state(false);
  let importing: boolean = $state(false);

  return {
    get groups() {
      return groups;
    },
    get fetching() {
      return fetching;
    },
    get mounted() {
      return mounted;
    },
    get curruntlyEditing() {
      return curruntlyEditing;
    },
    get createMode() {
      return createMode;
    },
    get importing() {
      return importing;
    },
    async init() {
      try {
        fetching = true;

        groups = await db.groups?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        mounted = true;
      }
    },
    startCreateMode() {
      createMode = true;
    },
    startEditing(id: string) {
      curruntlyEditing = id;
    },
    clearEditing() {
      curruntlyEditing = undefined;
      createMode = false;
    },
    async add(bookId: string, name: string) {
      try {
        fetching = true;

        await db.groups.add({
          _id: nanoid(),
          bookId: bookId,
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        groups = await db.groups?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async update(idToUpdate: string, name: string) {
      try {
        fetching = true;

        const targetGroup = await getGroup(idToUpdate);

        if (!targetGroup) {
          throw Error('GroupStore:update: Group is missing');
        }

        await db.groups.update(targetGroup.id, {
          name,
          updatedAt: new Date(),
        });

        groups = await db.groups?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async delete(idToDelete: string) {
      try {
        fetching = true;

        const targetGroup = await getGroup(idToDelete);

        if (!targetGroup) {
          throw Error('GroupStore:delete: Book is missing');
        }

        await db.groups.delete(targetGroup.id);

        groups = await db.groups?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
    async importData(groupsToUpdate: Group[], importedAt: Date) {
      try {
        fetching = true;
        importing = true;

        const newGroups: Group[] = [];

        groupsToUpdate.forEach((itemToUpdate) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...restItemProps } = itemToUpdate;

          const decoratedItem: Group = { ...restItemProps, importedAt };

          // Update group data
          const targetIndex = groups.findIndex((item) => item._id === itemToUpdate._id);

          if (targetIndex < 0) {
            // New
            newGroups.push(decoratedItem);
            return;
          }

          // update
          const updatedAt = getMoment(itemToUpdate.updatedAt);
          const updatedAtPrevious = getMoment(groups[targetIndex].updatedAt);

          if (updatedAt.isBefore(updatedAtPrevious)) {
            return;
          }

          // Update approved
          newGroups.push({
            ...groups[targetIndex],
            ...decoratedItem,
          });
        });

        await db.groups.bulkPut(newGroups);

        groups = await db.groups?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
        importing = false;
      }
    },
    async duplicate(id: string) {
      try {
        fetching = true;

        const targetGroup = groups.find((item) => item._id === id);

        if (!targetGroup) {
          return;
        }

        const clonedGroup: Group = {
          ...targetGroup,
          id: undefined,
          _id: nanoid(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.groups.add(clonedGroup);

        groups = await db.groups?.toArray();

        return Promise.resolve();
      } catch (e) {
        console.error(e);

        return Promise.reject(e);
      } finally {
        fetching = false;
      }
    },
  };
}

export const useGroupsStore = createGroupsStore();
