import { FC, ChangeEvent } from 'react';
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
  TableProps,
} from '@mui/material';

import Modal from 'src/components/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Link } from 'react-router-dom';
import { TableEnum, User } from 'src/models';
import StatusSelect from 'src/components/StatusSelect';
import { DeleteUserContent } from './UserModalContent';
import { useModal } from 'src/hooks/useModal';

const UsersTable: FC<TableProps<any>> = ({
  items: users, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  statusOptions,
  handleDeleteItem,
  table
}) => {

  const theme = useTheme();

  const [deleteModalOpen, handleOpenDeleteModal, handleCloseDeleteModal, deleteModalItem] = useModal();

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
              <TableCell align="left">Missions</TableCell>
              <TableCell align="right">Tokens</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isUserSelected = selectedItems.includes(user.id);
              return (
                <TableRow hover key={user.id} selected={isUserSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, user.id)
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
                      <Link
                        to={`/gestion/utilisateurs/${user.id}`}
                      >{`${user.firstname} ${user.lastname} (${user.username})`}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user.email}
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
                      {2}
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
                      {user.total_token}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusSelect table={table} currentItem={{ id: user.id, status: user.status}} statusOptions={statusOptions} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(user)}
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
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer l'utilisateur suivant : ${deleteModalItem?.firstname} ${deleteModalItem?.lastname}`}>
            <DeleteUserContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default UsersTable;
