// @ts-nocheck


import { FC, ChangeEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { Subscription, SubscriptionStatus } from 'src/models/subscription';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';

interface SubscriptionsTableProps {
  className?: string;
  subscriptions: Subscription[];
}

interface Filters {
  status?: SubscriptionStatus;
}

const getStatusLabel = (subscriptionStatus: SubscriptionStatus["label"]): JSX.Element => {
  const map = {
    canceled: {
      text: 'Annulé',
      color: 'error'
    },
    active: {
      text: 'Actif',
      color: 'success'
    },
    expired: {
      text: 'Expiré',
      color: 'warning'
    }
  };

  const { text, color }: any = map[subscriptionStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  subscriptions: Subscription[],
  filters: Filters
): Subscription[] => {
  return subscriptions.filter((subscription) => {
    let matches = true;

    if (filters.status && subscription.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  subscriptions: Subscription[],
  page: number,
  limit: number
): Subscription[] => {
  return subscriptions.slice(page * limit, page * limit + limit);
};

const SubscriptionsTable: FC<SubscriptionsTableProps> = ({ subscriptions }) => {

  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedSubscriptions.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'Tous'
    },
    {
      id: 'active',
      name: 'Actif'
    },
    {
      id: 'canceled',
      name: 'Annulé'
    },
    {
      id: 'expired',
      name: 'Expiré'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllSubscriptions = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedSubscriptions(
      event.target.checked
        ? subscriptions.map((subscription) => subscription.id)
        : []
    );
  };

  const handleSelectOneSubscription = (
    event: ChangeEvent<HTMLInputElement>,
    subscriptionId: string
  ): void => {
    if (!selectedSubscriptions.includes(subscriptionId)) {
      setSelectedSubscriptions((prevSelected) => [
        ...prevSelected,
        subscriptionId
      ]);
    } else {
      setSelectedSubscriptions((prevSelected) =>
        prevSelected.filter((id) => id !== subscriptionId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredSubscriptions = applyFilters(subscriptions, filters);
  const paginatedSubscriptions = applyPagination(
    filteredSubscriptions,
    page,
    limit
  );
  const selectedSomeSubscriptions =
    selectedSubscriptions.length > 0 &&
    selectedSubscriptions.length < subscriptions.length;
  const selectedAllSubscriptions =
    selectedSubscriptions.length === subscriptions.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Statut</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Statut"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Missions récentes"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllSubscriptions}
                  indeterminate={selectedSomeSubscriptions}
                  onChange={handleSelectAllSubscriptions}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Date d'expiration</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSubscriptions.map((subscription) => {
              const isSubscriptionSelected = selectedSubscriptions.includes(
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
                        handleSelectOneSubscription(event, subscription.id)
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
                    ><Link to={`/gestion/missions/${subscription.id}`}>{subscription.id}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {subscription.user.username}
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
                      {format(subscription.expiry_date, 'dd MMMM  yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(subscription.status.label)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Editer la mission" arrow>
                      <IconButton
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
                    <Tooltip title="Supprimer la mission" arrow>
                      <IconButton
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
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredSubscriptions.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

SubscriptionsTable.propTypes = {
  subscriptions: PropTypes.array.isRequired
};

SubscriptionsTable.defaultProps = {
  subscriptions: []
};

export default SubscriptionsTable;
