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
import { Role } from 'src/models/role';
import Modal from 'src/components/Modal';
import StatusLabel from 'src/components/StatusLabel';
import { useModal } from 'src/hooks/useModal';
import { AddRoleContent, DeleteRoleContent, EditRoleContent } from './RoleModalContent';
import { TableProps } from 'src/components/TableWrapper';


const RolesTable: FC<TableProps<Role>> = ({
  items: roles, 
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
            { roles.map((role) => {
              const isUserSelected = selectedItems.includes(role.id);
              return (
                <TableRow hover key={role.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, role.id)
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
                      { role.label }
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
                      {format(new Date(role.createdAt), "dd/MM/yyyy HH:mm:ss")} 
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={role.status.label} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer le role" arrow>
                        <IconButton
                          onClick={() => handleOpenEditModal(role)}
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
                    <Tooltip title="Supprimer le role" arrow>
                      <IconButton
                      onClick={() => handleOpenDeleteModal(role)}
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
        <Modal   open={editModalOpen} handleClose={handleCloseEditModal} title={`Editer le role suivant : ${editModalItem?.label}`}>
            <EditRoleContent handleClose={handleCloseEditModal} handleUpdate={handleUpdate} item={editModalItem}/>
        </Modal>
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer le role suivant : ${deleteModalItem?.label}`}>
            <DeleteRoleContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
        <Modal open={addModalOpen} handleClose={handleCloseAddModal} title="Ajouter un role">
          <AddRoleContent handleClose={handleCloseAddModal} handleAdd={handleAddItem}/>
        </Modal>
      </TableContainer>
  );
};

export default RolesTable;
