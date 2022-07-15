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
import type { Subscription, TableProps } from 'src/models';
import StatusSelect from 'src/components/StatusSelect';

const SubscriptionsTable: FC<TableProps<Subscription>> = ({
  items: subscriptions, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems,
  statusOptions,
  table
}) => {

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
                      { subscription.expirate ? `Du ${format(new Date(subscription.createdAt), "dd/MM/yyyy")} au ${format(new Date(subscription.createdAt), "dd/MM/yyyy")}` : "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusSelect table={table} currentItem={{ id: subscription.id, status: subscription.status}} statusOptions={statusOptions} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default SubscriptionsTable;
