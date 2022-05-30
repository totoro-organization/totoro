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

interface RolesTableProps {
  items: Role[], 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any,
  handleDeleteRole: () => any,
  handleUpdateRole: () => any
}

const RolesTable: FC<RolesTableProps> = ({
  items: roles, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleUpdateRole,
  handleDeleteRole
}) => {

  const [editModalOpen, handleOpenEditModal, handleCloseEditModal, editModalItem] = useModal();
  const [deleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, deleteModalItem] = useModal();
  
  const theme = useTheme();

  const handleUpdate = ({id, label}) => {
    handleUpdateRole({id, label});
    handleCloseEditModal();
  }

  const handleDelete = ({id}) => {
    handleDeleteRole(id);
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
                      {role.createdAt} 
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
        <Modal item={editModalItem} callback={handleUpdate} open={editModalOpen} handleClose={handleCloseEditModal} type="edit" title={`Editer le role suivant : ${editModalItem?.label}`}/>
        <Modal item={deleteModalItem} callback={handleDelete} open={deleteModalOpen} handleClose={handleCloseDeleteModal} type="delete" title={`Supprimer le role suivant : ${deleteModalItem?.label}`}/>
      </TableContainer>
  );
};

export default RolesTable;
