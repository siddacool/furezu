export interface Phrase {
  id?: number;
  _id: string;
  bookId: string;
  createdAt: Date;
  updatedAt: Date;
  hidden?: boolean;
  order?: string;
  phrase: string;
  meaning: string;
  pronounciation?: string;
  groupId?: string;
}
