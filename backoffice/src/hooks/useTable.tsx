import { useEffect, useState } from "react";
import { Admin, CommonsEnum, Discount, DiscountTransaction, DiscountType, Job, JobDifficulty, Litigation, LitigationObject, Log, Organization, Partner, Pricing, Role, Status, Subscription, Tag, User } from "src/models";
import { updateItem, getItems, addItem, deleteItem } from 'src/services/commons.service';


type TableItem =
  Status<any>         |
  Role                |
  Tag                 |
  JobDifficulty       |
  LitigationObject    |
  DiscountType        |
  Pricing             |
  Organization        |
  Litigation          |
  Partner             |
  Log                 |
  Admin               |
  User                |
  Discount            |
  Job                 |
  JobDifficulty       |
  DiscountTransaction |
  Subscription        
  

interface UseTableProps {
  model: CommonsEnum,
  defaultItems: TableItem[],
  handleCloseModal: () => void
}

interface UseTableResponse {
  handleAddItem: ({label}: {label: string}) => void,
  handleDeleteItem: (id: string) => void,
  handleUpdateItem: ({id, label}: {id: string, label: string}) => void,
  items: TableItem[],
}

export const useTable = ({ model, defaultItems, handleCloseModal }: UseTableProps): UseTableResponse => {

  const [items, setItems] = useState<Array<TableItem>>(defaultItems);

  useEffect(() => {
    if(defaultItems) {
      setItems(defaultItems);
    }
  }, [defaultItems])

  const handleGetItems = async () => {
    const itemsResponse = await getItems(model);
    if('error' in itemsResponse) return;
    setItems(itemsResponse?.data);
  }
 
  const handleUpdateItem = async ({id, label}: {id: string, label: string}) => {
    const updateResponse = await updateItem(model, id, { label });
    if('error' in updateResponse) return;
    handleGetItems();
  }

  const handleDeleteItem = async (id: string) => {
    const deleteResponse = await deleteItem(model, id);
    if('error' in deleteResponse) return;
    handleGetItems();
  }

  const handleAddItem = async ({label}: {label: string}) => {
    const addResponse = await addItem(model, { label });
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