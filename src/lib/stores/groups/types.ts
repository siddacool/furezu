export interface Group {
  id?: number;
  _id: string;
  bookId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  importedAt?: Date;
}
