import { ChangeEvent } from "react";
import { StatusEnum, StatusOptions } from "./status";

export type TableItem = any;

export interface TableMethods {
  handleAddItem: (data: object) => void,
  handleDeleteItem: (id: string) => void,
  handleUpdateItem: (id: string, data: object) => void,
  handleGetItems: () => void
}

export enum TableEnum {
  admins = "Admins",
  users = "Users",
  organizations = "Organizations",
  litigationObjects = "LitigationObjects",
  partners = "Partners",
  jobs = "Jobs",
  tags = "Tags",
  pricings = "Pricings",
  subscriptions = "Subscriptions",
  litigations = "Litigations",
  logs = "Logs",
  discounts = "Discounts",
  discountTypes = "DiscountTypes",
  roles = "Roles",
  status = "Status",
  difficulties = "Difficulties"
}

export interface TableProps<T> {
  items: T[], 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any,
  handleDeleteItem: (id: string) => any,
  handleUpdateItem: (id: string, data: object) => any,
  handleAddItem: (data: object) => any,
  addModalOpen: boolean,
  handleCloseAddModal: () => void,
  handleGetItems: () => void,
  table?: TableEnum,
  statusOptions: StatusOptions
}

export interface Filters {
  status?: keyof typeof StatusEnum | 'all';
}