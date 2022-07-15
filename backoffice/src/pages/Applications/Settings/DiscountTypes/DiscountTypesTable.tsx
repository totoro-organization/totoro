// @ts-nocheck
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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { DiscountType } from 'src/models';
import Modal from 'src/components/Modal';
import StatusLabel from 'src/components/StatusLabel';
import { useModal } from 'src/hooks/useModal';
import { AddDiscountTypeContent, DeleteDiscountTypeContent, EditDiscountTypeContent } from './DiscountTypeModalContent';
import { TableProps } from 'src/components/TableWrapper';


const DiscountTypesTable: FC<TableProps<DiscountType>> = ({
  items: discountTypes, 
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
  const [deleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, deleteModalItem] = useModal();
  
  const theme = useTheme();

  const handleUpdate = ({id, label}) => {
    handleUpdateItem({id, label});
    handleCloseEditModal();
  }

  const handleDelete = ({id}) => {
    handleDeleteItem(id);
    handleCloseDeleteModal();
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
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { discountTypes.map((discountType) => {
              const isUserSelected = selectedItems.includes(discountType.id);
              return (
                <TableRow hover key={discountType.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, discountType.id)
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
                      { discountType.name }
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
                      {format(new Date(discountType.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={discountType.status.label} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer la promotion" arrow>
                        <IconButton
                          onClick={() => handleOpenEditModal(discountType)}
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
                    <Tooltip title="Supprimer la promotion" arrow>
                      <IconButton
                      onClick={() => handleOpenDeleteModal(discountType)}
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Modal   open={editModalOpen} handleClose={handleCloseEditModal} title={`Editer le type suivant : ${editModalItem?.name}`}>
            <EditDiscountTypeContent handleClose={handleCloseEditModal} handleUpdate={handleUpdate} item={editModalItem}/>
        </Modal>
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer le type suivant : ${deleteModalItem?.name}`}>
            <DeleteDiscountTypeContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
        <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un type">
          <AddDiscountTypeContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
        </Modal>
      </TableContainer>
  );
};

export default DiscountTypesTable;
