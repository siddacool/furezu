export interface Book {
  id?: number;
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  importedAt?: Date;
}
