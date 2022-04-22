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
import { Organization, OrganizationStatus } from 'src/models/organization';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';

interface OrganizationsTableProps {
  className?: string;
  organizations: Organization[];
}

interface Filters {
  status?: OrganizationStatus["label"];
}

const filterJobs = (jobs, status) => jobs.filter(job => job.status.label === status);

const getStatusLabel = (organizationStatus: OrganizationStatus["label"]): JSX.Element => {
  const map = {
    active: {
      text: 'Actif',
      color: 'success'
    },
    inactive: {
      text: 'Inactif',
      color: 'warning'
    },
    outlawed: {
      text: 'Banni',
      color: 'error'
    },
    freezed: {
      text: 'Gelé',
      color: 'info'
    }
  };

  const { text, color }: any = map[organizationStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  organizations: Organization[],
  filters: Filters
): Organization[] => {
  return organizations.filter((organization) => {
    let matches = true;

    if (filters.status && organization.status.label !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  organizations: Organization[],
  page: number,
  limit: number
): Organization[] => {
  return organizations.slice(page * limit, page * limit + limit);
};

const OrganizationsTable: FC<OrganizationsTableProps> = ({ organizations }) => {

  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedOrganizations.length > 0;
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
      id: 'active',
      name: 'Actif'
    },
    {
      id: 'inactive',
      name: 'Inactif'
    },
    {
      id: 'outlawed',
      name: 'Banni'
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

  const handleSelectAllOrganizations = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOrganizations(
      event.target.checked
        ? organizations.map((organization) => organization.id)
        : []
    );
  };

  const handleSelectOneOrganization = (
    event: ChangeEvent<HTMLInputElement>,
    organizationId: string
  ): void => {
    if (!selectedOrganizations.includes(organizationId)) {
      setSelectedOrganizations((prevSelected) => [
        ...prevSelected,
        organizationId
      ]);
    } else {
      setSelectedOrganizations((prevSelected) =>
        prevSelected.filter((id) => id !== organizationId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredOrganizations = applyFilters(organizations, filters);
  const paginatedOrganizations = applyPagination(
    filteredOrganizations,
    page,
    limit
  );
  const selectedSomeOrganizations =
    selectedOrganizations.length > 0 &&
    selectedOrganizations.length < organizations.length;
  const selectedAllOrganizations =
    selectedOrganizations.length === organizations.length;
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
          title="Utilisateurs"
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
                  checked={selectedAllOrganizations}
                  indeterminate={selectedSomeOrganizations}
                  onChange={handleSelectAllOrganizations}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Missions</TableCell>
              <TableCell>Missions actives</TableCell>
              <TableCell>Missions à venir</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrganizations.map((organization) => {
              const isOrganizationSelected = selectedOrganizations.includes(
                organization.id
              );
              return (
                <TableRow
                  hover
                  key={organization.id}
                  selected={isOrganizationSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isOrganizationSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOrganization(event, organization.id)
                      }
                      value={isOrganizationSelected}
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
                      {organization.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {organization.email}
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
                      {organization.jobs.length}
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
                      {filterJobs(organization.jobs, "pending").length}
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
                      {filterJobs(organization.jobs, "coming").length}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(organization.status.label)}
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
          count={filteredOrganizations.length}
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

OrganizationsTable.propTypes = {
  organizations: PropTypes.array.isRequired
};

OrganizationsTable.defaultProps = {
  organizations: []
};

export default OrganizationsTable;
