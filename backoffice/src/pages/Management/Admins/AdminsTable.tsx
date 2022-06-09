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
import { Admin } from 'src/models/admin';
import Modal from 'src/components/Modal';
import { useModal } from 'src/hooks/useModal';
import { DeleteAdminContent, EditAdminContent } from './AdminModalContent';
import { Link } from 'react-router-dom';
import StatusSelect from 'src/components/StatusSelect';
import { TableEnum } from 'src/models';
import { TableProps } from 'src/components/TableWrapper';


const AdminsTable: FC<TableProps<Admin>> = ({
  items: admins, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  handleUpdateItem,
  handleDeleteItem,
  statusOptions
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
          <TableCell>Details</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="right">Role</TableCell>
          <TableCell align="right">Statut</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {admins.map((admin) => {
          const isAdminSelected = selectedItems.includes(admin.id);
          return (
            <TableRow hover key={admin.id} selected={isAdminSelected}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isAdminSelected}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleSelectOneItem(event, admin.id)
                  }
                  value={isAdminSelected}
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
                  <Link
                    to={`/gestion/administrateurs/${admin.id}`}
                  >{`${admin.firstname} ${admin.lastname}`}</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {'@' + admin.username}
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
                  {admin.email}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {admin.role.label}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <StatusSelect table={TableEnum.admins} currentItem={{ id: admin.id, status: admin.status}} statusOptions={statusOptions} />
              </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer" arrow>
                        <IconButton
                          onClick={() => handleOpenEditModal(admin)}
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
                    <Tooltip title="Supprimer" arrow>
                      <IconButton
                      onClick={() => handleOpenDeleteModal(admin)}
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
        <Modal   open={editModalOpen} handleClose={handleCloseEditModal} title={`Editer l'administrateur suivant : ${editModalItem?.firstname} ${editModalItem?.lastname}`}>
            <EditAdminContent handleClose={handleCloseEditModal} handleUpdate={handleUpdate} item={editModalItem}/>
        </Modal>
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer l'administrateur suivant : ${deleteModalItem?.firstname} ${deleteModalItem?.lastname}`}>
            <DeleteAdminContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default AdminsTable;




