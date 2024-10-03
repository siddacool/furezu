export interface CreatePhrase {
  meaning: string;
  phrase: string;
  pronounciation?: string;
  translation?: string;
  groupId?: string;
}

export interface Phrase extends CreatePhrase {
  id?: number;
  _id: string;
  bookId: string;
  createdAt: Date;
  updatedAt: Date;
  hidden?: boolean;
  importedAt?: Date;
}
