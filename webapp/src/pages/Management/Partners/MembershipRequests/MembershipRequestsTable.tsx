// @ts-nocheck
import { FC, ChangeEvent, useState } from 'react';
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
import { MembershipRequest, MembershipRequestStatus } from 'src/models/membership_request';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';
import { Link } from 'react-router-dom';

interface MembershipRequestsTableProps {
  className?: string;
  membershipRequests: MembershipRequest[];
}

interface Filters {
  status?: MembershipRequestStatus['label'];
}

const getStatusLabel = (membershipRequestStatus: MembershipRequestStatus['label']): JSX.Element => {
  const map = {
    open: {
      text: 'En attente',
      color: 'info'
    },
    accepted: {
      text: 'Acceptée',
      color: 'success'
    },
    declined: {
      text: 'Refusée',
      color: 'error'
    },
    expired: {
      text: 'Expirée',
      color: 'warning'
    }
  };

  const { text, color }: any = map[membershipRequestStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (membershipRequests: MembershipRequest[], filters: Filters): MembershipRequest[] => {
  return membershipRequests.filter((membershipRequest) => {
    let matches = true;

    if (filters.status && membershipRequest.status.label !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  membershipRequests: MembershipRequest[],
  page: number,
  limit: number
): MembershipRequest[] => {
  return membershipRequests.slice(page * limit, page * limit + limit);
};

const MembershipRequestsTable: FC<MembershipRequestsTableProps> = ({ membershipRequests }) => {
  const [selectedMembershipRequests, setSelectedMembershipRequests] = useState<string[]>([]);
  const selectedBulkActions = selectedMembershipRequests.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'Toutes'
    },
    {
      id: 'open',
      name: 'En attente'
    },
    {
      id: 'accepted',
      name: 'Acceptée'
    },
    {
      id: 'declined',
      name: 'Refusée'
    },
    {
      id: 'expired',
      name: 'Expirée'
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

  const handleSelectAllMembershipRequests = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMembershipRequests(
      event.target.checked ? membershipRequests.map((membershipRequest) => membershipRequest.id) : []
    );
  };

  const handleSelectOneMembershipRequest = (
    event: ChangeEvent<HTMLInputElement>,
    membershipRequestId: string
  ): void => {
    if (!selectedMembershipRequests.includes(membershipRequestId)) {
      setSelectedMembershipRequests((prevSelected) => [...prevSelected, membershipRequestId]);
    } else {
      setSelectedMembershipRequests((prevSelected) =>
        prevSelected.filter((id) => id !== membershipRequestId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredMembershipRequests = applyFilters(membershipRequests, filters);
  const paginatedMembershipRequests = applyPagination(filteredMembershipRequests, page, limit);
  const selectedSomeMembershipRequests =
    selectedMembershipRequests.length > 0 && selectedMembershipRequests.length < membershipRequests.length;
  const selectedAllMembershipRequests = selectedMembershipRequests.length === membershipRequests.length;
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
                  checked={selectedAllMembershipRequests}
                  indeterminate={selectedSomeMembershipRequests}
                  onChange={handleSelectAllMembershipRequests}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMembershipRequests.map((membershipRequest) => {
              const isMembershipRequestSelected = selectedMembershipRequests.includes(membershipRequest.id);
              return (
                <TableRow hover key={membershipRequest.id} selected={isMembershipRequestSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isMembershipRequestSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneMembershipRequest(event, membershipRequest.id)
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
                    {getStatusLabel(membershipRequest.status.label)}
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
          count={filteredMembershipRequests.length}
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

MembershipRequestsTable.propTypes = {
  membershipRequests: PropTypes.array.isRequired
};

MembershipRequestsTable.defaultProps = {
  membershipRequests: []
};

export default MembershipRequestsTable;
