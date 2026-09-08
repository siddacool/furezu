export interface Group {
  id?: number;
  _id: string;
  bookId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  open?: boolean;
}

export type GroupCreateData = Omit<Group, 'id' | '_id' | 'createdAt' | 'updatedAt'>;
