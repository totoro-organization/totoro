import { FC, ChangeEvent } from 'react';
import { format } from 'date-fns';

import {
  Tooltip,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import type { Status, TableProps } from 'src/models';
import Modal from 'src/components/Modal';
import { useModal } from 'src/hooks/useModal';
import { AddStatusContent, EditStatusContent } from './StatusModalContent';


const StatusesTable: FC<TableProps<Status<any>>> = ({
  items: statuses, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleUpdateItem,
  handleDeleteItem,
  handleAddItem,
  addModalOpen,
  handleCloseAddModal
}) => {

  const [editModalOpen, handleOpenEditModal, handleCloseEditModal, editModalItem] = useModal();
  
  const theme = useTheme();

  const handleUpdate = (id: string, data: object) => {
    handleUpdateItem(id, data);
    handleCloseEditModal();
  }

  return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllItems}
                  indeterminate={selectedSomeItems}
                  onChange={handleSelectAllItems}
                />
              </TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Date de création</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { statuses.map((status) => {
              const isUserSelected = selectedItems.includes(status.id);
              return (
                <TableRow hover key={status.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, status.id)
                      }
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      { status.label }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(status.createdAt), "dd/MM/yyyy HH:mm:ss")} 
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer le statut" arrow>
                        <IconButton
                          onClick={() => handleOpenEditModal(status)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Modal   open={editModalOpen} handleClose={handleCloseEditModal} title={`Editer le status suivant : ${editModalItem?.label}`}>
            <EditStatusContent handleClose={handleCloseEditModal} handleUpdate={handleUpdate} item={editModalItem}/>
        </Modal>
        <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un statut">
          <AddStatusContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
        </Modal>
      </TableContainer>
  );
};

export default StatusesTable;
