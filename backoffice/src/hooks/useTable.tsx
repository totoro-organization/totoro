import { useEffect, useState } from "react";
import { Admin, CommonsUriEnum, Discount, DiscountTransaction, DiscountType, Job, JobDifficulty, Litigation, LitigationObject, Log, Organization, Partner, Pricing, Role, Status, Subscription, Tag, User } from "src/models";
import { updateItem, getItems, addItem, deleteItem } from 'src/services/commons.service';


export type TableItem = any
  // Status<any>         |
  // Role                |
  // Tag                 |
  // JobDifficulty       |
  // LitigationObject    |
  // DiscountType        |
  // Pricing             |
  // Organization        |
  // Litigation          |
  // Partner             |
  // Log                 |
  // Admin               |
  // User                |
  // Discount            |
  // Job                 |
  // DiscountTransaction |
  // Subscription        

interface UseTableProps {
  uri: CommonsUriEnum,
  defaultItems: TableItem[],
  handleCloseModal: () => void
}

export interface TableMethods {
  handleAddItem: (data: object) => void,
  handleDeleteItem: (id: string) => void,
  handleUpdateItem: (id: string, data: object) => void,
}

interface UseTableResponse extends TableMethods{
  items: TableItem[],
}

export const useTable = ({ uri, defaultItems, handleCloseModal }: UseTableProps): UseTableResponse => {

  const [items, setItems] = useState<Array<TableItem>>(defaultItems);

  useEffect(() => {
    if(defaultItems) {
      setItems(defaultItems);
    }
  }, [defaultItems])

  const handleGetItems = async () => {
    const itemsResponse = await getItems(uri);
    if('error' in itemsResponse) return;
    setItems(itemsResponse?.data);
  }
 
  const handleUpdateItem = async (id: string, data: object) => {
    const updateResponse = await updateItem(uri, id, data);
    if('error' in updateResponse) return;
    handleGetItems();
  }

  const handleDeleteItem = async (id: string) => {
    const deleteResponse = await deleteItem(uri, id);
    if('error' in deleteResponse) return;
    handleGetItems();
  }

  const handleAddItem = async (data: object) => {
    const addResponse = await addItem(uri, data);
    if('error' in addResponse) return;
    handleGetItems();
    handleCloseModal();
  }

  return {
      handleAddItem,
      handleDeleteItem,
      handleUpdateItem,
      items,
  }
}