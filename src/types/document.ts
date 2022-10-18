export type DocumentRes = {
  createdAt: string,
  id: string,
  path: string,
}

export type DocumentsForm = {
  documents: File[] | string[];
};
