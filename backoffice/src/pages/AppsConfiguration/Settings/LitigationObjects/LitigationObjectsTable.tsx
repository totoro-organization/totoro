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
import { LitigationObject } from 'src/models/litigation_object';
import Modal from 'src/components/Modal';
import StatusLabel from 'src/components/StatusLabel';
import { useModal } from 'src/hooks/useModal';
import { AddLitigationObjectContent, DeleteLitigationObjectContent, EditLitigationObjectContent } from './LitigationObjectModalContent';

interface LitigationObjectsTableProps {
  items: LitigationObject[], 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any,
  handleDeleteItem: (id: string) => any,
  handleUpdateItem: (id: string, data: object) => any,
  handleAddItem: (data: object) => any,
  addModalOpen: boolean,
  handleCloseAddModal: () => void
}

const LitigationObjectsTable: FC<LitigationObjectsTableProps> = ({
  items: litigationObjects, 
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

  const handleUpdate = (id: string, data: object) => {
    handleUpdateItem(id, data);
    handleCloseEditModal();
  }

  const handleDelete = (id: string) => {
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
            { litigationObjects.map((litigationObject) => {
              const isUserSelected = selectedItems.includes(litigationObject.id);
              return (
                <TableRow hover key={litigationObject.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, litigationObject.id)
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
                      { litigationObject.label }
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
                      {litigationObject.createdAt} 
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={litigationObject.status.label} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer l'objet" arrow>
                        <IconButton
                          onClick={() => handleOpenEditModal(litigationObject)}
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
                    <Tooltip title="Supprimer l'objet" arrow>
                      <IconButton
                      onClick={() => handleOpenDeleteModal(litigationObject)}
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
        <Modal   open={editModalOpen} handleClose={handleCloseEditModal} title={`Editer l'objet suivant : ${editModalItem?.label}`}>
            <EditLitigationObjectContent handleClose={handleCloseEditModal} handleUpdate={handleUpdate} item={editModalItem}/>
        </Modal>
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer l'objet suivant : ${deleteModalItem?.label}`}>
            <DeleteLitigationObjectContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
        <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un objet">
          <AddLitigationObjectContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
        </Modal>
      </TableContainer>
  );
};

export default LitigationObjectsTable;
