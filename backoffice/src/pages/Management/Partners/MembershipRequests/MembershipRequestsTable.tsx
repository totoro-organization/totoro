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
import { Link } from 'react-router-dom';
import StatusLabel from 'src/components/StatusLabel';

interface MembershipRequestsTableProps {
  items: any, 
  selectedItems: any,
  handleSelectAllItems: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSelectOneItem: (event: ChangeEvent<HTMLInputElement>, itemId: string) => void,
  selectedSomeItems: any,
  selectedAllItems: any
}

const MembershipRequestsTable: FC<MembershipRequestsTableProps> = ({
  items: membershipRequests, 
  selectedItems,
  handleSelectAllItems, 
  handleSelectOneItem,
  selectedSomeItems,
  selectedAllItems
}) => {
  
  const theme = useTheme();

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
              <TableCell>Date</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membershipRequests.map((membershipRequest) => {
              const isMembershipRequestSelected = selectedItems.includes(membershipRequest.id);
              return (
                <TableRow hover key={membershipRequest.id} selected={isMembershipRequestSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isMembershipRequestSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneItem(event, membershipRequest.id)
                      }
                      value={isMembershipRequestSelected}
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
                      <Link to={`/gestion/partenaires/demandes/${membershipRequest.id}`}>
                        {membershipRequest.partner.name}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {membershipRequest.partner.email}
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
                      {format(membershipRequest.date, 'dd MMMM  yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <StatusLabel status={membershipRequest.status.label} />
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
  );
};

export default MembershipRequestsTable;
