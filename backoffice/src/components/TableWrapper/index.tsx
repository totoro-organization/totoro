import { FC, ChangeEvent, useState, isValidElement, cloneElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  TablePagination,
  Select,
  MenuItem,
  CardHeader
} from '@mui/material';

import BulkActions from 'src/components/ManagementTable/BulkActions';
import { StatusEnum } from 'src/models/status';

interface TableWrapperProps {
  className?: string;
  items: any;
  title?: string,
  statusOptions: StatusOption[],
  children: ReactNode
}

interface Filters {
  status?: StatusEnum | 'all';
}

interface StatusOption {
  id: StatusEnum | 'all',
  name: string
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

const TableWrapper: FC<TableWrapperProps> = ({ items, title = '', statusOptions = [], children }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedBulkActions = selectedItems.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  statusOptions = [
    {
      id: 'all',
      name: 'Toutes'
    },
    ...statusOptions
  ]

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
      {!selectedBulkActions && (
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
        />
      )}
      <Divider />
        { isValidElement(children) && cloneElement(children, {
            items: paginatedItems, 
            selectedItems,
            handleSelectAllItems, 
            handleSelectOneItem,
            selectedSomeItems,
            selectedAllItems
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

TableWrapper.propTypes = {
  items: PropTypes.array.isRequired
};

TableWrapper.defaultProps = {
  items: []
};

export default TableWrapper;
