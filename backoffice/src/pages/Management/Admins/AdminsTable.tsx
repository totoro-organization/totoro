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
import { Admin, AdminStatus } from 'src/models/admin';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';
import { Link } from 'react-router-dom';

interface AdminsProps {
  className?: string;
  admins: Admin[];
}

interface Filters {
  status?: AdminStatus['label'];
}

const getStatusLabel = (adminStatus: AdminStatus['label']): JSX.Element => {
  const map = {
    actived: {
      text: 'Actif',
      color: 'success'
    },
    disabled: {
      text: 'Inactif',
      color: 'warning'
    },
    freezed: {
      text: 'Gelé',
      color: 'info'
    }
  };

  const { text, color }: any = map[adminStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (admins: Admin[], filters: Filters): Admin[] => {
  return admins.filter((admin) => {
    let matches = true;

    if (filters.status && admin.status.label !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  admins: Admin[],
  page: number,
  limit: number
): Admin[] => {
  return admins.slice(page * limit, page * limit + limit);
};

const Admins: FC<AdminsProps> = ({ admins }) => {
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const selectedBulkActions = selectedAdmins.length > 0;
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
      id: 'actived',
      name: 'Actif'
    },
    {
      id: 'disabled',
      name: 'Inactif'
    },
    {
      id: 'freezed',
      name: 'Gelé'
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

  const handleSelectAllAdmins = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedAdmins(event.target.checked ? admins.map((admin) => admin.id) : []);
  };

  const handleSelectOneAdmin = (
    event: ChangeEvent<HTMLInputElement>,
    adminId: string
  ): void => {
    if (!selectedAdmins.includes(adminId)) {
      setSelectedAdmins((prevSelected) => [...prevSelected, adminId]);
    } else {
      setSelectedAdmins((prevSelected) =>
        prevSelected.filter((id) => id !== adminId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredAdmins = applyFilters(admins, filters);
  const paginatedAdmins = applyPagination(filteredAdmins, page, limit);
  const selectedSomeAdmins =
    selectedAdmins.length > 0 && selectedAdmins.length < admins.length;
  const selectedAllAdmins = selectedAdmins.length === admins.length;
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
          title="Administrateurs"
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
                  checked={selectedAllAdmins}
                  indeterminate={selectedSomeAdmins}
                  onChange={handleSelectAllAdmins}
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
            {paginatedAdmins.map((admin) => {
              const isAdminSelected = selectedAdmins.includes(admin.id);
              return (
                <TableRow hover key={admin.id} selected={isAdminSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isAdminSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneAdmin(event, admin.id)
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
                    {getStatusLabel(admin.status.label)}
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
          count={filteredAdmins.length}
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

Admins.propTypes = {
  admins: PropTypes.array.isRequired
};

Admins.defaultProps = {
  admins: []
};

export default Admins;
