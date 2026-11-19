export interface CreatePhrase {
  meaning: string;
  phrase: string;
  pronunciation?: string;
  /** Legacy field retained for backward-compatible imports. */
  pronounciation?: string;
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
  order?: string;
}
