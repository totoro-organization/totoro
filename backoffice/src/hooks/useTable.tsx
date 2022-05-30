import { useEffect, useState } from "react";
import { updateItem, getItems, addItem, deleteItem } from 'src/services/commons.service';

export const useTable = ({ model, defaultItems, handleCloseModal }) => {

    const [items, setItems] = useState<Array<any>>(defaultItems?.data);


  useEffect(() => {
    if(defaultItems?.data) {
      setItems(defaultItems?.data);
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