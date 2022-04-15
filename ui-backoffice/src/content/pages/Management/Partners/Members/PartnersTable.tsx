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
import { Partner, PartnerStatus } from 'src/models/partner';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface PartnersTableProps {
  className?: string;
  partners: Partner[];
}

interface Filters {
  status?: PartnerStatus;
}

const getStatusLabel = (partnerStatus: PartnerStatus): JSX.Element => {
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

  const { text, color }: any = map[partnerStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  partners: Partner[],
  filters: Filters
): Partner[] => {
  return partners.filter((partner) => {
    let matches = true;

    if (filters.status && partner.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  partners: Partner[],
  page: number,
  limit: number
): Partner[] => {
  return partners.slice(page * limit, page * limit + limit);
};

const PartnersTable: FC<PartnersTableProps> = ({ partners }) => {

  const [selectedPartners, setSelectedPartners] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedPartners.length > 0;
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

  const handleSelectAllPartners = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedPartners(
      event.target.checked
        ? partners.map((partner) => partner.id)
        : []
    );
  };

  const handleSelectOnePartner = (
    event: ChangeEvent<HTMLInputElement>,
    partnerId: string
  ): void => {
    if (!selectedPartners.includes(partnerId)) {
      setSelectedPartners((prevSelected) => [
        ...prevSelected,
        partnerId
      ]);
    } else {
      setSelectedPartners((prevSelected) =>
        prevSelected.filter((id) => id !== partnerId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPartners = applyFilters(partners, filters);
  const paginatedPartners = applyPagination(
    filteredPartners,
    page,
    limit
  );
  const selectedSomePartners =
    selectedPartners.length > 0 &&
    selectedPartners.length < partners.length;
  const selectedAllPartners =
    selectedPartners.length === partners.length;
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
                  checked={selectedAllPartners}
                  indeterminate={selectedSomePartners}
                  onChange={handleSelectAllPartners}
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
            {paginatedPartners.map((partner) => {
              const isPartnerSelected = selectedPartners.includes(
                partner.id
              );
              return (
                <TableRow
                  hover
                  key={partner.id}
                  selected={isPartnerSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPartnerSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOnePartner(event, partner.id)
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
                      {partner.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {partner.organization}
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
                      {format(partner.date, 'dd MMMM  yyyy')}
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
                      {partner.participants} / {partner.capacity}
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
                      {partner.tokens}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(partner.status)}
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
          count={filteredPartners.length}
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

PartnersTable.propTypes = {
  partners: PropTypes.array.isRequired
};

PartnersTable.defaultProps = {
  partners: []
};

export default PartnersTable;
