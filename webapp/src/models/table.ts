export type TableItem = any;

export interface TableMethods {
  handleDeleteItem: (id: string) => void,
  handleUpdateItem: (id: string, data: object) => void,
  handleGetItems: () => void
}