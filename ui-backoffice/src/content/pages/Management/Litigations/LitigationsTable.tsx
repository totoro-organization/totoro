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
import { Litigation, LitigationStatus } from 'src/models/litigation';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';

interface LitigationsTableProps {
  className?: string;
  litigations: Litigation[];
}

interface Filters {
  status?: LitigationStatus["label"];
}

const getStatusLabel = (litigationStatus: LitigationStatus["label"]): JSX.Element => {
  const map = {
    coming: {
      text: 'A venir',
      color: 'error'
    },
    completed: {
      text: 'Terminée',
      color: 'success'
    },
    pending: {
      text: 'En cours',
      color: 'warning'
    }
  };

  const { text, color }: any = map[litigationStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  litigations: Litigation[],
  filters: Filters
): Litigation[] => {
  return litigations.filter((litigation) => {
    let matches = true;

    if (filters.status && litigation.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  litigations: Litigation[],
  page: number,
  limit: number
): Litigation[] => {
  return litigations.slice(page * limit, page * limit + limit);
};

const LitigationsTable: FC<LitigationsTableProps> = ({ litigations }) => {

  const [selectedLitigations, setSelectedLitigations] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedLitigations.length > 0;
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
      id: 'completed',
      name: 'Terminée'
    },
    {
      id: 'pending',
      name: 'En cours'
    },
    {
      id: 'coming',
      name: 'A venir'
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

  const handleSelectAllLitigations = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedLitigations(
      event.target.checked
        ? litigations.map((litigation) => litigation.id)
        : []
    );
  };

  const handleSelectOneLitigation = (
    event: ChangeEvent<HTMLInputElement>,
    litigationId: string
  ): void => {
    if (!selectedLitigations.includes(litigationId)) {
      setSelectedLitigations((prevSelected) => [
        ...prevSelected,
        litigationId
      ]);
    } else {
      setSelectedLitigations((prevSelected) =>
        prevSelected.filter((id) => id !== litigationId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredLitigations = applyFilters(litigations, filters);
  const paginatedLitigations = applyPagination(
    filteredLitigations,
    page,
    limit
  );
  const selectedSomeLitigations =
    selectedLitigations.length > 0 &&
    selectedLitigations.length < litigations.length;
  const selectedAllLitigations =
    selectedLitigations.length === litigations.length;
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
                  checked={selectedAllLitigations}
                  indeterminate={selectedSomeLitigations}
                  onChange={handleSelectAllLitigations}
                />
              </TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell align="right">Tokens</TableCell>
              <TableCell align="right">Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLitigations.map((litigation) => {
              const isLitigationSelected = selectedLitigations.includes(
                litigation.id
              );
              return (
                <TableRow
                  hover
                  key={litigation.id}
                  selected={isLitigationSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLitigationSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneLitigation(event, litigation.id)
                      }
                      value={isLitigationSelected}
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
                      {litigation.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {litigation.organization}
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
                      {format(litigation.date, 'dd MMMM  yyyy')}
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
                      {litigation.participants} / {litigation.capacity}
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
                      {litigation.tokens}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(litigation.status)}
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
          count={filteredLitigations.length}
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

LitigationsTable.propTypes = {
  litigations: PropTypes.array.isRequired
};

LitigationsTable.defaultProps = {
  litigations: []
};

export default LitigationsTable;
