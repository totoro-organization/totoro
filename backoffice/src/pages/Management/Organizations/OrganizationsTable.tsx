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
  TableProps,
  useTheme
} from '@mui/material';

import Modal from 'src/components/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Link } from 'react-router-dom';
import StatusSelect from 'src/components/StatusSelect';
import { DeleteOrganizationContent } from './OrganizationModalContent';
import { useModal } from 'src/hooks/useModal';

const OrganizationsTable: FC<TableProps<any>> = ({
  items: organizations, 
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
              <TableCell align="left">Siret</TableCell>
              <TableCell align="left">Siren</TableCell>
              <TableCell align="left">Membres</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((organization) => {
              const isorganizationSelected = selectedItems.includes(organization.id);
              return (
                <TableRow hover key={organization.id} selected={isorganizationSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isorganizationSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, organization.id)
                      }
                      value={isorganizationSelected}
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
                        to={`/gestion/associations/${organization.id}`}
                      >{organization.name}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {organization.activity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                     {organization.address}, {organization.cp}
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
                      {organization.siret}
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
                      {organization.siren}
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
                      {organization.members.length}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusSelect table={table} currentItem={{ id: organization.id, status: organization.status}} statusOptions={statusOptions} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(organization)}
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
            <DeleteOrganizationContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default OrganizationsTable;
