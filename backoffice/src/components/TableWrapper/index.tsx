import { FC, ChangeEvent, useState, isValidElement, cloneElement, ReactNode, useEffect } from 'react';

import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  TablePagination,
  Select,
  MenuItem,
  CardHeader,
  Button
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BulkActions from './BulkActions';
import { StatusOptions } from 'src/models/status';
import { addItem, deleteItem, getItems, updateItem } from 'src/services/common.service';
import { useModal } from 'src/hooks/useModal';
import { sendLog } from 'src/services/admins.service';
import useAuth from 'src/hooks/useAuth';
import type { TableEnum, Filters } from 'src/models';
import type { Route } from 'src/services/routes';

interface TableWrapperProps {
  className?: string;
  defaultItems: any;
  url?: Route,
  title?: string,
  table?: TableEnum,
  statusOptions?: StatusOptions,
  children: ReactNode,
  addButton?: boolean
}

const applyFilters = (items: any, filters: Filters): any => {
  return items.filter((item) => {
    let matches = true;

    if (filters.status && item.status.label !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  items: any,
  page: number,
  limit: number
): any => {
  return items.slice(page * limit, page * limit + limit);
};



const TableWrapper: FC<TableWrapperProps> = ({ 
  defaultItems, 
  url, 
  title = '', 
  statusOptions, 
  children,
  table,
  addButton = false 
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedBulkActions = selectedItems.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [items, setItems] = useState<Array<any>>(defaultItems);

  const [addModalOpen, handleOpenAddModal, handleCloseAddModal] = useModal();

  useEffect(() => {
    if(defaultItems) {
      setItems(defaultItems);
    }
  }, [defaultItems])

  const { user } = useAuth();

  if(statusOptions) {
      statusOptions = [
      {
        id: 'all',
        name: 'Tous'
      },
      ...statusOptions
    ]
  }

  const handleGetItems = async () => {
    const itemsResponse = await getItems(url);
    if('error' in itemsResponse) return;
    setItems(itemsResponse?.data);
  }
 
  const handleUpdateItem = async (id: string, data: object) => {
    const updateResponse = await updateItem(url, id, data);
    if('error' in updateResponse) return;
    handleGetItems();
    await sendLog(user?.id, {table, action: "Updated"});
  }

  const handleDeleteItem = async (id: string) => {
    const deleteResponse = await deleteItem(url, id);
    if('error' in deleteResponse) return;
    handleGetItems();
    await sendLog(user?.id, {table, action: "Deleted"})
  }

  const handleAddItem = async (data: object) => {
    const addResponse = await addItem(url, data);
    if('error' in addResponse) return;
    handleGetItems();
    handleCloseAddModal();
    await sendLog(user?.id, {table, action: "Added"})
  }


  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedItems(event.target.checked ? items.map((item) => item.id) : []);
  };

  const handleSelectOneItem = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string
  ): void => {
    if (!selectedItems.includes(itemId)) {
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredItems = applyFilters(items, filters);
  const paginatedItems = applyPagination(filteredItems, page, limit);
  const selectedSomeItems =
    selectedItems.length > 0 && selectedItems.length < items.length;
  const selectedAllItems = selectedItems.length === items.length;
  

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {(!selectedBulkActions && statusOptions) &&  (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Statut</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Statut"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title={title}
          subheader={ addButton &&
          <Button onClick={handleOpenAddModal} size='large' startIcon={<AddCircleOutlineIcon/>} variant="contained">
          Ajouter
          </Button>}
        />
      )}
      <Divider />
        { isValidElement(children) && cloneElement(children, {
            items: paginatedItems, 
            selectedItems,
            handleSelectAllItems, 
            handleSelectOneItem,
            selectedSomeItems,
            selectedAllItems,
            statusOptions,
            handleUpdateItem,
            handleDeleteItem,
            handleAddItem,
            handleGetItems,
            addModalOpen,
            handleCloseAddModal,
            table
            }) 
        } 
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredItems.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default TableWrapper;
