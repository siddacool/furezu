export interface Book {
  id?: number;
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  archived?: boolean;
}

export type BookCreateData = Omit<Book, 'id' | '_id' | 'createdAt' | 'updatedAt' | 'archived'>;
