import { FC, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import format from 'date-fns/format';
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
import CancelIcon from '@mui/icons-material/Cancel';
import type { Subscription, TableProps } from 'src/models';
import Modal from "src/components/Modal";
import { DeleteSubscriptionContent } from './SubscriptionModalContent';
import { useModal } from 'src/hooks/useModal';
import StatusLabel from 'src/components/StatusLabel';


const SubscriptionsTable: FC<TableProps<Subscription>> = ({
  items: subscriptions, 
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
              <TableCell>Pricing</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => {
              const isSubscriptionSelected = selectedItems.includes(
                subscription.id
              );
              return (
                <TableRow
                  hover
                  key={subscription.id}
                  selected={isSubscriptionSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSubscriptionSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, subscription.id)
                      }
                      value={isSubscriptionSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    ><Link to={`/gestion/associations/${subscription.organization.id}`}>{subscription.organization.name}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {subscription.organization.email}
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
                      {subscription.pricing.label}
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
                      Du {format(new Date(subscription.createdAt), "dd/MM/yyyy")} au {format(new Date(subscription.createdAt), "dd/MM/yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={subscription.status.label} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Annuler l'abonnement" arrow>
                      <IconButton
                        onClick={() => handleOpenDeleteModal(subscription)}
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Modal open={deleteModalOpen} handleClose={handleCloseDeleteModal} title={`Supprimer la mission suivante : ${deleteModalItem?.title}`}>
            <DeleteSubscriptionContent handleClose={handleCloseDeleteModal} handleDelete={handleDelete} item={deleteModalItem} />
        </Modal>
      </TableContainer>
  );
};

export default SubscriptionsTable;
