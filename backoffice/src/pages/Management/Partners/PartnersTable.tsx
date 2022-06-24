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
import StatusSelect from 'src/components/StatusSelect';
import { DeletePartnerContent } from './PartnerModalContent';
import { useModal } from 'src/hooks/useModal';
import { format } from 'date-fns';
import { truncateSring } from 'src/utils/functions';

const PartnersTable: FC<TableProps<any>> = ({
  items: partners, 
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
              <TableCell align="left">Utilisateur</TableCell>
              <TableCell align="left">Site web</TableCell>
              <TableCell align="left">Depuis le</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partners.map((partner) => {
              const isPartnerSelected = selectedItems.includes(partner.id);
              return (
                <TableRow hover key={partner.id} selected={isPartnerSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPartnerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, partner.id)
                      }
                      value={isPartnerSelected}
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
                        to={`/gestion/partenaires/${partner.id}`}
                      >{partner.name}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {partner.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {partner.email}
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
                      <Link
                        to={`/gestion/utilisateurs/${partner.user.id}`}
                      >{`${partner.user.firstname} ${partner.user.lastname} (${partner.user.username})`}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {partner.user.email}
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
                      <Link to={partner.link}>
                        { truncateSring(partner.link, 20, '...') }
                      </Link>
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
                      {format(new Date(partner.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusSelect table={table} currentItem={{ id: partner.id, status: partner.status}} statusOptions={statusOptions} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(partner)}
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
            <DeletePartnerContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default PartnersTable;
