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
import { Job, JobStatus } from 'src/models/job';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/ManagementTable/BulkActions';

interface JobsTableProps {
  className?: string;
  jobs: Job[];
}

interface Filters {
  status?: JobStatus;
}

const getStatusLabel = (jobStatus: JobStatus): JSX.Element => {
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

  const { text, color }: any = map[jobStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  jobs: Job[],
  filters: Filters
): Job[] => {
  return jobs.filter((job) => {
    let matches = true;

    if (filters.status && job.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  jobs: Job[],
  page: number,
  limit: number
): Job[] => {
  return jobs.slice(page * limit, page * limit + limit);
};

const JobsTable: FC<JobsTableProps> = ({ jobs }) => {

  const [selectedJobs, setSelectedJobs] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedJobs.length > 0;
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

  const handleSelectAllJobs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedJobs(
      event.target.checked
        ? jobs.map((job) => job.id)
        : []
    );
  };

  const handleSelectOneJob = (
    event: ChangeEvent<HTMLInputElement>,
    jobId: string
  ): void => {
    if (!selectedJobs.includes(jobId)) {
      setSelectedJobs((prevSelected) => [
        ...prevSelected,
        jobId
      ]);
    } else {
      setSelectedJobs((prevSelected) =>
        prevSelected.filter((id) => id !== jobId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredJobs = applyFilters(jobs, filters);
  const paginatedJobs = applyPagination(
    filteredJobs,
    page,
    limit
  );
  const selectedSomeJobs =
    selectedJobs.length > 0 &&
    selectedJobs.length < jobs.length;
  const selectedAllJobs =
    selectedJobs.length === jobs.length;
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
                  checked={selectedAllJobs}
                  indeterminate={selectedSomeJobs}
                  onChange={handleSelectAllJobs}
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
            {paginatedJobs.map((job) => {
              const isJobSelected = selectedJobs.includes(
                job.id
              );
              return (
                <TableRow
                  hover
                  key={job.id}
                  selected={isJobSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isJobSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneJob(event, job.id)
                      }
                      value={isJobSelected}
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
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {job.organization}
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
                      {format(job.date, 'dd MMMM  yyyy')}
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
                      {job.participants} / {job.capacity}
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
                      {job.tokens}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(job.status)}
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
          count={filteredJobs.length}
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

JobsTable.propTypes = {
  jobs: PropTypes.array.isRequired
};

JobsTable.defaultProps = {
  jobs: []
};

export default JobsTable;
